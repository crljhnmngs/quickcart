import { getUserOrders } from '@/app/actions/orders';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { OrderStatus } from '@/prisma/generated/enums';
import { OrdersError } from './orders-error';
import { formatDate } from '@/lib/helpers';

export const OrdersList = async () => {
    const result = await getUserOrders();

    // Helper function to get status color
    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case 'DELIVERED':
                return 'bg-green-100 text-green-700';
            case 'SHIPPED':
                return 'bg-blue-100 text-blue-700';
            case 'PROCESSING':
                return 'bg-yellow-100 text-yellow-700';
            case 'PENDING':
                return 'bg-orange-100 text-orange-700';
            case 'CANCELLED':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <>
            {/* Error state */}
            {!result.success ? (
                <OrdersError />
            ) : !result.data || result.data.length === 0 ? (
                /* Empty state */
                <div className="bg-gray-50 border rounded-xl p-10 text-center">
                    <ShoppingBag className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        No orders yet
                    </h3>
                    <p className="text-gray-500 mb-6">
                        {`You haven't placed any orders. Start shopping to see
                        your order history here. `}
                    </p>
                    <Link
                        href="/products"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                /* Orders list */
                <div className="space-y-4">
                    {result.data.map((order) => {
                        const totalItems = order.orderItems.reduce(
                            (sum, item) => sum + item.quantity,
                            0,
                        );

                        return (
                            <div
                                key={order.id}
                                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                            >
                                {/* Order header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="font-bold text-xl mb-1 text-black">
                                            #
                                            {order.id
                                                .slice(0, 12)
                                                .toUpperCase()}
                                        </h3>
                                        <p className="text-gray-600">
                                            Placed on{' '}
                                            {formatDate(order.createdAt)}
                                        </p>
                                    </div>
                                    <span
                                        className={`px-6 py-2 rounded-full font-bold text-sm ${getStatusColor(
                                            order.status,
                                        )}`}
                                    >
                                        {order.status}
                                    </span>
                                </div>

                                {/* Order summary */}
                                <div className="grid md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">
                                            Total Amount
                                        </p>
                                        <p className="font-bold text-2xl text-blue-600">
                                            ₱{Number(order.total)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">
                                            Items
                                        </p>
                                        <p className="font-bold text-xl text-black">
                                            {totalItems}{' '}
                                            {totalItems === 1
                                                ? 'product'
                                                : 'products'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">
                                            Payment
                                        </p>
                                        <p className="font-bold text-xl text-black capitalize">
                                            {order.paymentMethod}
                                        </p>
                                    </div>
                                </div>

                                {/* Order actions */}
                                <div className="flex gap-3">
                                    <Link
                                        href={`/orders/${order.id}`}
                                        className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-center"
                                    >
                                        View Details
                                    </Link>
                                    {(order.status === 'PROCESSING' ||
                                        order.status === 'SHIPPED') && (
                                        <button className="px-6 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-semibold transition-colors text-black">
                                            Track Order
                                        </button>
                                    )}
                                    {order.status === 'DELIVERED' && (
                                        <button className="px-6 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 font-semibold transition-colors">
                                            Buy Again
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};
