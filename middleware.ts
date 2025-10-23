/**
 * Next.js Middleware
 * Protects routes and handles authentication (NextAuth v4)
 *
 * Note: Using simplified middleware without PrismaAdapter to avoid Edge Runtime issues
 */

import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const { pathname } = req.nextUrl;

      // Public routes (accessible without authentication)
      const publicRoutes = ['/', '/login', '/signup'];
      if (publicRoutes.includes(pathname) || pathname.startsWith('/api/auth')) {
        return true;
      }

      // Protected routes (require authentication)
      const protectedRoutes = ['/dashboard', '/editor', '/projects', '/settings'];
      const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

      if (isProtectedRoute) {
        return !!token; // Must be logged in
      }

      return true; // Allow all other routes
    },
  },
  pages: {
    signIn: '/login',
  },
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
