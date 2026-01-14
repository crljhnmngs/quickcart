import { Navbar } from '@/app/components/layout/navbar';
import { CartProductListClient } from '@/app/components/cart/cart-product-list-client';

const CartPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-6">
            {/* Top navigation */}
            <Navbar showSearch={false} />

            {/* Page title */}
            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

            <div className="flex gap-8">
                {/* Cart items list */}
                <CartProductListClient />

                {/* Order summary sidebar */}
                <div className="w-96 shrink-0">
                    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
                        <h3 className="font-bold text-2xl mb-6">
                            Order Summary
                        </h3>

                        {/* Price breakdown */}
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-700">
                                <span>Subtotal (3 items)</span>
                                <span className="font-bold">$299.97</span>
                            </div>

                            <div className="flex justify-between text-gray-700">
                                <span>Shipping</span>
                                <span className="font-bold text-green-600">
                                    FREE
                                </span>
                            </div>

                            <div className="flex justify-between text-gray-700">
                                <span>Tax</span>
                                <span className="font-bold">$24.00</span>
                            </div>

                            {/* Total */}
                            <div className="border-t-2 pt-4 flex justify-between items-center">
                                <span className="font-bold text-xl">Total</span>
                                <span className="font-bold text-3xl text-blue-600">
                                    $323.97
                                </span>
                            </div>
                        </div>

                        {/* Checkout button */}
                        <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 mb-3 shadow-lg">
                            Proceed to Checkout
                        </button>

                        {/* Continue shopping */}
                        <button className="w-full border-2 border-gray-300 py-3 rounded-xl hover:bg-gray-50 font-semibold text-black">
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
