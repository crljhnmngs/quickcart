'use client';

import { useEffect, useState } from 'react';
import { getProductsByIds } from '@/app/actions/products';
import { Star, Package, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import toast from 'react-hot-toast';
import { getDiscountedPrice } from '@/lib/helpers';
import { ProductImage } from '../products/product-image';
import { CartLoading } from './cart-loading';

type Product = {
    id: string;
    name: string;
    price: number;
    discount: number | null;
    images: string[];
    stock: number;
    category: string | null;
    rating: number | null;
};

export const CartProductListClient = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const items = useCartStore((state) => state.items);
    const hydrated = useCartStore((state) => state.hydrated);
    const hydrate = useCartStore((state) => state.hydrate);
    const addItem = useCartStore((state) => state.addItem);
    const setItems = useCartStore((state) => state.setItems);

    // Hydrate cart from persisted state
    useEffect(() => {
        hydrate();
    }, [hydrate]);

    useEffect(() => {
        if (!hydrated) return;

        if (items.length === 0) {
            setProducts([]);
            setLoading(false);
            return;
        }

        const fetchProducts = async () => {
            setLoading(true);
            const ids = items.map((i) => i.productId);

            try {
                const result = await getProductsByIds(ids);

                if (result.success && result.data) {
                    setProducts(result.data);
                } else {
                    console.error(result.error);
                    setProducts([]);
                }
            } catch (err) {
                console.error('Failed to fetch products', err);
                toast.error('Failed to fetch products', {
                    position: 'top-right',
                });
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [items, hydrated]);

    if (!hydrated || loading) {
        return <CartLoading />;
    }

    // Merge cart items with fetched product data
    const cartWithInfo = items.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
    }));

    return (
        <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
                {/* Empty cart */}
                {cartWithInfo.length === 0 ? (
                    <div className="text-center py-12">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">
                            Your cart is empty.
                        </p>
                    </div>
                ) : (
                    // Cart items
                    cartWithInfo.map((item) => {
                        const product = item.product;
                        const originalPrice = product?.price || 0;
                        const discount = product?.discount || 0;

                        // Calculate prices
                        const currentPrice =
                            discount > 0
                                ? getDiscountedPrice(originalPrice, discount)
                                : originalPrice;

                        const itemTotal = currentPrice * item.quantity;
                        const originalTotal = originalPrice * item.quantity;

                        // Use first image if available
                        const image = product?.images?.[0] || null;

                        return (
                            <div
                                key={item.productId}
                                className="flex gap-6 border-b pb-6 mb-6 last:border-b-0 last:mb-0 last:pb-0"
                            >
                                {/* Product image */}
                                <div className="relative w-32 h-32 bg-linear-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                                    <ProductImage
                                        src={image}
                                        alt={product?.name || 'Product'}
                                        iconClassName="w-16 h-16 text-gray-400"
                                        sizes="128px"
                                    />
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between mb-2">
                                        <div>
                                            {/* Product info */}
                                            <h3 className="font-bold text-xl mb-1 text-black">
                                                {product?.name || 'Loading...'}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-2">
                                                Category:{' '}
                                                {product?.category || 'N/A'}
                                            </p>

                                            {/* Rating */}
                                            <div className="flex items-center gap-1 mb-3">
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${
                                                            product?.rating &&
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

                                    <div className="flex items-center gap-4 mt-4">
                                        {/* Quantity controls */}
                                        <div className="flex items-center gap-4 mt-4">
                                            <div className="flex items-center gap-2 border-2 border-gray-300 rounded-lg">
                                                {/* Decrease */}
                                                <button
                                                    className="px-4 py-2 font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 text-black"
                                                    disabled={
                                                        item.quantity <= 1
                                                    }
                                                    onClick={() =>
                                                        addItem(
                                                            item.productId,
                                                            -1,
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>

                                                {/* Quantity */}
                                                <span className="px-4 font-bold text-black">
                                                    {item.quantity}
                                                </span>

                                                {/* Increase */}
                                                <button
                                                    className="px-4 py-2 font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 text-black"
                                                    disabled={
                                                        item.quantity >=
                                                        (product?.stock ?? 0)
                                                    }
                                                    onClick={() =>
                                                        addItem(
                                                            item.productId,
                                                            1,
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Stock info */}
                                            <span className="text-sm text-gray-500">
                                                {product?.stock} in stock
                                            </span>
                                        </div>

                                        {/* Remove item */}
                                        <button
                                            className="text-red-600 hover:text-red-700 flex items-center gap-2 font-semibold hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
                                            onClick={() =>
                                                setItems(
                                                    items.filter(
                                                        (i) =>
                                                            i.productId !==
                                                            item.productId,
                                                    ),
                                                )
                                            }
                                        >
                                            <Trash2 className="w-5 h-5" />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
