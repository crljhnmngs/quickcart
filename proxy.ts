import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface AuthRequest extends NextRequest {
    auth: {
        user?: {
            isAdmin?: boolean;
        };
    } | null;
}

export default auth((req: AuthRequest) => {
    const isLoggedIn = !!req.auth;
    const isAdmin = req.auth?.user?.isAdmin;
    //Root path - redirect when user is admin
    if (req.nextUrl.pathname === '/') {
        if (isLoggedIn && isAdmin) {
            return NextResponse.redirect(new URL('/admin', req.url));
        }
    }

    if (
        req.nextUrl.pathname === '/login' ||
        req.nextUrl.pathname === '/products' ||
        req.nextUrl.pathname.startsWith('/products/')
    ) {
        if (isLoggedIn && isAdmin) {
            return NextResponse.redirect(new URL('/admin', req.url));
        }
    }

    // Protect /admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
        if (!isAdmin) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    // Protect /user routes
    if (
        req.nextUrl.pathname.startsWith('/orders') ||
        req.nextUrl.pathname.startsWith('/profile') ||
        req.nextUrl.pathname.startsWith('/checkout')
    ) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
        if (isAdmin) {
            return NextResponse.redirect(new URL('/admin', req.url));
        }
    }
});

export const config = {
    matcher: [
        '/',
        '/login',
        '/checkout/:path*',
        '/products/:path*',
        '/admin/:path*',
        '/orders/:path*',
        '/profile/:path*',
    ],
};
