import { NextResponse } from "next/server";
export async function GET(req: Request) {
    try {
        //Create a response
        const response = NextResponse.json(
            {
                message: "Bye",
                data: { 
                    ok:true
                },
            },
            { status: 200 }
        );
        response.cookies.delete("token");

        return response
    } catch (e) {
        console.log("e in CATCH::::___:::", e);
        return NextResponse.json({
            ok: false,
            message: "Todo bad",
        },
        {status:500}
        );
    }
}