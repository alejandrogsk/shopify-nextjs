const brandFragment = /* GraphQL */ `
    fragment brand on Product {
        brand: metafield(namespace: "custom", key:"brand"){
            type
            value
        } 
    }
`;

export default brandFragment;
