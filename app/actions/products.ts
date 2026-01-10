'use server';

import prisma from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

export const getProducts = async () => {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return { success: true, data: products };
    } catch {
        return { success: false, error: 'Failed to fetch products' };
    }
};

export const getFeaturedProducts = unstable_cache(
    async () => {
        try {
            const products = await prisma.product.findMany({
                where: { featured: true },
                take: 8,
                orderBy: { createdAt: 'desc' },
            });

            return { success: true, data: products };
        } catch {
            return {
                success: false,
                error: 'Failed to fetch featured products',
            };
        }
    },
    ['featured-products'],
    {
        revalidate: 3600,
        tags: ['featured-products'],
    }
);
