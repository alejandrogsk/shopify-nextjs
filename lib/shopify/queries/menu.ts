import { endpoint, shopifyFetch } from "..";
type ShopifyMenuOperation = {
    data: {
      menu?: {
        items: {
          title: string;
          url: string;
        }[];
      };
    };
    variables: {
      handle: string;
    };
  };

type Menu = {
    title: string;
    path: string;
};

  export const getMenuQuery = /* GraphQL */ `
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        title
        url
      }
    }
  }
`;
 
export async function getMenu(handle: string): Promise<Menu[]> {
    const res = await shopifyFetch<ShopifyMenuOperation>({
      query: getMenuQuery,
      variables: {
        handle
      }
    });
  
    return (
      res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
        title: item.title,
        path: item.url.replace(endpoint, '').replace('/collections', '/search').replace('/pages', '')
      })) || []
    );
  }
  