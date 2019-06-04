<?php
/**
 * The Jetpack Connection manager class file.
 *
 * @package jetpack-connection
 */

namespace Automattic\Jetpack\Connection;

use Automattic\Jetpack\Options\Manager as Options_Manager;

/**
 * The Jetpack Connection Manager class that is used as a single gateway between WordPress.com
 * and Jetpack.
 */
class Manager implements Manager_Interface {
	/*
	 * Used internally when we want to look for the Normal Blog Token
	 * without knowing its token key ahead of time.
	 */
	const MAGIC_NORMAL_TOKEN_KEY = ';normal;';
	const SECRETS_MISSING        = 'secrets_missing';
	const SECRETS_EXPIRED        = 'secrets_expired';
	const SECRETS_OPTION_NAME    = 'secrets';
	const MASTER_USER            = true;

	/**
	 * The object for managing options.
	 *
	 * @var \Automattic\Jetpack\Options\Manager
	 */
	protected $option_manager;

	/**
	 * The procedure that should be run to generate secrets.
	 *
	 * @var Callable
	 */
	protected $secret_callable;

	/**
	 * Initializes all needed hooks and request handlers. Handles API calls, upload
	 * requests, authentication requests. Also XMLRPC options requests.
	 * Fallback XMLRPC is also a bridge, but probably can be a class that inherits
	 * this one. Among other things it should strip existing methods.
	 *
	 * @param Array $methods an array of API method names for the Connection to accept and
	 *                       pass on to existing callables. It's possible to specify whether
	 *                       each method should be available for unauthenticated calls or not.
	 * @see Jetpack::__construct
	 */
	public function initialize( $methods ) {
		$methods;
	}

	/**
	 * Returns true if the current site is connected to WordPress.com.
	 *
	 * @return Boolean is the site connected?
	 */
	public function is_active() {
		return (bool) $this->get_access_token( self::MASTER_USER );
	}

	public function get_magic_normal_token_key() {
		return self::MAGIC_NORMAL_TOKEN_KEY;
	}

	/**
	 * Returns true if the user with the specified identifier is connected to
	 * WordPress.com.
	 *
	 * @param Integer $user_id the user identifier.
	 * @return Boolean is the user connected?
	 */
	public function is_user_connected( $user_id ) {
		$user_id = false === $user_id ? get_current_user_id() : absint( $user_id );
		if ( ! $user_id ) {
			return false;
		}

		return (bool) $this->get_access_token( $user_id );
	}

	/**
	 * Get the wpcom user data of the current|specified connected user.
	 *
	 * @param Integer $user_id the user identifier.
	 * @return Object the user object.
	 */
	public function get_connected_user_data( $user_id ) {
		return $user_id;
	}

	/**
	 * Is the user the connection owner.
	 *
	 * @param Integer $user_id the user identifier.
	 * @return Boolean is the user the connection owner?
	 */
	public function is_connection_owner( $user_id ) {
		return $user_id;
	}

	/**
	 * Unlinks the current user from the linked WordPress.com user
	 *
	 * @param Integer $user_id the user identifier.
	 */
	public static function disconnect_user( $user_id ) {
		return $user_id;
	}

	/**
	 * Initializes a transport server, whatever it may be, saves into the object property.
	 * Should be changed to be protected.
	 */
	public function initialize_server() {

	}

	/**
	 * Checks if the current request is properly authenticated, bails if not.
	 * Should be changed to be protected.
	 */
	public function require_authentication() {

	}

	/**
	 * Verifies the correctness of the request signature.
	 * Should be changed to be protected.
	 */
	public function verify_signature() {

	}

	/**
	 * Attempts Jetpack registration which sets up the site for connection. Should
	 * remain public because the call to action comes from the current site, not from
	 * WordPress.com.
	 *
	 * @return Integer zero on success, or a bitmask on failure.
	 */
	public function register() {
		return 0;
	}

