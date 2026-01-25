'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { CheckoutFormData } from '@/lib/validations/checkout';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createOrder = async (data: CheckoutFormData) => {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, error: 'Not authenticated' };
        }

        const cartItems = await prisma.cartItem.findMany({
            where: { userId: session.user.id },
            include: {
                product: true,
            },
        });

        if (cartItems.length === 0) {
            return { success: false, error: 'Cart is empty' };
        }

        // Validate stock
        for (const item of cartItems) {
            if (item.product.stock < item.quantity) {
                return {
                    success: false,
                    error: `Insufficient stock for ${item.product.name}`,
                };
            }
        }

        const total = cartItems.reduce((sum, item) => {
            const price = item.product.discount
                ? item.product.price.toNumber() *
                  (1 - item.product.discount.toNumber() / 100)
                : item.product.price.toNumber();
            return sum + price * item.quantity;
        }, 0);

        // Add tax (8%)
        const totalWithTax = total * 1.08;

        // FOR CREDIT CARD: Create Stripe Payment Intent
        if (data.paymentMethod === 'credit-card') {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(totalWithTax * 100), // Convert to cents
                currency: 'php',
                metadata: {
                    userId: session.user.id,
                    customerEmail: data.email,
                    orderData: JSON.stringify({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        address: data.address,
                        city: data.city,
                        postalCode: data.postalCode,
                        phone: data.phone,
                    }),
                    cartItemsSnapshot: JSON.stringify(
                        cartItems.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.product.discount
                                ? item.product.price.toNumber() *
                                  (1 - item.product.discount.toNumber() / 100)
                                : item.product.price.toNumber(),
                        })),
                    ),
                },
            });

            // Return client secret for Stripe payment
            return {
                success: true,
                clientSecret: paymentIntent.client_secret,
                requiresPayment: true,
            };
        }

        // FOR CASH ON DELIVERY: Create order immediately
        const order = await prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    userId: session.user.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    address: data.address,
                    city: data.city,
                    postalCode: data.postalCode,
                    phone: data.phone,
                    total: totalWithTax,
                    paymentMethod: data.paymentMethod,
                    orderItems: {
                        create: cartItems.map((item) => {
                            const price = item.product.discount
                                ? item.product.price.toNumber() *
                                  (1 - item.product.discount.toNumber() / 100)
                                : item.product.price.toNumber();

                            return {
                                productId: item.productId,
                                quantity: item.quantity,
                                price: price,
                            };
                        }),
                    },
                },
                include: {
                    orderItems: true,
                },
            });

            // Update product stock
            for (const item of cartItems) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                });
            }

            // Clear the cart
            await tx.cartItem.deleteMany({
                where: { userId: session.user.id },
            });

            return newOrder;
        });

        return {
            success: true,
            orderId: order.id,
            message: 'Order created successfully',
        };
    } catch (error) {
        logger.error('Failed to create order', error);
        return {
            success: false,
            error: 'Failed to create order. Please try again.',
        };
    }
};
