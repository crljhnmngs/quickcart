import { Package } from 'lucide-react';
import { getDiscountedPrice } from '@/lib/helpers';
import { ProductImage } from '../products/product-image';
import { getCartItemsByUserId } from '@/app/actions/cart';

type CheckoutSummaryProps = {
    userId: string;
};

export const CheckoutSummary = async ({ userId }: CheckoutSummaryProps) => {
    const result = await getCartItemsByUserId(userId);

    if (!result.success) {
        throw new Error(result.error);
    }

    const plainCartItems = result.data;

    // Calculate totals
    const subtotal = plainCartItems.reduce((total, item) => {
        const product = item.product;
        const discount = product.discount || 0;
        const currentPrice =
            discount > 0
                ? getDiscountedPrice(product.price, discount)
                : product.price;
        return total + currentPrice * item.quantity;
    }, 0);

    const shipping = 0;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    return (
        <div className="w-96 shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
                {/* Title */}
                <h3 className="font-bold text-2xl mb-6">Order Summary</h3>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                    {plainCartItems.length === 0 ? (
                        <div className="text-center py-8">
                            <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-500 text-sm">
                                No items in cart
                            </p>
                        </div>
                    ) : (
                        plainCartItems.map((item) => {
                            const product = item.product;
                            const discount = product.discount || 0;
                            const currentPrice =
                                discount > 0
                                    ? getDiscountedPrice(
                                          product.price,
                                          discount,
                                      )
                                    : product.price;
                            const itemTotal = currentPrice * item.quantity;
                            const image = product.images?.[0] || null;

                            return (
                                <div
                                    key={item.id}
                                    className="flex gap-3 pb-4 border-b"
                                >
                                    <div className="relative w-20 h-20 bg-linear-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                                        <ProductImage
                                            src={image}
                                            alt={product.name}
                                            iconClassName="w-8 h-8 text-gray-400"
                                            sizes="80px"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-sm line-clamp-2">
                                            {product.name}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>
                                    <span className="font-bold">
                                        ₱{itemTotal.toFixed(2)}
                                    </span>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Order totals */}
                <div className="border-t-2 pt-4 space-y-2 mb-6">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-bold">
                            ₱{subtotal.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-bold text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Tax (8%)</span>
                        <span className="font-bold">₱{tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t-2 pt-3 flex justify-between items-center">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-3xl text-blue-600">
                            ₱{total.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
