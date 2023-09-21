import alcoholFragment from "./alcohol";
import brandFragment from "./brand";
import imageFragment from "./image";
import relatedFragment from "./relatedProducts";
import seoFragment from "./seo";

const productFragment = /* GraphQL */ `
    fragment product on Product {
        id
        handle
        availableForSale
        title
        description
        descriptionHtml
        options {
            id
            name
            values
        }
        priceRange {
            maxVariantPrice {
                amount
                currencyCode
            }
            minVariantPrice {
                amount
                currencyCode
            }
        }
        totalInventory
        variants(first: 250) {
            edges {
                node {
                    id
                    title
                    availableForSale
                    selectedOptions {
                        name
                        value
                    }
                    price {
                        amount
                        currencyCode
                    }
                    compareAtPrice {
                        amount
                        currencyCode
                    }
                }
            }
        }
        collections(first: 10) {
            edges {
                node {
                    id
                    title
                    handle
                }
            }
        }
        featuredImage {
            ...image
        }
        images(first: 20) {
            edges {
                node {
                    ...image
                }
            }
        }
        seo {
            ...seo
        }
        tags
        updatedAt

        ...brand
        ...alcohol
        ...related
    }

    ${imageFragment}
    ${seoFragment}
    ${brandFragment}
    ${alcoholFragment}
    ${relatedFragment}
`;

export default productFragment;
