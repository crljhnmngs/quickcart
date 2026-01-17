'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export const addToCart = async (productId: string, quantity: number) => {
    try {
        const session = await auth();
        if (!session) {
            return { success: false, error: 'Not authenticated' };
        }

        await prisma.cartItem.upsert({
            where: {
                userId_productId: {
                    userId: session.user.id,
                    productId: productId,
                },
            },
            update: {
                quantity: {
                    increment: quantity,
                },
            },
            create: {
                userId: session.user.id,
                productId: productId,
                quantity: quantity,
            },
        });

        return { success: true };
    } catch {
        return {
            success: false,
            error: 'Failed to add item to cart',
        };
    }
};

export const getCartCount = async (userId: string) => {
    try {
        const count = await prisma.cartItem.aggregate({
            where: { userId: userId },
            _sum: { quantity: true },
        });
        return { success: true, count: count._sum.quantity ?? 0 };
    } catch {
        return {
            success: false,
            error: 'Failed to fetch cart count',
            count: 0,
        };
    }
};

export const removeFromCart = async (productId: string) => {
    try {
        const session = await auth();
        if (!session) {
            return { success: false, error: 'Not authenticated' };
        }

        await prisma.cartItem.delete({
            where: {
                userId_productId: {
                    userId: session.user.id,
                    productId: productId,
                },
            },
        });

        return { success: true };
    } catch {
        return {
            success: false,
            error: 'Failed to remove item from cart',
        };
    }
};

export const updateCartQuantity = async (
    productId: string,
    quantity: number,
) => {
    try {
        const session = await auth();
        if (!session) {
            return { success: false, error: 'Not authenticated' };
        }

        if (quantity < 1) {
            return { success: false, error: 'Quantity must be at least 1' };
        }

        await prisma.cartItem.update({
            where: {
                userId_productId: {
                    userId: session.user.id,
                    productId: productId,
                },
            },
            data: {
                quantity: quantity,
            },
        });

        return { success: true };
    } catch {
        return {
            success: false,
            error: 'Failed to update quantity',
        };
    }
};

export const getCartItems = async (userId: string) => {
    try {
        const session = await auth();
        if (!session) {
            return { success: false, error: 'Not authenticated', data: [] };
        }

        const cartItems = await prisma.cartItem.findMany({
            where: { userId },
            include: {
                product: true,
            },
        });

        const plainCartItems = cartItems.map((item) => ({
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            product: {
                id: item.product.id,
                name: item.product.name,
                price: item.product.price.toNumber(),
                discount: item.product.discount?.toNumber() ?? null,
                images: item.product.images,
                stock: item.product.stock,
                category: item.product.category,
                rating: item.product.rating?.toNumber() ?? null,
            },
        }));

        return { success: true, data: plainCartItems };
    } catch {
        return {
            success: false,
            error: 'Failed to fetch cart items',
            data: [],
        };
    }
};
