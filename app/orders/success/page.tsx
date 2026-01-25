'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Loader2 } from 'lucide-react';

const OrderSuccessPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [countdown, setCountdown] = useState(5);

    const method = searchParams.get('method'); // cc | cod

    // References (Stripe uses payment_intent, COD uses ref)
    const stripeRef = searchParams.get('payment_intent');
    const customRef = searchParams.get('ref');
    const ref = method === 'cc' ? stripeRef : customRef;

    // Page title
    const title = useMemo(() => {
        switch (method) {
            case 'cc':
                return 'Payment Successful!';
            case 'cod':
                return 'Order Placed Successfully!';
            default:
                return 'Success!';
        }
    }, [method]);

    // Success message
    const message = useMemo(() => {
        switch (method) {
            case 'cc':
                return 'Your payment was successful. Your order has been received.';
            case 'cod':
                return 'Your order has been received. You will pay upon delivery.';
            default:
                return 'Your request was successful.';
        }
    }, [method]);

    // Reference label
    const refLabel = useMemo(() => {
        switch (method) {
            case 'cc':
                return 'Payment Reference';
            case 'cod':
                return 'Order Reference';
            default:
                return 'Reference';
        }
    }, [method]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push('/orders');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md">
                {/* Success Icon */}
                <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold mb-4">{title}</h1>

                {/* Message */}
                <p className="text-gray-600 mb-2">{message}</p>

                {/* Reference */}
                {ref && (
                    <p className="text-sm text-gray-500 mb-8 break-all">
                        {refLabel}: {ref}
                    </p>
                )}

                {/* Redirect */}
                <div className="flex items-center justify-center gap-2 text-blue-600">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Redirecting to orders in {countdown}s...</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
