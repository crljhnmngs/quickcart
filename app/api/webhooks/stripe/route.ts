import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { CheckoutFormData } from '@/lib/validations/checkout';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
        return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        logger.error('Webhook signature verification failed', err);
        return NextResponse.json(
            { error: 'Invalid signature' },
            { status: 400 },
        );
    }

    // Handle successful payment
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        try {
            // Check if order already exists (idempotency)
            const existingOrder = await prisma.order.findUnique({
                where: { stripePaymentIntentId: paymentIntent.id },
            });

            if (existingOrder) {
                logger.info(
                    `Order already exists for payment intent ${paymentIntent.id}, skipping creation`,
                );
                return NextResponse.json({
                    received: true,
                    orderId: existingOrder.id,
                });
            }

            const orderData = JSON.parse(
                paymentIntent.metadata.orderData,
            ) as CheckoutFormData;
            const userId = paymentIntent.metadata.userId;

            const cartItems = await prisma.cartItem.findMany({
                where: { userId },
                include: { product: true },
            });

            if (cartItems.length === 0) {
                logger.warn(
                    `No cart items found for user ${userId} on payment intent ${paymentIntent.id}`,
                );
                return NextResponse.json({ received: true });
            }

            // Create order in database
            const order = await prisma.$transaction(async (tx) => {
                const newOrder = await tx.order.create({
                    data: {
                        userId,
                        ...orderData,
                        total: paymentIntent.amount / 100,
                        paymentMethod: 'credit-card',
                        stripePaymentIntentId: paymentIntent.id, // SAVE PAYMENT INTENT ID
                        orderItems: {
                            create: cartItems.map((item) => {
                                const price = item.product.discount
                                    ? item.product.price.toNumber() *
                                      (1 -
                                          item.product.discount.toNumber() /
                                              100)
                                    : item.product.price.toNumber();

                                return {
                                    productId: item.productId,
                                    quantity: item.quantity,
                                    price: price,
                                };
                            }),
                        },
                    },
                });

                // Update stock
                for (const item of cartItems) {
                    await tx.product.update({
                        where: { id: item.productId },
                        data: { stock: { decrement: item.quantity } },
                    });
                }

                // Clear cart
                await tx.cartItem.deleteMany({ where: { userId } });

                return newOrder;
            });

            logger.info(
                `Order ${order.id} created from payment intent ${paymentIntent.id}`,
            );
            return NextResponse.json({ received: true, orderId: order.id });
        } catch (error) {
            logger.error('Failed to create order from webhook', error);
            return NextResponse.json(
                { error: 'Failed to process webhook' },
                { status: 500 },
            );
        }
    }

    // Handle failed payments
    if (event.type === 'payment_intent.payment_failed') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        logger.warn(`Payment failed for intent ${paymentIntent.id}`);
        //TODO: Notify/Email the user for payment failed
    }

    return NextResponse.json({ received: true });
}
