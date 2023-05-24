export type Product = {
    id: string;
    title: string;
    description: string;
    priceRangeV2: {
        maxVariantPrice: {
            amount: string
        }
        minVariantPrice: {
            amount: string
        }
    }
    featuredImage: ImageAttributes
    totalInventory:number
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