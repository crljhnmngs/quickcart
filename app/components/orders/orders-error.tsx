'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

type OrdersErrorProps = {
    message?: string;
    header?: string;
};

export const OrdersError = ({
    message,
    header = 'Failed to Load Orders',
}: OrdersErrorProps) => {
    return (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center mt-2">
            {/* Error icon */}
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>

            {/* Error message */}
            <h3 className="text-xl font-bold text-gray-800 mb-2">{header}</h3>
            <p className="text-gray-600 mb-6">
                {message || "We couldn't load your orders. Please try again."}
            </p>

            {/* Retry button */}
            <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
                <RefreshCw className="w-5 h-5" />
                Retry
            </button>
        </div>
    );
};
