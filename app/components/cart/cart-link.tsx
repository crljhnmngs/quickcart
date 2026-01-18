'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { useCallback, useEffect, useState } from 'react';
import { getCartCountByUserId } from '@/app/actions/cart';

type CartLinkProps = {
    isAuthenticated: boolean;
    userId: string;
};

export const CartLink = ({ isAuthenticated, userId }: CartLinkProps) => {
    const localCount = useCartStore((state) =>
        state.items.reduce((sum, item) => sum + item.quantity, 0),
    );

    const [dbCount, setDbCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchCount = useCallback(async () => {
        if (!isAuthenticated) return;

        setLoading(true);
        try {
            const result = await getCartCountByUserId(userId);
            if (result.success) {
                setDbCount(result.count ?? 0);
            }
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, userId]);

    useEffect(() => {
        let mounted = true;

        const loadCount = async () => {
            if (mounted) {
                await fetchCount();
            }
        };

        loadCount();

        const handleCartUpdate = () => {
            if (mounted) {
                fetchCount();
            }
        };

        window.addEventListener('cart-updated', handleCartUpdate);

        return () => {
            mounted = false;
            window.removeEventListener('cart-updated', handleCartUpdate);
        };
    }, [fetchCount]);

    const totalItems = isAuthenticated ? dbCount : localCount;

    return (
        <Link
            href="/cart"
            className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors"
            title="View Cart"
        >
            <ShoppingCart className="w-6 h-6 text-gray-600" />

            {/* Loader */}
            {isAuthenticated && loading && (
                <span className="absolute -top-1 -right-1 bg-gray-300 w-5 h-5 rounded-full animate-pulse" />
            )}

            {/* Badge */}
            {!loading && totalItems !== null && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                    {totalItems}
                </span>
            )}
        </Link>
    );
};
