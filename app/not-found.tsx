'use client';

import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-purple-50 px-6">
            <div className="text-center max-w-2xl">
                {/* 404 */}
                <div className="mb-8">
                    <h1 className="text-9xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        404
                    </h1>
                    <div className="mt-4">
                        <Search className="w-24 h-24 mx-auto text-gray-300" />
                    </div>
                </div>

                {/* Message */}
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    Page Not Found
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                    {`Oops! The page you're looking for doesn't exist. It might
                    have been moved or deleted`}
                    .
                </p>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all"
                    >
                        <Home className="w-5 h-5" />
                        Go to Homepage
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 border-2 border-gray-300 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all cursor-pointer text-black"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>
                </div>

                {/* Popular links */}
                <div className="mt-12 pt-8 border-t">
                    <p className="text-sm text-gray-600 mb-4">
                        Or try these popular pages:
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/products"
                            className="text-blue-600 hover:underline font-semibold"
                        >
                            Products
                        </Link>
                        <Link
                            href="/cart"
                            className="text-blue-600 hover:underline font-semibold"
                        >
                            Shopping Cart
                        </Link>
                        <Link
                            href="/orders"
                            className="text-blue-600 hover:underline font-semibold"
                        >
                            My Orders
                        </Link>
                        <Link
                            href="/login"
                            className="text-blue-600 hover:underline font-semibold"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
