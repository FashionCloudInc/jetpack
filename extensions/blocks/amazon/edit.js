/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * WordPress dependencies
 */
import { BlockControls, BlockIcon, InspectorControls } from '@wordpress/block-editor';
import {
	Button,
	FormTokenField,
	Notice,
	PanelBody,
	Placeholder,
	Toolbar,
	ToggleControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import icon from './icon';
import './editor.scss';

const data = {
	products: [
		{
			title:
				'New York Biology Dead Sea Mud Mask for Face and Body - All Natural - Spa Quality Pore Reducer for Acne, Blackheads and Oily Skin - Tightens Skin for A Healthier Complexion - 8.8 oz',
			asin: 'B01NCM25K7',
			productGroup: 'Beauty',
			authors: [],
			artists: [],
			actors: [],
			manufacturer: 'New York Biology',
			detailPageUrl:
				'https://www.amazon.com/New-York-Biology-Dead-Mask/dp/B01NCM25K7?psc=1&SubscriptionId=AKIAIA3UEVTLIG7AIKFA&tag=%5Bassociate-id-placeholder%5D&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B01NCM25K7',
			listPrice: '$14.95',
			imageUrlSmall: 'https://images-na.ssl-images-amazon.com/images/I/51asbRHNuVL._SL75_.jpg',
			imageHeightSmall: 75,
			imageWidthSmall: 62,
			imageUrlMedium: 'https://images-na.ssl-images-amazon.com/images/I/51asbRHNuVL._SL160_.jpg',
			imageHeightMedium: 160,
			imageWidthMedium: 133,
			imageUrlLarge: 'https://images-na.ssl-images-amazon.com/images/I/51asbRHNuVL.jpg',
			imageHeightLarge: 500,
			imageWidthLarge: 415,
			authorshipInfo: 'New York Biology',
		},
		{
			title: 'Face/Off',
			asin: 'B002PT1KH6',
			productGroup: 'Movie',
			authors: [],
			artists: [],
			actors: [
				'John Travolta',
				'Nicolas Cage',
				'Joan Allen',
				'Alessandro Nivola',
				'Gina Gershon',
			],
			detailPageUrl:
				'https://www.amazon.com/Face-Off-John-Travolta/dp/B002PT1KH6?SubscriptionId=AKIAIA3UEVTLIG7AIKFA&tag=%5Bassociate-id-placeholder%5D&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B002PT1KH6',
			listPrice: '$9.99',
			imageUrlSmall: 'https://images-na.ssl-images-amazon.com/images/I/51TyrHec4QL._SL75_.jpg',
			imageHeightSmall: 75,
			imageWidthSmall: 50,
			imageUrlMedium: 'https://images-na.ssl-images-amazon.com/images/I/51TyrHec4QL._SL160_.jpg',
			imageHeightMedium: 160,
			imageWidthMedium: 107,
			imageUrlLarge: 'https://images-na.ssl-images-amazon.com/images/I/51TyrHec4QL.jpg',
			imageHeightLarge: 500,
			imageWidthLarge: 333,
			authorshipInfo:
				'Starring John Travolta, Nicolas Cage, Joan Allen, Alessandro Nivola, Gina Gershon',
		},
		{
			title:
				'PIXNOR Facial Cleansing Brush [Newest 2020], Waterproof Face Spin Brush with 7 Brush Heads for Deep Cleansing, Gentle Exfoliating, Removing Blackhead, Massaging(Pink)',
			asin: 'B077ZW5YQP',
			productGroup: 'Beauty',
			authors: [],
			artists: [],
			actors: [],
			manufacturer: 'PIXNOR',
			detailPageUrl:
				'https://www.amazon.com/PIXNOR-Cleansing-Waterproof-Exfoliating-Blackhead/dp/B077ZW5YQP?psc=1&SubscriptionId=AKIAIA3UEVTLIG7AIKFA&tag=%5Bassociate-id-placeholder%5D&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B077ZW5YQP',
			listPrice: '$39.99',
			salePrice: '$22.99',
			imageUrlSmall: 'https://images-na.ssl-images-amazon.com/images/I/41KQCaa1hjL._SL75_.jpg',
			imageHeightSmall: 75,
			imageWidthSmall: 75,
			imageUrlMedium: 'https://images-na.ssl-images-amazon.com/images/I/41KQCaa1hjL._SL160_.jpg',
			imageHeightMedium: 160,
			imageWidthMedium: 160,
			imageUrlLarge: 'https://images-na.ssl-images-amazon.com/images/I/41KQCaa1hjL.jpg',
			imageHeightLarge: 500,
			imageWidthLarge: 500,
			authorshipInfo: 'PIXNOR',
		},
		{
			title:
				'BESTOPE Blackhead Remover Pimple Comedone Extractor Tool Best Acne Removal Kit - Treatment for Blemish, Whitehead Popping, Zit Removing for Risk Free Nose Face Skin with Metal Case',
			asin: 'B019SVHLEY',
			productGroup: 'Beauty',
			authors: [],
			artists: [],
			actors: [],
			manufacturer: 'Doctor PimplePopper',
			detailPageUrl:
				'https://www.amazon.com/BESTOPE-Blackhead-Remover-Comedone-Extractor/dp/B019SVHLEY?psc=1&SubscriptionId=AKIAIA3UEVTLIG7AIKFA&tag=%5Bassociate-id-placeholder%5D&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B019SVHLEY',
			listPrice: '$7.99',
			imageUrlSmall: 'https://images-na.ssl-images-amazon.com/images/I/51QHC5fDdfL._SL75_.jpg',
			imageHeightSmall: 75,
			imageWidthSmall: 75,
			imageUrlMedium: 'https://images-na.ssl-images-amazon.com/images/I/51QHC5fDdfL._SL160_.jpg',
			imageHeightMedium: 160,
			imageWidthMedium: 160,
			imageUrlLarge: 'https://images-na.ssl-images-amazon.com/images/I/51QHC5fDdfL.jpg',
			imageHeightLarge: 500,
			imageWidthLarge: 500,
			authorshipInfo: 'Doctor PimplePopper',
		},
		{
			title: 'Welcome to the Jungle',
			asin: 'B004L3L9PM',
			productGroup: 'TV Series Episode Video on Demand',
			authors: [],
			artists: [],
			actors: [],
			detailPageUrl:
				'https://www.amazon.com/Welcome-to-the-Jungle/dp/B004L3L9PM?SubscriptionId=AKIAIA3UEVTLIG7AIKFA&tag=%5Bassociate-id-placeholder%5D&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B004L3L9PM',
			listPrice: '$2.99',
			imageUrlSmall: 'https://images-na.ssl-images-amazon.com/images/I/51KBv1L7lJL._SL75_.jpg',
			imageHeightSmall: 56,
			imageWidthSmall: 75,
			imageUrlMedium: 'https://images-na.ssl-images-amazon.com/images/I/51KBv1L7lJL._SL160_.jpg',
			imageHeightMedium: 120,
			imageWidthMedium: 160,
			imageUrlLarge: 'https://images-na.ssl-images-amazon.com/images/I/51KBv1L7lJL.jpg',
			imageHeightLarge: 375,
			imageWidthLarge: 500,
			authorshipInfo: '',
		},
		{
			title:
				'Black Charcoal Mask - Face Peel Off Mask with Organic Bamboo and Vitamin C - Deep Cleansing Pore Blackhead Removal and Purifying Black Mask for Men and Women',
			asin: 'B07V1MPG8N',
			productGroup: 'Beauty',
			authors: [],
			artists: [],
			actors: [],
			manufacturer: "O'linear",
			detailPageUrl:
				'https://www.amazon.com/Black-Charcoal-Mask-Cleansing-Blackhead/dp/B07V1MPG8N?SubscriptionId=AKIAIA3UEVTLIG7AIKFA&tag=%5Bassociate-id-placeholder%5D&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B07V1MPG8N',
			listPrice: '$7.49',
			imageUrlSmall: 'https://images-na.ssl-images-amazon.com/images/I/51QkF1BReJL._SL75_.jpg',
			imageHeightSmall: 75,
			imageWidthSmall: 75,
			imageUrlMedium: 'https://images-na.ssl-images-amazon.com/images/I/51QkF1BReJL._SL160_.jpg',
			imageHeightMedium: 160,
			imageWidthMedium: 160,
			imageUrlLarge: 'https://images-na.ssl-images-amazon.com/images/I/51QkF1BReJL.jpg',
			imageHeightLarge: 500,
			imageWidthLarge: 500,
			authorshipInfo: "O'linear",
		},
		{
			title:
				'Girl, Wash Your Face: Stop Believing the Lies about Who You Are So You Can Become Who You Were Meant to Be',
			asin: '1400201659',
			productGroup: 'Book',
			authors: [ 'Rachel Hollis' ],
			artists: [],
			actors: [],
			manufacturer: 'Thomas Nelson',
			detailPageUrl:
				'https://www.amazon.com/Girl-Wash-Your-Face-Believing/dp/1400201659?SubscriptionId=AKIAIA3UEVTLIG7AIKFA&tag=%5Bassociate-id-placeholder%5D&linkCode=xm2&camp=2025&creative=165953&creativeASIN=1400201659',
			listPrice: '$11.88',
			imageUrlSmall: 'https://images-na.ssl-images-amazon.com/images/I/51uuwa-5OgL._SL75_.jpg',
			imageHeightSmall: 75,
			imageWidthSmall: 49,
			imageUrlMedium: 'https://images-na.ssl-images-amazon.com/images/I/51uuwa-5OgL._SL160_.jpg',
			imageHeightMedium: 160,
			imageWidthMedium: 104,
			imageUrlLarge: 'https://images-na.ssl-images-amazon.com/images/I/51uuwa-5OgL.jpg',
			imageHeightLarge: 500,
			imageWidthLarge: 326,
			authorshipInfo: 'By Rachel Hollis',
		},
		{
			title: 'Death Dealers',
			asin: 'B07F75BN4W',
			productGroup: 'TV Series Episode Video on Demand',
			authors: [],
			artists: [],
			actors: [],
			detailPageUrl:
				'https://www.amazon.com/Death-Dealers/dp/B07F75BN4W?SubscriptionId=AKIAIA3UEVTLIG7AIKFA&tag=%5Bassociate-id-placeholder%5D&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B07F75BN4W',
			listPrice: '$1.99',
			authorshipInfo: '',
		},
		{
			title:
				'eDiva Natural Jade Roller- Gua Sha - Lymphatic Drainage Tool for Face, Neck, Body - Anti Aging Treatment - Reduces Wrinkles and Fine Lines',
			asin: 'B07HHF37F7',
			productGroup: 'Beauty',
			authors: [],
			artists: [],
			actors: [],
			manufacturer: 'eDiva',
			detailPageUrl:
				'https://www.amazon.com/eDiva-Natural-Jade-Roller-Gua/dp/B07HHF37F7?SubscriptionId=AKIAIA3UEVTLIG7AIKFA&tag=%5Bassociate-id-placeholder%5D&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B07HHF37F7',
			listPrice: '$49.95',
			salePrice: '$22.95',
			imageUrlSmall: 'https://images-na.ssl-images-amazon.com/images/I/41DWi8-M92L._SL75_.jpg',
			imageHeightSmall: 75,
			imageWidthSmall: 75,
			imageUrlMedium: 'https://images-na.ssl-images-amazon.com/images/I/41DWi8-M92L._SL160_.jpg',
			imageHeightMedium: 160,
			imageWidthMedium: 160,
			imageUrlLarge: 'https://images-na.ssl-images-amazon.com/images/I/41DWi8-M92L.jpg',
			imageHeightLarge: 500,
			imageWidthLarge: 500,
			authorshipInfo: 'eDiva',
		},
		{
			title: 'Pack Leaders',
			asin: 'B071GRS6R9',
			productGroup: 'TV Series Episode Video on Demand',
			authors: [],
			artists: [],
			actors: [
				'McKenzie Westmore',
				'Ve Neill',
				'Glenn Hetrick',
				'Neville Page',
				'Michael Westmore',
			],
			detailPageUrl:
				'https://www.amazon.com/Pack-Leaders/dp/B071GRS6R9?SubscriptionId=AKIAIA3UEVTLIG7AIKFA&tag=%5Bassociate-id-placeholder%5D&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B071GRS6R9',
			listPrice: '$2.99',
			imageUrlSmall: 'https://images-na.ssl-images-amazon.com/images/I/51rP3BM0oxL._SL75_.jpg',
			imageHeightSmall: 56,
			imageWidthSmall: 75,
			imageUrlMedium: 'https://images-na.ssl-images-amazon.com/images/I/51rP3BM0oxL._SL160_.jpg',
			imageHeightMedium: 120,
			imageWidthMedium: 160,
			imageUrlLarge: 'https://images-na.ssl-images-amazon.com/images/I/51rP3BM0oxL.jpg',
			imageHeightLarge: 375,
			imageWidthLarge: 500,
			authorshipInfo:
				'Starring McKenzie Westmore, Ve Neill, Glenn Hetrick, Neville Page, Michael Westmore',
		},
	],
};
const suggestions = data.products.map( product => product.title + ' (ASIN:' + product.asin + ')' );

export default function AmazonEdit( {
	attributes: {
		backgroundColor,
		textColor,
		buttonAndLinkColor,
		style,
		product,
		showImage,
		showTitle,
		showSeller,
		showPrice,
		showDescription,
		showPurchaseButton,
	},
	className,
	setAttributes,
} ) {
	const notice = false; // TODO

	const onInputChange = value => {
		console.log( value );
	};

	const idRegex = /^(\d+)$|\(ASIN:(.+)\)$/;
	const onChange = selected => {
		const selectedIds = selected.map( restaurant => {
			const parsed = idRegex.exec( restaurant );
			const selectedId = parsed[ 1 ] || parsed[ 2 ];
			return data.products.filter( filteredProduct => filteredProduct.asin === selectedId );
		} );
		setAttributes( { product: selectedIds[ 0 ][ 0 ] } );
	};

	const blockPlaceholder = (
		<Placeholder
			label={ __( 'Amazon', 'jetpack' ) }
			instructions={ __( 'Search by entering an Amazon product name or ID below.', 'jetpack' ) }
			icon={ <BlockIcon icon={ icon } /> }
			notices={
				notice && (
					<Notice status="error" isDismissible={ false }>
						{ notice }
					</Notice>
				)
			}
		>
			<form>
				<FormTokenField
					value={ product }
					suggestions={ suggestions }
					onInputChange={ onInputChange }
					maxSuggestions={ 10 }
					label={ __( 'Products', 'jetpack' ) }
					onChange={ onChange }
				/>
				<Button isSecondary isLarge type="submit">
					{ __( 'Preview', 'jetpack' ) }
				</Button>
			</form>
		</Placeholder>
	);

	const styleOptions = [
		{ name: 'small', label: __( 'Small', 'jetpack' ) },
		{ name: 'large', label: __( 'Large', 'jetpack' ) },
	];

	const blockControls = (
		<BlockControls>
			{ product && (
				<Toolbar
					isCollapsed={ true }
					icon="admin-appearance"
					label={ __( 'Style', 'jetpack' ) }
					controls={ styleOptions.map( styleOption => ( {
						title: styleOption.label,
						isActive: styleOption.name === style,
						onClick: () => setAttributes( { style: styleOption.name } ),
					} ) ) }
					popoverProps={ { className: 'is-calendly' } }
				/>
			) }
		</BlockControls>
	);

	const inspectorControls = (
		<InspectorControls>
			{ product && (
				<PanelBody title={ __( 'Promotion Settings', 'jetpack' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Image', 'jetpack' ) }
						checked={ showImage }
						onChange={ () => setAttributes( { showImage: ! showImage } ) }
					/>
					<ToggleControl
						label={ __( 'Show Title', 'jetpack' ) }
						checked={ showTitle }
						onChange={ () => setAttributes( { showTitle: ! showTitle } ) }
					/>
					<ToggleControl
						label={ __( 'Show Author/Seller', 'jetpack' ) }
						checked={ showSeller }
						onChange={ () => setAttributes( { showSeller: ! showSeller } ) }
					/>
					<ToggleControl
						label={ __( 'Show Price', 'jetpack' ) }
						checked={ showPrice }
						onChange={ () => setAttributes( { showPrice: ! showPrice } ) }
					/>
					<ToggleControl
						label={ __( 'Show Description', 'jetpack' ) }
						checked={ showDescription }
						onChange={ () => setAttributes( { showDescription: ! showDescription } ) }
					/>
					<ToggleControl
						label={ __( 'Show Purchase Button', 'jetpack' ) }
						checked={ showPurchaseButton }
						onChange={ () => setAttributes( { showPurchaseButton: ! showPurchaseButton } ) }
					/>
				</PanelBody>
			) }
		</InspectorControls>
	);

	console.log( product );
	const blockPreview = product && (
		<div>
			{ product.title }
			{ product.asin }
			{ product.productGroup }
			{ product.authors }
			{ product.artists }
			{ product.actors }
			{ product.manufacturer }
			{ product.detailPageUrl }
			{ product.listPrice }
			{ product.imageUrlSmall }
			{ product.imageHeightSmall }
			{ product.imageWidthSmall }
			{ product.imageUrlMedium }
			{ product.imageHeightMedium }
			{ product.imageWidthMedium }
			{ product.imageUrlLarge }
			{ product.imageHeightLarge }
			{ product.imageWidthLarge }
			{ product.authorshipInfo }
		</div>
	);

	return (
		<div className={ className }>
			{ inspectorControls }
			{ blockControls }
			{ product ? blockPreview : blockPlaceholder }
		</div>
	);
}
