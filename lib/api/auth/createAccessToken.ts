import { createNewCustomerAccessToken } from "@/lib/shopify/mutations/customers";

const createAccessToken = async (email: string, password: string):Promise<{ok: boolean, message:string, token:string|null}> => {
    try {
        const accessTokenGeneration = await createNewCustomerAccessToken({
            email,
            password,
        });

        const accessToken =
            accessTokenGeneration.body.data.customerAccessTokenCreate
                .customerAccessToken.accessToken;
        return { ok: true, token: accessToken, message:"Sucess!" };
    } catch (error) {
        return {
          ok: false,
                message: "Error: User was created, but NOT the TOKEN",
                token: null
        }
    }
};

export default createAccessToken;