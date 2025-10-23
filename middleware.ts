/**
 * Next.js Middleware
 * Protects routes and handles authentication
 */

import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Public routes (accessible without authentication)
  const publicRoutes = ['/', '/login', '/signup', '/api/auth'];
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // Protected routes (require authentication)
  const protectedRoutes = ['/dashboard', '/editor', '/projects', '/settings'];
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if accessing login/signup while already authenticated
  if ((pathname === '/login' || pathname === '/signup') && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
