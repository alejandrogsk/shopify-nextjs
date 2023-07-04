const relatedFragment = /* GraphQL */ `
    fragment related on Product {
        related: metafield(namespace: "shopify--discovery--product_recommendation", key:"related_products"){
            type
            value
        } 
    }
`;

export default relatedFragment;