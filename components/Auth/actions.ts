"use server"
import { getCustomerData } from "@/lib/shopify/functions/customers";
import { cookies } from "next/headers";

export const customerData = async():Promise<string> =>{
    let customerToken = cookies().get('token')?.value;
    try {
        if(!customerToken){
            throw new Error("You need to log in");
        }
        const customerDataReq = await getCustomerData(customerToken);
        return customerDataReq.body.data.customer.email;    
    } catch (error) {
        throw new Error("You need to log in");
    }
}
