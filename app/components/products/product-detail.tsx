import {
    Heart,
    Star,
    Truck,
    Shield,
    Package,
    AlertTriangle,
} from 'lucide-react';
import { getProductById } from '@/app/actions/products';
import { getDiscountedPrice } from '@/lib/helpers';
import { ProductDetailsImages } from './product-details-imgs';
import { AddToCartButton } from '../buttons/add-to-cart';

export const ProductDetail = async ({ id }: { id: string }) => {
    const result = await getProductById(id);

    if (!result.data || !result.success) {
        return (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Product Not Found
                </h3>
                <p className="text-gray-600">
                    {result.error || 'Product Not Found'}
                </p>
            </div>
        );
    }
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex gap-12">
                {/* Product Images */}
                <ProductDetailsImages
                    images={result.data?.images || []}
                    name={result.data?.name || 'Product'}
                />

                <div className="flex-1">
                    {/* Product Category */}
                    <div className="mb-4">
                        <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                            {result.data?.category}
                        </span>
                    </div>
                    {/* Product Name */}
                    <h1 className="text-4xl font-bold mb-4 text-black">
                        {result.data?.name}
                    </h1>
                    {/* Product Rating */}
                    <div className="flex items-center gap-6 mb-6">
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${
                                        result.data?.rating &&
                                        i <= Number(result.data?.rating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'fill-gray-200 text-gray-200'
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-gray-700 font-medium">
                            {result.data?.rating?.toString()} out of 5
                        </span>
                        <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
                            ({result.data?.reviewCount} reviews)
                        </span>
                    </div>
                    {/* Product Price */}
                    <div className="flex items-baseline gap-4 mb-6 bg-blue-50 p-6 rounded-xl">
                        {result.data?.discount ? (
                            <>
                                <span className="text-5xl font-bold text-blue-600">
                                    ₱
                                    {getDiscountedPrice(
                                        Number(result.data?.price),
                                        Number(result.data?.discount)
                                    ).toFixed(2)}
                                </span>
                                <span className="text-2xl text-gray-400 line-through">
                                    ₱{result.data?.price.toString()}
                                </span>
                            </>
                        ) : (
                            <span className="text-5xl font-bold text-blue-600">
                                ₱{result.data?.price.toString()}
                            </span>
                        )}
                        {result.data?.discount && (
                            <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold ml-auto">
                                Save {`-${result.data?.discount}%`}
                            </span>
                        )}
                    </div>
                    {/* Product Description */}
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed border-l-4 border-blue-600 pl-4">
                        {result.data?.description}
                    </p>
                    {/* Product Quantity */}
                    <div className="mb-8">
                        <h3 className="font-bold text-lg mb-4">Quantity</h3>
                        <div className="flex items-center gap-4">
                            <button className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:bg-gray-100 font-bold text-lg text-black">
                                -
                            </button>
                            <span className="w-16 text-center font-bold text-xl text-black">
                                1
                            </span>
                            <button className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:bg-gray-100 font-bold text-lg text-black">
                                +
                            </button>
                        </div>
                    </div>
                    {/* Add to cart */}
                    <div className="flex gap-4 mb-10">
                        <AddToCartButton
                            productId={result.data?.id}
                            className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
                        />
                        <button className="px-6 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors">
                            <Heart className="w-7 h-7" />
                        </button>
                    </div>
                    {/* Footer */}
                    <div className="space-y-4 border-t-2 pt-8">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Truck className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-bold">Free Shipping</p>
                                <p className="text-sm text-gray-600">
                                    Delivery in 3-5 business days
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Package className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="font-bold">Easy Returns</p>
                                <p className="text-sm text-gray-600">
                                    30-day return policy
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <Shield className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="font-bold">2 Year Warranty</p>
                                <p className="text-sm text-gray-600">
                                    Extended warranty available
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
