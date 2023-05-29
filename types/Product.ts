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
            id: number
            title: string
            availableForSale:boolean
            price:string
            compareAtPrice:string
          }
        }
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