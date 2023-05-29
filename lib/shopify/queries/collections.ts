import { Product } from "@/types/Product";
import { shopifyFetch } from "..";
import paginationFragment from "../fragments/pagination";
import productFragment from "../fragments/product";

const getCollection = (handle: string, first: number, after: string|null = null) => {
    return shopifyFetch<ShopifyGetCollection>({ query: getCollectionProductsQuery, variables: {
        handle,
        first,
        after
    }})
};
export default getCollection

type ShopifyGetCollection = {
    data: {
        collection: Collection
    }
        

    variables: {
        handle: string
        first: number
        after: string|null
    }
}

type Collection = {
    title: string
    seo: {
        title: string | null
        description: string | null
    }
    description: string
    products: {
        edges: {
            node: Product
        }[]
    }
}


const getCollectionProductsQuery = /* GraphQL */ `
    query getCollectionProducts($handle: String, $first: Int=2, $after: String = null){
        collection(handle: $handle){
            seo {
                title
                description
            }
            title
            description
            products(first:$first, after: $after) {
                edges {
                    node {
                        ...product
                    }
                }
                pageInfo {
                    ...pageInfo
                }
            }
        }
    }
    ${productFragment}
    ${paginationFragment}
`;
