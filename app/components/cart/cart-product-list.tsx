import { auth } from '@/auth';
import { CartProductListClient } from './cart-product-list-client';
import { CartProductListServer } from './cart-product-list-server';
import { CartError } from './cart-error';
import { ErrorBoundary } from '../ui/error-boundary';
import { Suspense } from 'react';
import { CartSkeleton } from '../ui/skeletons';

export const CartProductList = async () => {
    const session = await auth();

    if (session?.user) {
        return (
            <ErrorBoundary fallback={<CartError />}>
                <Suspense fallback={<CartSkeleton />}>
                    {/* Authenticated user - fetch from database */}
                    <CartProductListServer userId={session.user.id} />
                </Suspense>
            </ErrorBoundary>
        );
    }

    return (
        <ErrorBoundary fallback={<CartError />}>
            {/*  Guest user - use local storage */}
            <CartProductListClient />
        </ErrorBoundary>
    );
};
