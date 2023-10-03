import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token = request.cookies.has("token")

  if (request.nextUrl.pathname === '/auth') {
    if(token){
      console.log('Token exists, should see logout page')
      return NextResponse.redirect(new URL('/auth/logout', request.url))
    }
    return NextResponse.next()
  }

  if (request.nextUrl.pathname === '/auth/logout') {
    if(token){
      console.log('Token exists, should see logout page')
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/auth', request.url))
  }
 

  console.log('None middleware was applied')
  return NextResponse.next()
}

export const config = {
  matcher: ['/auth', '/auth/logout'],
}