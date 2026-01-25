import { Navbar } from '@/app/components/layout/navbar';
import { CheckoutForm } from '@/app/components/checkout/checkout-form';
import { CheckoutSummary } from '@/app/components/checkout/checkout-summary';
import { auth } from '@/auth';
import { getCartItemsByUserId } from '@/app/actions/cart';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { CheckoutSkeleton } from '@/app/components/ui/skeletons';
import { ErrorBoundary } from '../../components/ui/error-boundary';
import { CheckoutSummaryError } from '@/app/components/checkout/checkout-summary-error';
import { createOrder } from '@/app/actions/checkout';
import { CheckoutClientWrapper } from '../../components/checkout/checkout-client-wrapper';
import { CheckoutFormData } from '@/lib/validations/checkout';
import { OrderResult } from '@/types/global';

const CheckoutPage = async () => {
    const session = await auth();

    const cartResult = await getCartItemsByUserId(session?.user.id ?? '');

    if (!cartResult.success || cartResult.data.length === 0) {
        redirect('/products');
    }

    const handleCheckout = async (
        data: CheckoutFormData,
    ): Promise<OrderResult> => {
        'use server';
        return (await createOrder(data)) as OrderResult;
    };

    return (
        <div className="max-w-7xl mx-auto px-6">
            {/* Navbar */}
            <Navbar showSearch={false} />

            {/* Page title */}
            <h1 className="text-4xl font-bold mb-8 text-black">Checkout</h1>

            {/* Checkout Wrapper */}
            <CheckoutClientWrapper onSubmit={handleCheckout}>
                <div className="flex gap-8 text-black">
                    <ErrorBoundary fallback={<CheckoutSummaryError />}>
                        <Suspense fallback={<CheckoutSkeleton />}>
                            <>
                                {/* Checkout Form */}
                                <CheckoutForm />
                                {/* Checkout Summary */}
                                <CheckoutSummary
                                    userId={session?.user.id ?? ''}
                                />
                            </>
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </CheckoutClientWrapper>
        </div>
    );
};

export default CheckoutPage;
