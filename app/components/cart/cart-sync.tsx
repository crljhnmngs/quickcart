'use client';

import { useEffect, useRef } from 'react';
import { useCartStore } from '@/store/cart-store';
import { syncLocalCartToDatabase } from '@/app/actions/cart';
import { logger } from '@/lib/logger';
import toast from 'react-hot-toast';

export const CartSync = () => {
    const items = useCartStore((state) => state.items);
    const clear = useCartStore((state) => state.clear);
    const hasSynced = useRef(false);

    useEffect(() => {
        // Prevent double sync in React Strict Mode
        if (hasSynced.current) return;

        const syncCart = async () => {
            // Only sync if there are items in local cart
            if (items.length === 0) return;

            hasSynced.current = true;

            const result = await syncLocalCartToDatabase(items);

            if (result.success) {
                // Clear local cart after successful sync
                clear();
                toast.success('Local cart synced successfully', {
                    position: 'top-right',
                });
            } else {
                logger.error('Failed to sync local cart:', result.error);
                toast.error('Failed to sync local cart', {
                    position: 'top-right',
                });

                // Reset flag if sync failed
                hasSynced.current = false;
            }
        };

        syncCart();
    }, []); // Only run once on mount

    return null;
};
