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

export const getProductsByIds = unstable_cache(
    async (ids: string[]) => {
        try {
            if (!ids || ids.length === 0) return { success: true, data: [] };

            const products = await prisma.product.findMany({
                where: {
                    id: { in: ids },
                },
            });

            const missing = ids.filter(
                (id) => !products.find((p) => p.id === id)
            );
            if (missing.length > 0) {
                return {
                    success: false,
                    error: `Products not found: ${missing.join(', ')}`,
                };
            }

            const plainProducts = products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price.toNumber(),
                discount: product.discount?.toNumber() ?? null,
                images: product.images,
                stock: product.stock,
                category: product.category,
                rating: product.rating?.toNumber() ?? null,
            }));

            return { success: true, data: plainProducts };
        } catch {
            return {
                success: false,
                error: 'Failed to load products, please try again',
            };
        }
    },
    ['products-by-ids'],
    {
        revalidate: 3600,
        tags: ['product'],
    }
);
