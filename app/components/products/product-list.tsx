import { getProducts } from '@/app/actions/products';
import { Heart, Star, PackageOpen } from 'lucide-react';
import { ProductImage } from './product-image';
import Link from 'next/link';

export const ProductList = async () => {
    const result = await getProducts();

    if (!result.success) {
        throw new Error(result.error);
    }

    if (!result.data || result.data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4">
                <PackageOpen className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No products found
                </h3>
                <p className="text-gray-500 text-center max-w-md">
                    There are currently no products available. Please check back
                    later.
                </p>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-3 gap-6">
            {result.data?.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                    <div
                        key={product.id}
                        className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group"
                    >
                        <div className="bg-linear-to-br from-gray-100 to-gray-200 h-56 flex items-center justify-center relative">
                            <ProductImage
                                src={product.image}
                                alt={product.name}
                            />
                            <button className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                            </button>
                        </div>
                        <div className="p-4">
                            <span className="text-xs font-semibold text-purple-600 uppercase">
                                {product.category}
                            </span>
                            <h3 className="font-bold text-lg mb-2 truncate text-gray-700">
                                {product.name}
                            </h3>
                            <div className="flex items-center gap-1 mb-3">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star
                                        key={s}
                                        className={`w-4 h-4 ${
                                            s <= 4
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300'
                                        }`}
                                    />
                                ))}
                                <span className="text-sm text-gray-600 ml-1 font-medium">
                                    (124)
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-2xl font-bold text-blue-600">
                                    ${product.price.toString()}
                                </span>
                            </div>
                            <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};