	/**
	 * Returns the callable that would be used to generate secrets.
	 *
	 * @return Callable a function that returns a secure string to be used as a secret.
	 */
	protected function get_secret_callable() {
		if ( ! isset( $this->secret_callable ) ) {
			/**
			 * Allows modification of the callable that is used to generate connection secrets.
			 *
			 * @param Callable a function or method that returns a secret string.
			 */
			$this->secret_callable = apply_filters( 'jetpack_connection_secret_generator', 'wp_generate_password' );
		}

		return $this->secret_callable;
	}

	/**
	 * Returns the object that is to be used for all option manipulation.
	 *
	 * @return Object $manager an option manager object.
	 */
	protected function get_option_manager() {
		if ( ! isset( $this->option_manager ) ) {
			/**
			 * Allows modification of the object that is used to manipulate stored data.
			 *
			 * @param Jetpack_Options an option manager object.
			 */
			$this->option_manager = apply_filters( 'jetpack_connection_option_manager', new Options_Manager() );
		}

		return $this->option_manager;
	}

	/**
	 * Generates two secret tokens and the end of life timestamp for them.
	 *
	 * @param String  $action  The action name.
	 * @param Integer $user_id The user identifier.
	 * @param Integer $exp     Expiration time in seconds.
	 */
	public function generate_secrets( $action, $user_id, $exp ) {
		$callable = $this->get_secret_callable();

		$secrets = $this->get_option_manager()->get_raw_option( 'jetpack_secrets', array() );

		$secret_name = 'jetpack_' . $action . '_' . $user_id;

		if (
			isset( $secrets[ $secret_name ] ) &&
			$secrets[ $secret_name ]['exp'] > time()
		) {
			return $secrets[ $secret_name ];
		}

		$secret_value = array(
			'secret_1' => call_user_func( $callable ),
			'secret_2' => call_user_func( $callable ),
			'exp'      => time() + $exp,
		);

		$secrets[ $secret_name ] = $secret_value;

		$this->get_option_manager()->update_option( self::SECRETS_OPTION_NAME, $secrets );
		return $secrets[ $secret_name ];
	}

	/**
	 * Returns two secret tokens and the end of life timestamp for them.
	 *
	 * @param String  $action  The action name.
	 * @param Integer $user_id The user identifier.
	 * @return string|array an array of secrets or an error string.
	 */
	public function get_secrets( $action, $user_id ) {
		$secret_name = 'jetpack_' . $action . '_' . $user_id;
		$secrets     = $this->get_option_manager()->get_option( self::SECRETS_OPTION_NAME, array() );

		if ( ! isset( $secrets[ $secret_name ] ) ) {
			return self::SECRETS_MISSING;
		}

		if ( $secrets[ $secret_name ]['exp'] < time() ) {
			$this->delete_secrets( $action, $user_id );
			return self::SECRETS_EXPIRED;
		}

		return $secrets[ $secret_name ];
	}

	/**
	 * Deletes secret tokens in case they, for example, have expired.
	 *
	 * @param String  $action  The action name.
	 * @param Integer $user_id The user identifier.
	 */
	public function delete_secrets( $action, $user_id ) {
		$secret_name = 'jetpack_' . $action . '_' . $user_id;
		$secrets     = $this->get_option_manager()->get_option( self::SECRETS_OPTION_NAME, array() );
		if ( isset( $secrets[ $secret_name ] ) ) {
			unset( $secrets[ $secret_name ] );
			$this->get_option_manager()->update_option( self::SECRETS_OPTION_NAME, $secrets );
		}
	}

	/**
	 * Responds to a WordPress.com call to register the current site.
	 * Should be changed to protected.
	 */
	public function handle_registration() {

	}

	/**
	 * Responds to a WordPress.com call to authorize the current user.
	 * Should be changed to protected.
	 */
	public function handle_authorization() {

	}

	/**
	 * Builds a URL to the Jetpack connection auth page.
	 * This needs rethinking.
	 *
	 * @param bool        $raw If true, URL will not be escaped.
	 * @param bool|string $redirect If true, will redirect back to Jetpack wp-admin landing page after connection.
	 *                              If string, will be a custom redirect.
	 * @param bool|string $from If not false, adds 'from=$from' param to the connect URL.
	 * @param bool        $register If true, will generate a register URL regardless of the existing token, since 4.9.0.
	 *
	 * @return string Connect URL
	 */
	public function build_connect_url( $raw, $redirect, $from, $register ) {
		return array( $raw, $redirect, $from, $register );
	}

