'use client';

import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const CheckoutSummaryError = () => {
    return (
        <div className="flex-1">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center max-w-2xl mx-auto">
                {/* Error icon */}
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>

                {/* Error message */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Unable to Load Checkout
                </h3>
                <p className="text-gray-600 mb-6">
                    {`We couldn't load your order summary. Please try again or return to your cart.`}
                </p>

                {/* Action buttons */}
                <div className="flex gap-3 justify-center flex-wrap">
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Retry
                    </button>
                    <Link
                        href="/cart"
                        className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Cart
                    </Link>
                </div>
            </div>
        </div>
    );
};
