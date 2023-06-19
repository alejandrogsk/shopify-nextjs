import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { zfd } from "zod-form-data";
import { z } from "zod"
import { createNewCustomer, createNewCustomerAccessToken } from "@/lib/shopify/mutations/customers";


const schema = zfd.formData({
  email: zfd.text(z.string({
    required_error: "Email is required",
    invalid_type_error: "Provide a valid email"
  }).email()),
  password: zfd.text(z.string({
    required_error: "Password is required",
    invalid_type_error: "Name must be a string",
  })),
  firstName: zfd.text(z.string({
    required_error: "Your name is required",
    invalid_type_error: "Name must be a string",
  }).min(3, {message: "At least 3 characters"}).max(30, {message: "No more than 30 characters"})),
  lastName: zfd.text(z.string({
    required_error: "Your name is required",
    invalid_type_error: "Name must be a string",
  }).min(3, {message: "At least 3 characters"}).max(30, {message: "No more than 30 characters"})),
  phone: zfd.text(z.string({
    required_error: "A phone is required",
    invalid_type_error: "Name must be a string",
  }).min(11, {message: "Enter a valid number (11-12 digits)"}).max(12, {message: "Enter a valid number (11-12 digits)"})),
  acceptsMarketing: zfd.checkbox({trueValue: "true"})
});


export async function POST(req: Request) {
    const {method} = req;

    if (method !== "POST") {
      return NextResponse.json({
        error: { message: `Method ${method} Not Allowed` },
      }, {status: 405})
    }
    const body = await req.formData()
    const response = schema.safeParse(body);

    if (!response.success) {
      const { errors } = response.error;
      return NextResponse.json({
        error: { message: "Invalid request", errors },
      }, {status: 400})
    }

    const { email, password, firstName, lastName, phone, acceptsMarketing } = response.data;
    try {
      const newUser = await createNewCustomer({
        firstName, lastName,email,password,acceptsMarketing,
        phone: `+${phone}`
      })

      if(newUser.body.errors !==undefined && newUser.body.errors.length > 0){
        let message = newUser.body.errors[0].message;
        return NextResponse.json({message}, {status:500})
      }
      const {customer, customerUserErrors} = newUser.body.data.customerCreate;


      if(customer === null){
        if(customerUserErrors.length > 0){
          let message = customerUserErrors[0].message;
          return NextResponse.json({message}, {status:400})
        } else {
          return NextResponse.json({message: "Sorry, something went wrong"}, {status:400})
        }
      }

      let accessToken = null;
      try {
        //After user registration I need to generate the access token
        const accessTokenGeneration = await createNewCustomerAccessToken({email, password})
        accessToken = accessTokenGeneration.body.data.customerAccessTokenCreate.customerAccessToken.accessToken;
      } catch (error) {
          return NextResponse.json({ 
            message: "Unsuccessful", 
            data: {
              customer,
              token: accessToken
            } 
          },{status: 400})
      }

      let response = NextResponse.json({ message: "Success", data: {
        customer,
        token: true
        } 
      },{status: 200})

      response.cookies.set('token', accessToken, {
        httpOnly: true,
        secure:true,
        expires: new Date(Date.now() + 60 * 60 * 24),
        path: "/"
      });

      return response;
      
    } catch (e:any) {
      console.log("e in catch", e)
      return NextResponse.json({ message: e?.error?.message??"Try latter"}, {status: 500})
    }
}


export async function GET(req: NextApiRequest, res: NextApiResponse){
 return NextResponse.json({ok:true})
}