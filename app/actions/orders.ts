import { auth } from '@/auth';
import { logger } from '@/lib/logger';
import prisma from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

export const getUserOrders = async () => {
    try {
        const session = await auth();

        if (!session) {
            return { success: false, error: 'Not authenticated' };
        }

        const userId = session.user.id;

        if (!userId) {
            return {
                success: false,
                error: 'You must be logged in to view orders',
            };
        }

        const orders = await prisma.order.findMany({
            where: {
                userId,
            },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return { success: true, data: orders };
    } catch (error) {
        logger.error('Failed to fetch user orders', error);
        return {
            success: false,
            error: 'Failed to load orders, please try again',
        };
    }
};

export const getUserOrderById = unstable_cache(
    async (orderId: string, userId: string) => {
        try {
            if (!userId) {
                return {
                    success: false,
                    error: 'You must be logged in to view order',
                };
            }
            const order = await prisma.order.findFirst({
                where: {
                    id: orderId,
                    userId,
                },
                include: {
                    orderItems: {
                        include: {
                            product: true,
                        },
                    },
                },
            });

            if (!order) {
                return {
                    success: false,
                    error: 'Order not found or you do not have permission to view it',
                };
            }

            return { success: true, data: order };
        } catch (error) {
            console.log(error);
            logger.error(`Failed to fetch order with id: ${orderId}`, error);
            return {
                success: false,
                error: 'Failed to load order, please try again',
            };
        }
    },
    ['user-order-by-id'],
    {
        revalidate: 300, // 5 minutes
        tags: ['orders'],
    },
);
