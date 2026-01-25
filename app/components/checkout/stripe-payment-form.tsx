'use client';

import { useState, FormEvent } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { Loader2 } from 'lucide-react';

export const StripePaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setErrorMessage(null);

        try {
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/orders/success?method=cc`,
                },
            });

            if (error) {
                setErrorMessage(error.message || 'Payment failed');
                setIsProcessing(false);
            }
            // If successful, user will be redirected to return_url
        } catch {
            setErrorMessage('An unexpected error occurred');
            setIsProcessing(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Complete Payment</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Stripe Payment Element */}
                <PaymentElement />

                {/* Error Message */}
                {errorMessage && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-600 text-sm">{errorMessage}</p>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isProcessing ? (
                        <span className="flex items-center justify-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing Payment...
                        </span>
                    ) : (
                        'Pay Now'
                    )}
                </button>

                {/* Security Notice */}
                <div className="text-center text-sm text-gray-500">
                    🔒 Your payment is secure and encrypted
                </div>
            </form>
        </div>
    );
};
