import { NextResponse } from "next/server"

const ErrorResponse = (message:string="Something went wrong", statusCode:number=400):NextResponse => {
    return NextResponse.json(
      {
        ok: false,
        message: message
      },
      {status: statusCode}
    )
  }
export default ErrorResponse