	/**
	 * Disconnects from the Jetpack servers.
	 * Forgets all connection details and tells the Jetpack servers to do the same.
	 */
	public function disconnect_site() {

	}

	/**
	 * Gets the requested token.
	 *
	 * Tokens are one of two types:
	 * 1. Blog Tokens: These are the "main" tokens. Each site typically has one Blog Token,
	 *    though some sites can have multiple "Special" Blog Tokens (see below). These tokens
	 *    are not associated with a user account. They represent the site's connection with
	 *    the Jetpack servers.
	 * 2. User Tokens: These are "sub-"tokens. Each connected user account has one User Token.
	 *
	 * All tokens look like "{$token_key}.{$private}". $token_key is a public ID for the
	 * token, and $private is a secret that should never be displayed anywhere or sent
	 * over the network; it's used only for signing things.
	 *
	 * Blog Tokens can be "Normal" or "Special".
	 * * Normal: The result of a normal connection flow. They look like
	 *   "{$random_string_1}.{$random_string_2}"
	 *   That is, $token_key and $private are both random strings.
	 *   Sites only have one Normal Blog Token. Normal Tokens are found in either
	 *   Jetpack_Options::get_option( 'blog_token' ) (usual) or the JETPACK_BLOG_TOKEN
	 *   constant (rare).
	 * * Special: A connection token for sites that have gone through an alternative
	 *   connection flow. They look like:
	 *   ";{$special_id}{$special_version};{$wpcom_blog_id};.{$random_string}"
	 *   That is, $private is a random string and $token_key has a special structure with
	 *   lots of semicolons.
	 *   Most sites have zero Special Blog Tokens. Special tokens are only found in the
	 *   JETPACK_BLOG_TOKEN constant.
	 *
	 * In particular, note that Normal Blog Tokens never start with ";" and that
	 * Special Blog Tokens always do.
	 *
	 * When searching for a matching Blog Tokens, Blog Tokens are examined in the following
	 * order:
	 * 1. Defined Special Blog Tokens (via the JETPACK_BLOG_TOKEN constant)
	 * 2. Stored Normal Tokens (via Jetpack_Options::get_option( 'blog_token' ))
	 * 3. Defined Normal Tokens (via the JETPACK_BLOG_TOKEN constant)
	 *
	 * @param int|false    $user_id   false: Return the Blog Token. int: Return that user's User Token.
	 * @param string|false $token_key If provided, check that the token matches the provided input.
	 *                                false                                : Use first token. Default.
	 *                                Jetpack_Data::MAGIC_NORMAL_TOKEN_KEY : Use first Normal Token.
	 *                                non-empty string                     : Use matching token
	 * @return object|false
	 */
	public function get_access_token( $user_id = false, $token_key = false ) {
		$possible_special_tokens = array();
		$possible_normal_tokens  = array();

		if ( $user_id ) {
			if ( ! $user_tokens = $this->get_option_manager()->get_option( 'user_tokens' ) ) {
				return false;
			}
			if ( self::MASTER_USER === $user_id ) {
				if ( ! $user_id = $this->get_option_manager()->get_option( 'master_user' ) ) {
					return false;
				}
			}
			if ( ! isset( $user_tokens[ $user_id ] ) || ! $user_tokens[ $user_id ] ) {
				return false;
			}
			$user_token_chunks = explode( '.', $user_tokens[ $user_id ] );
			if ( empty( $user_token_chunks[1] ) || empty( $user_token_chunks[2] ) ) {
				return false;
			}
			if ( $user_id != $user_token_chunks[2] ) {
				return false;
			}
			$possible_normal_tokens[] = "{$user_token_chunks[0]}.{$user_token_chunks[1]}";
		} else {
			$stored_blog_token = $this->get_option_manager()->get_option( 'blog_token' );
			if ( $stored_blog_token ) {
				$possible_normal_tokens[] = $stored_blog_token;
			}

			$defined_tokens = \Jetpack_Constants::is_defined( 'JETPACK_BLOG_TOKEN' )
				? explode( ',', \Jetpack_Constants::get_constant( 'JETPACK_BLOG_TOKEN' ) )
				: array();

			foreach ( $defined_tokens as $defined_token ) {
				if ( ';' === $defined_token[0] ) {
					$possible_special_tokens[] = $defined_token;
				} else {
					$possible_normal_tokens[] = $defined_token;
				}
			}
		}

		if ( self::MAGIC_NORMAL_TOKEN_KEY === $token_key ) {
			$possible_tokens = $possible_normal_tokens;
		} else {
			$possible_tokens = array_merge( $possible_special_tokens, $possible_normal_tokens );
		}

		if ( ! $possible_tokens ) {
			return false;
		}

		$valid_token = false;

		if ( false === $token_key ) {
			// Use first token.
			$valid_token = $possible_tokens[0];
		} elseif ( self::MAGIC_NORMAL_TOKEN_KEY === $token_key ) {
			// Use first normal token.
			$valid_token = $possible_tokens[0]; // $possible_tokens only contains normal tokens because of earlier check.
		} else {
			// Use the token matching $token_key or false if none.
			// Ensure we check the full key.
			$token_check = rtrim( $token_key, '.' ) . '.';

			foreach ( $possible_tokens as $possible_token ) {
				if ( hash_equals( substr( $possible_token, 0, strlen( $token_check ) ), $token_check ) ) {
					$valid_token = $possible_token;
					break;
				}
			}
		}

		if ( ! $valid_token ) {
			return false;
		}

		return (object) array(
			'secret'           => $valid_token,
			'external_user_id' => (int) $user_id,
		);
	}

