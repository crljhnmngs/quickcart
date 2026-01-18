import { Star, Package } from 'lucide-react';
import { getDiscountedPrice } from '@/lib/helpers';
import { ProductImage } from '../products/product-image';
import { CartItemActions } from './cart-item-actions';
import { getCartItemsByUserId } from '@/app/actions/cart';

type CartProductListServerProps = {
    userId: string;
};

export const CartProductListServer = async ({
    userId,
}: CartProductListServerProps) => {
    const result = await getCartItemsByUserId(userId);

    if (!result.success) {
        throw new Error(result.error);
    }

    const plainCartItems = result.data;

    return (
        <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
                {/* Empty cart state */}
                {plainCartItems.length === 0 ? (
                    <div className="text-center py-12">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">
                            Your cart is empty.
                        </p>
                    </div>
                ) : (
                    // Cart items
                    plainCartItems.map((item) => {
                        const product = item.product;
                        const originalPrice = product.price;
                        const discount = product.discount || 0;

                        // Calculate prices
                        const currentPrice =
                            discount > 0
                                ? getDiscountedPrice(originalPrice, discount)
                                : originalPrice;

                        const itemTotal = currentPrice * item.quantity;
                        const originalTotal = originalPrice * item.quantity;

                        // Use first image if available
                        const image = product.images?.[0] || null;

                        return (
                            <div
                                key={item.id}
                                className="flex gap-6 border-b pb-6 mb-6 last:border-b-0 last:mb-0 last:pb-0"
                            >
                                {/* Product image */}
                                <div className="relative w-32 h-32 bg-linear-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                                    <ProductImage
                                        src={image}
                                        alt={product.name}
                                        iconClassName="w-16 h-16 text-gray-400"
                                        sizes="128px"
                                    />
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between mb-2">
                                        <div>
                                            {/* Product info */}
                                            <h3 className="font-bold text-xl mb-1 text-black">
                                                {product.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-2">
                                                Category:{' '}
                                                {product.category || 'N/A'}
                                            </p>

                                            {/* Rating */}
                                            <div className="flex items-center gap-1 mb-3">
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${
                                                            product.rating &&
                                                            i <=
                                                                Number(
                                                                    product.rating,
                                                                )
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'fill-gray-200 text-gray-200'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Price summary */}
                                        <div className="text-right">
                                            <p className="text-3xl font-bold text-blue-600">
                                                ₱{itemTotal.toFixed(2)}
                                            </p>
                                            {discount > 0 && (
                                                <>
                                                    <p className="text-sm text-gray-400 line-through">
                                                        ₱
                                                        {originalTotal.toFixed(
                                                            2,
                                                        )}
                                                    </p>
                                                    <p className="text-sm text-green-600 font-semibold">
                                                        Save {discount}%
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Quantity controls and remove button */}
                                    <CartItemActions
                                        productId={product.id}
                                        quantity={item.quantity}
                                        stock={product.stock}
                                    />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
