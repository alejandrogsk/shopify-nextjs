export type CartInput = {
    lines: {
        quantity:number, 
        merchandiseId:string
    }[],
    attributes?: {
        key: string
        value: string
    },
    buyerIdentity?: {
        email: string
    }
}