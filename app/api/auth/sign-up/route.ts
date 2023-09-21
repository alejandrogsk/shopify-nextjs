import { NextResponse } from "next/server";
import { z } from "zod";
import { Customer } from "@/types/Customer";
import {
    createNewCustomer,
} from "@/lib/shopify/mutations/customers";
import { registerSchema } from "@/lib/api/auth/schemas";
import createAccessToken from "@/lib/api/auth/createAccessToken";
import ErrorResponse from "@/lib/api/ErrorResponse";



export async function POST(req: Request) {
    try {
        const reqData = await req.json();
        console.log("body", reqData);
        const body = registerSchema.safeParse(reqData);

        if (body.success === false) {
            console.log(body.error.errors[0].message);
            return NextResponse.json({
                ok: false,
                message: body.error.errors[0].message,
            }, { status:400});
        }
        console.log("response: ", body);

        //Create user
        const { newUser, ok, message } = await createNewShopifyCustomer(body.data);
        console.log("new USER CREATED: ", newUser)
        if(!ok){
            return NextResponse.json({
                newUser, ok, message
            });
        }
        //Create Token
        const { token, expiresAt } = await createAccessToken(
            body.data.userEmail,
            body.data.userPassword
        );

        if (!token || !expiresAt) return ErrorResponse()
        //Create a response
        const response = NextResponse.json(
            {
                message: "Success",
                data: {
                    customer: newUser,
                    token: true,
                    ok:true
                },
            },
            { status: 200 }
        );
        // //Set the cookie for the response
        response.cookies.set("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            expires: new Date(expiresAt),
            path: "/",
        });

        return response
    } catch (e) {
        console.log("e in CATCH::::___:::", e);
        return NextResponse.json({
            ok: false,
            message: "Todo bad",
        }, {status:500});
    }
}


type User = z.infer<typeof registerSchema>;
const createNewShopifyCustomer = async (user: User): Promise<{ok: boolean, message:string, newUser:Customer|null}> => {
    const {
        userName,
        userLastName,
        userPassword,
        userEmail,
        userAcceptsMarketing,
    } = user;
    try {
        const newUser = await createNewCustomer({
            firstName: userName,
            lastName: userLastName,
            email: userEmail,
            password: userPassword,
            acceptsMarketing: userAcceptsMarketing,
           
        });

        if(newUser.body.data.customerCreate.customerUserErrors[0]){
            return { ok: false, message:newUser.body.data.customerCreate.customerUserErrors[0].message, newUser: null}
        }

        if (
            newUser.body.errors !== undefined &&
            newUser.body.errors.length > 0
        ) {
            let message = newUser.body.errors[0].message;
            return { ok: false, message, newUser: null}
        }

        const { customer, customerUserErrors } =
            newUser.body.data.customerCreate;
        if (customer === null) {
            if (customerUserErrors.length > 0) {
                let message = customerUserErrors[0].message;
                return { ok: false, message, newUser: null}
            } else {
              return { ok: false, message:"Sorry something went wrong", newUser: null}
            }
        }

        return { ok: true, newUser:customer, message:"Succes" };
    } catch (e: any ) {
        console.log("Error creating a new user (CATCH)", e?.error?.message ?? "error in catch: createNewShopifyCustomer");
        return { ok: false, message: e?.error?.message??"Error creating a new user", newUser: null}
    }
};




export async function GET(req: Request) {
    return NextResponse.json({ ok: true });
}
