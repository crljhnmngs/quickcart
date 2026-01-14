'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store/cart-store';

export const CartProvider = () => {
    const setItems = useCartStore((state) => state.setItems);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const storedCart = localStorage.getItem('guest_cart');
        if (storedCart) {
            setItems(JSON.parse(storedCart));
        }
    }, [setItems]);

    return null;
};
