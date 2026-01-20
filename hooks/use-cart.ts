'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useCartStore } from '@/store/cart-store';
import { logger } from '@/lib/logger';
import { getCartItemsByUserId } from '@/app/actions/cart';
import { getProductsByIds } from '@/app/actions/products';

type Product = {
    id: string;
    name: string;
    price: number;
    discount: number | null;
    images: string[];
    stock: number;
    category: string | null;
    rating: number | null;
};

type CartItem = {
    id: string;
    productId: string;
    quantity: number;
    product: Product;
};

type UseCartReturn = {
    items: CartItem[];
    itemCount: number;
    subtotal: number;
    tax: number;
    total: number;
    isLoading: boolean;
};

export const useCart = (userId?: string): UseCartReturn => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Zustand store for guest users
    const guestItems = useCartStore((state) => state.items);
    const hydrated = useCartStore((state) => state.hydrated);
    const hydrate = useCartStore((state) => state.hydrate);

    useEffect(() => {
        hydrate();
    }, [hydrate]);

    // Fetch cart data
    const fetchCart = useCallback(async () => {
        setIsLoading(true);
        try {
            if (userId) {
                const result = await getCartItemsByUserId(userId);
                setItems(result.success ? (result.data ?? []) : []);
                return;
            }

            if (!hydrated) return;

            if (guestItems.length === 0) {
                setItems([]);
                return;
            }

            const productIds = [...new Set(guestItems.map((i) => i.productId))];
            const productsResult = await getProductsByIds(productIds);

            if (!productsResult.success || !productsResult.data) {
                setItems([]);
                return;
            }

            const combined = guestItems
                .map((item) => {
                    const product = productsResult.data.find(
                        (p) => p.id === item.productId,
                    );
                    if (!product) return null;

                    return {
                        id: item.productId,
                        productId: item.productId,
                        quantity: item.quantity,
                        product,
                    };
                })
                .filter(Boolean) as CartItem[];

            setItems(combined);
        } catch (err) {
            logger.error(err);
            setItems([]);
        } finally {
            setIsLoading(false);
        }
    }, [userId, guestItems, hydrated]);

    useEffect(() => {
        fetchCart();

        window.addEventListener('cart-updated', fetchCart);
        return () => window.removeEventListener('cart-updated', fetchCart);
    }, [fetchCart]);

    // Calculate totals
    const { subtotal, itemCount, tax, total } = useMemo(() => {
        const subtotal = items.reduce((sum, item) => {
            const price = item.product.discount
                ? item.product.price * (1 - item.product.discount / 100)
                : item.product.price;
            return sum + price * item.quantity;
        }, 0);

        const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
        const tax = subtotal * 0.08;

        return {
            subtotal,
            itemCount,
            tax,
            total: subtotal + tax,
        };
    }, [items]);

    return {
        items,
        itemCount,
        subtotal,
        tax,
        total,
        isLoading,
    };
};
