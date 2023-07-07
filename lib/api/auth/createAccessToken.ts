import { createNewCustomerAccessToken } from "@/lib/shopify/mutations/customers";

const createAccessToken = async (email: string, password: string):Promise<{ok: boolean, message:string, token:string|null, expiresAt:string|null}> => {
    try {
        const accessTokenGeneration = await createNewCustomerAccessToken({
            email,
            password,
        });
        const accessToken =accessTokenGeneration.body.data.customerAccessTokenCreate.customerAccessToken.accessToken;
        const expiresAt = accessTokenGeneration.body.data.customerAccessTokenCreate.customerAccessToken.expiresAt;
        return { ok: true, token: accessToken, expiresAt:expiresAt, message:"Sucess!" };
    } catch (error) {
        console.log("Error in catch while generating token", error)
        return {
            ok: false,
            message: "Error: User was created, but NOT the TOKEN",
            token: null,
            expiresAt:null
        }
    }
};

export default createAccessToken;