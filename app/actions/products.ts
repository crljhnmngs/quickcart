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

export const getProductById = unstable_cache(
    async (id: string) => {
        try {
            const product = await prisma.product.findUnique({
                where: { id },
            });

            if (!product) {
                return {
                    success: false,
                    error: 'The product you are looking for does not exist or has been removed.',
                };
            }

            return { success: true, data: product };
        } catch {
            return {
                success: false,
                error: 'Failed to load product, please try again',
            };
        }
    },
    ['product-by-id'],
    {
        revalidate: 3600,
        tags: ['product'],
    }
);
