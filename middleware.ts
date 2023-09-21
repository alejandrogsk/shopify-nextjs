import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token = request.cookies.has("token")
    if(token){
      return NextResponse.redirect(new URL('/auth/logout', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/auth'],
}