	/**
	 * This function mirrors Jetpack_Data::is_usable_domain() in the WPCOM codebase.
	 *
	 * @param $domain
	 * @param array  $extra
	 *
	 * @return bool|WP_Error
	 */
	public function is_usable_domain( $domain, $extra = array() ) {

		// If it's empty, just fail out.
		if ( ! $domain ) {
			return new WP_Error( 'fail_domain_empty', sprintf( __( 'Domain `%1$s` just failed is_usable_domain check as it is empty.', 'jetpack' ), $domain ) );
		}

		/**
		 * Skips the usuable domain check when connecting a site.
		 *
		 * Allows site administrators with domains that fail gethostname-based checks to pass the request to WP.com
		 *
		 * @since 4.1.0
		 *
		 * @param bool If the check should be skipped. Default false.
		 */
		if ( apply_filters( 'jetpack_skip_usuable_domain_check', false ) ) {
			return true;
		}

		// None of the explicit localhosts.
		$forbidden_domains = array(
			'wordpress.com',
			'localhost',
			'localhost.localdomain',
			'127.0.0.1',
			'local.wordpress.test',         // VVV
			'local.wordpress-trunk.test',   // VVV
			'src.wordpress-develop.test',   // VVV
			'build.wordpress-develop.test', // VVV
		);
		if ( in_array( $domain, $forbidden_domains ) ) {
			return new WP_Error( 'fail_domain_forbidden', sprintf( __( 'Domain `%1$s` just failed is_usable_domain check as it is in the forbidden array.', 'jetpack' ), $domain ) );
		}

		// No .test or .local domains
		if ( preg_match( '#\.(test|local)$#i', $domain ) ) {
			return new WP_Error( 'fail_domain_tld', sprintf( __( 'Domain `%1$s` just failed is_usable_domain check as it uses an invalid top level domain.', 'jetpack' ), $domain ) );
		}

		// No WPCOM subdomains
		if ( preg_match( '#\.WordPress\.com$#i', $domain ) ) {
			return new WP_Error( 'fail_subdomain_wpcom', sprintf( __( 'Domain `%1$s` just failed is_usable_domain check as it is a subdomain of WordPress.com.', 'jetpack' ), $domain ) );
		}

		// If PHP was compiled without support for the Filter module (very edge case)
		if ( ! function_exists( 'filter_var' ) ) {
			// Just pass back true for now, and let wpcom sort it out.
			return true;
		}

		return true;
	}
}
