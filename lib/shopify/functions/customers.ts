import { Customer } from "@/types/Customer";
import { shopifyFetch } from "..";
import { getCustomerDataQuery } from "../queries/customers";


type ShopifyGetCustomerDataOperation = {
    data: {
                customer: Customer
       
        
    }
      variables: {
        customerAccessToken: string;
      };
}

export async function getCustomerData(customerAccessToken:string){
    return await shopifyFetch<ShopifyGetCustomerDataOperation>({
        query: getCustomerDataQuery,
        variables: {
            customerAccessToken
        },
        cache: "no-store"
    })
}