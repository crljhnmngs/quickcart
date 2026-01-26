import { Package, MapPin, CreditCard, Calendar } from 'lucide-react';
import { OrderStatus } from '@/prisma/generated/enums';
import { OrdersError } from './orders-error';
import { getUserOrderById } from '@/app/actions/orders';
import { formatDate } from '@/lib/helpers';
import { ProductImage } from '../products/product-image';

type OrderDetailProps = {
    orderId: string;
    userId: string;
};

export const OrderDetail = async ({ orderId, userId }: OrderDetailProps) => {
    const result = await getUserOrderById(orderId, userId);

    // Helper function to get status color
    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case 'DELIVERED':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'SHIPPED':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'PROCESSING':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'PENDING':
                return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'CANCELLED':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    // Helper function to format date

    if (!result.success || !result.data) {
        return (
            <OrdersError
                header="Failed to Load your order details"
                message="Order not found or could not be loaded."
            />
        );
    }

    const order = result.data;
    const totalItems = order.orderItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
    );

    return (
        <div className="space-y-6">
            {/* Order header card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Order #{order.id.slice(0, 12).toUpperCase()}
                        </h2>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>Placed on {formatDate(order.createdAt)}</span>
                        </div>
                    </div>
                    <span
                        className={`px-6 py-3 rounded-full font-bold text-lg border-2 ${getStatusColor(
                            order.status,
                        )}`}
                    >
                        {order.status}
                    </span>
                </div>

                {/* Order summary grid */}
                <div className="grid md:grid-cols-3 gap-6 p-6 bg-linear-to-br from-blue-50 to-purple-50 rounded-xl">
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">
                            Total Amount
                        </p>
                        <p className="font-bold text-3xl text-blue-600">
                            ₱{Number(order.total).toLocaleString()}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">
                            Total Items
                        </p>
                        <p className="font-bold text-3xl text-gray-900">
                            {totalItems}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">
                            Payment Method
                        </p>
                        <p className="font-bold text-xl text-gray-900 capitalize">
                            {order.paymentMethod}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Order items */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Package className="w-6 h-6 text-blue-600" />
                            <h3 className="text-xl font-bold text-gray-900">
                                Order Items
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {order.orderItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    {/* Product image */}
                                    <div className="relative w-20 h-20 bg-linear-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                                        <ProductImage
                                            src={item.product.images[0] || null}
                                            alt={item.product.name}
                                            iconClassName="w-15 h-15 text-gray-400 flex item-center justify-center"
                                            sizes="80px"
                                        />
                                    </div>

                                    {/* Product details */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-900 mb-1 truncate">
                                            {item.product.name}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Quantity: {item.quantity}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Price: ₱
                                            {Number(
                                                item.price,
                                            ).toLocaleString()}
                                        </p>
                                    </div>

                                    {/* Item total */}
                                    <div className="text-right">
                                        <p className="font-bold text-lg text-blue-600">
                                            ₱
                                            {(
                                                Number(item.price) *
                                                item.quantity
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    {/* Shipping address */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <MapPin className="w-6 h-6 text-blue-600" />
                            <h3 className="text-xl font-bold text-gray-900">
                                Shipping Address
                            </h3>
                        </div>
                        <div className="space-y-2 text-gray-700">
                            <p className="font-semibold">
                                {order.firstName} {order.lastName}
                            </p>
                            <p>{order.address}</p>
                            <p>
                                {order.city}, {order.postalCode}
                            </p>
                            {order.country && <p>{order.country}</p>}
                            {order.phone && (
                                <p className="mt-3">{order.phone}</p>
                            )}
                            <p className="text-sm text-gray-600 mt-3">
                                {order.email}
                            </p>
                        </div>
                    </div>

                    {/* Payment info */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <CreditCard className="w-6 h-6 text-blue-600" />
                            <h3 className="text-xl font-bold text-gray-900">
                                Payment Information
                            </h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Method:</span>
                                <span className="font-semibold capitalize text-gray-900">
                                    {order.paymentMethod}
                                </span>
                            </div>
                            {order.stripePaymentIntentId && (
                                <div className="pt-3 border-t">
                                    <p className="text-xs text-gray-500 break-all">
                                        Payment ID:{' '}
                                        {order.stripePaymentIntentId}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order actions */}
                    <div className="space-y-3">
                        {(order.status === 'PROCESSING' ||
                            order.status === 'SHIPPED') && (
                            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                                Track Order
                            </button>
                        )}
                        {order.status === 'DELIVERED' && (
                            <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                                Buy Again
                            </button>
                        )}
                        {order.status === 'PENDING' && (
                            <button className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors">
                                Cancel Order
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
