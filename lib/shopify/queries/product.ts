import { Product } from "@/types/Product";
import { shopifyFetch } from "..";
import productFragment from "../fragments/product";


type ShopifyProductByHandleOperation = {
  data: {
    product: Product;   
  };
  variables: { handle: string };
};

type ShopifyProductByIdOperation = {
  data: {
    product: Product;   
  };
  variables: { id: string };
};

//Get Single Product 
//Query
const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;

const getProductByIdQuery = /* GraphQL */ `
  query getProduct($id: ID!) {
    product(id: $id) {
      ...product
    }
  }
  ${productFragment}
`;
//Function
export async function getProductByHandle(handle:string) {
  return shopifyFetch<ShopifyProductByHandleOperation>({ 
    query: getProductQuery, 
    variables: {
      handle
    },
    cache: "force-cache"
  })
}


//Get product by id
export async function getProductById(id:string) {
  return shopifyFetch<ShopifyProductByIdOperation>({ 
    query: getProductByIdQuery, 
    variables: {
      id
    }
  })
}



//Get List Of Products

//Query
const getProductsQuery = /* GraphQL */ `
  query getProducts($first: Int) {
    products(first: $first) {
      edges{
              node {
                ...product
              }
            }
          }
        }
  ${productFragment}
`;

//Function
export async function getAllProducts(first: number = 10) {
  return shopifyFetch<SopifyGetAllProductsOperation>({
      query: getProductsQuery,
      variables: {
        first
      }
  });
}
type SopifyGetAllProductsOperation = {
  data: {
      products: {
          edges: {
              node: Product;
          }[];
      };
  };
  variables: { first: number };
};




