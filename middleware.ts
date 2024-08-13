// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value
  
  // List of paths that should be accessible without being logged in
  const publicRoutes = ['/login', '/signup']
  
  // If user is not logged in and trying to access a non-public route, redirect to login
  if (!token && !publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Allow the request to continue
  return NextResponse.next()
}

// Run the middleware on all routes except for static files and API routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}