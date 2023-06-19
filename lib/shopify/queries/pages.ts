import { shopifyFetch } from "..";

type ShopifyPageById = {
  data: {
    page: {
      title: string;
      body: string;
    }
  }
  variables: { id: string };
};

const getPageQuery = /* GraphQL */ `
query getPage($id: ID) {
  page(id: $id) {
    title
    body
  }
}
`;

export async function getPageByID(id: string) {
    return await shopifyFetch<ShopifyPageById>({
      query: getPageQuery,
      variables: {
        id
      }
    });
  }