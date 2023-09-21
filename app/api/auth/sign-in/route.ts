import ErrorResponse from "@/lib/api/ErrorResponse";
import createAccessToken from "@/lib/api/auth/createAccessToken";
import { loginSchema } from "@/lib/api/auth/schemas";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const reqData = await req.json();
        const body = loginSchema.safeParse(reqData);

        if (body.success === false) {
            console.log(body.error.errors[0].message);
            return NextResponse.json({
                ok: false,
                message: body.error.errors[0].message,
            });
        }
        console.log("response: ", body);

        
        //Create Token
        const { token, expiresAt } = await createAccessToken(
            body.data.userEmail,
            body.data.userPassword
        );

        if (!token||!expiresAt) return ErrorResponse("Try with other email or password")
        //Create a response
        const response = NextResponse.json(
            {
                message: "Success",
                data: { 
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
        },
        {status:500});
    }
}