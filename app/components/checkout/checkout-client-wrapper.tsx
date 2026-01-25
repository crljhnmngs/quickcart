'use client';

import { useState, createContext, useContext } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutFormData } from '@/lib/validations/checkout';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { StripePaymentForm } from './stripe-payment-form';
import { OrderResult } from '@/types/global';

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

type CheckoutContextType = {
    handleCheckout: (data: CheckoutFormData) => Promise<OrderResult>;
};

const CheckoutContext = createContext<CheckoutContextType | null>(null);

export const useCheckout = () => {
    const context = useContext(CheckoutContext);
    if (!context) {
        throw new Error(
            'useCheckout must be used within CheckoutClientWrapper',
        );
    }
    return context;
};

type CheckoutClientWrapperProps = {
    children: React.ReactNode;
    onSubmit: (data: CheckoutFormData) => Promise<OrderResult>;
};

export const CheckoutClientWrapper = ({
    children,
    onSubmit,
}: CheckoutClientWrapperProps) => {
    const router = useRouter();
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    const handleCheckout = async (
        data: CheckoutFormData,
    ): Promise<OrderResult> => {
        const result = await onSubmit(data);

        if (!result.success) {
            toast.error(result.error || 'Failed to create order', {
                position: 'top-right',
            });
            return result;
        }

        // Check if payment is required (credit card)
        if (
            'requiresPayment' in result &&
            result.requiresPayment &&
            result.clientSecret
        ) {
            setClientSecret(result.clientSecret);
            return result;
        }

        // COD - redirect sucess page with orderId
        if ('orderId' in result && result.orderId) {
            router.push(`/orders/success?method=cod&ref=${result.orderId}`);
        }

        return result;
    };

    // Show Stripe payment form if clientSecret exists
    if (clientSecret) {
        return (
            <div className="flex gap-8 text-black">
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <StripePaymentForm />
                </Elements>
            </div>
        );
    }

    return (
        <CheckoutContext.Provider value={{ handleCheckout }}>
            {children}
        </CheckoutContext.Provider>
    );
};
