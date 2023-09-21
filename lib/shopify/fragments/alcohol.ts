const alcoholFragment = /* GraphQL */ `
    fragment alcohol on Product {
        alcohol: metafield(namespace: "custom", key:"alcohol"){
            type
            value
        } 
    }
`;

export default alcoholFragment;
