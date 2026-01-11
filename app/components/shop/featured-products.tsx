import { Package, Star, Heart } from 'lucide-react';
import { getFeaturedProducts } from '@/app/actions/products';
import Link from 'next/link';
import { ProductImage } from '../products/product-image';
import { getDiscountedPrice } from '@/lib/helpers';

export const FeaturedProducts = async () => {
    const result = await getFeaturedProducts();

    if (!result.success) {
        throw new Error(result.error);
    }

    if (!result.data || result.data.length === 0) {
        return (
            <div className="bg-gray-50 border rounded-xl p-10 text-center">
                <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800">
                    No featured products yet
                </h3>
                <p className="text-gray-500">Please check back later.</p>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-4 gap-6">
            {result.data?.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
                        <div className="bg-linear-to-br from-gray-100 to-gray-200 h-56 flex items-center justify-center relative">
                            <ProductImage
                                src={product.images[0]}
                                alt={product.name}
                            />
                            <button className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                <Heart className="w-5 h-5 text-red-500" />
                            </button>
                            {product.discount && (
                                <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                    {`-${product.discount}%`}
                                </span>
                            )}
                        </div>
                        <div className="p-4">
                            <span className="text-xs font-semibold text-blue-600 uppercase">
                                {product.category}
                            </span>
                            <h3 className="font-bold text-lg mb-2 truncate text-black">
                                {product.name}
                            </h3>
                            <div className="flex items-center gap-1 mb-3">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                            product.rating &&
                                            i <= Number(product.rating)
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'fill-gray-200 text-gray-200'
                                        }`}
                                    />
                                ))}
                                <span className="text-sm text-gray-600 ml-1">
                                    {product.reviewCount}
                                </span>
                            </div>

                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    {product.discount ? (
                                        <>
                                            <span className="text-2xl font-bold text-blue-600">
                                                ₱
                                                {getDiscountedPrice(
                                                    Number(product.price),
                                                    Number(product.discount)
                                                ).toFixed(2)}
                                            </span>
                                            <span className="text-sm text-gray-400 line-through ml-2">
                                                ₱{product.price.toString()}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-2xl font-bold text-blue-600">
                                            ₱{product.price.toString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};
