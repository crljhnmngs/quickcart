'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { logger } from '@/lib/logger';

const Error = ({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) => {
    useEffect(() => {
        logger.error('Application error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-orange-50 px-6">
            <div className="text-center max-w-2xl">
                {/* Error icon */}
                <div className="mb-8">
                    <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-12 h-12 text-red-600" />
                    </div>
                </div>

                {/* Error message */}
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    Something Went Wrong
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                    {`We're sorry for the inconvenience. An unexpected error
                    occurred.`}
                </p>

                {/* Error details (only dev) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mb-8 p-4 bg-white rounded-lg border-2 border-red-200 text-left">
                        <p className="font-mono text-sm text-red-600 break-all">
                            {error.message}
                        </p>
                    </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all cursor-pointer"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 border-2 border-gray-300 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all text-black"
                    >
                        <Home className="w-5 h-5" />
                        Go to Homepage
                    </Link>
                </div>

                {/* Support message */}
                <div className="mt-12 pt-8 border-t">
                    <p className="text-sm text-gray-600">
                        If this problem persists, please{' '}
                        <a
                            href="/contact"
                            className="text-blue-600 hover:underline font-semibold"
                        >
                            contact support
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Error;
