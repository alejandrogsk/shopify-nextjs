export type Product = {
    id: string;
    title: string;
    handle: string;
    description: string;
    priceRange: {
        maxVariantPrice: {
            amount: string
        }
        minVariantPrice: {
            amount: string
        }
    }
    featuredImage: ImageAttributes
    totalInventory:number
    collections?:{
        edges: {
            node: {
                id: string;
                title: string;
                handle: string;
            }
        }[]
    }
    seo: {
        title: string
        description: string
    }
    variants: {
        edges: {
          node: {
            id: string
            title: string
            availableForSale:boolean
            price: {
                amount:string
                currencyCode:string
              }
              compareAtPrice: {
                amount:string
                currencyCode:string
              }
          }
        }[]
      }

    brand: {
        value?: string
    }
    alcohol: {
        value?: string
    }
    related: {
        value?: string
    }
}

type ImageAttributes = {
    altText: string
        height: number
        url: string
        width: number
        src:string
}

export type GetAllProductsQuery = {
    edges: {
        node:Product
    }[]
}