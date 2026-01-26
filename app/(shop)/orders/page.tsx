import { Suspense } from 'react';
import { Navbar } from '../../components/layout/navbar';
import { OrdersList } from '../../components/orders/orders-list';
import { OrdersSkeleton } from '../../components/ui/skeletons';

const OrdersPage = async () => {
    return (
        <div className="max-w-7xl mx-auto px-6">
            {/* Navbar */}
            <Navbar showSearch={false} />
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Order History</h1>
                <p className="text-gray-600 text-lg">
                    Track and manage your orders
                </p>
                {/* Orders List */}
                <Suspense fallback={<OrdersSkeleton />}>
                    <OrdersList />
                </Suspense>
            </div>
        </div>
    );
};

export default OrdersPage;
