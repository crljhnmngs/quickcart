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

    // Protect /admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
        if (!isAdmin) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    // Protect /user routes
    if (
        req.nextUrl.pathname.startsWith('/orders') ||
        req.nextUrl.pathname.startsWith('/profile')
    ) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }
});

export const config = {
    matcher: ['/admin/:path*', '/orders/:path*', '/profile/:path*'],
};
