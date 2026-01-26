import { Navbar } from '@/app/components/layout/navbar';
import { OrderDetail } from '@/app/components/orders/order-detail';
import { OrderDetailSkeleton } from '@/app/components/ui/skeletons';
import { auth } from '@/auth';
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type OrderDetailPageProps = {
    params: {
        id: string;
    };
};

const OrderDetailPage = async ({ params }: OrderDetailPageProps) => {
    const { id } = await params;
    const session = await auth();

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Navbar */}
            <Navbar showSearch={false} />

            {/* Page Header */}
            <div className="mb-8 mt-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">
                            Order Details
                        </h1>
                        <p className="text-gray-600 text-lg">
                            View your order information
                        </p>
                    </div>
                </div>
            </div>

            {/* Back button */}
            <Link
                href="/orders"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Orders
            </Link>

            {/* Order Detail */}
            <Suspense fallback={<OrderDetailSkeleton />}>
                <OrderDetail orderId={id} userId={session?.user.id ?? ''} />
            </Suspense>
        </div>
    );
};

export default OrderDetailPage;
