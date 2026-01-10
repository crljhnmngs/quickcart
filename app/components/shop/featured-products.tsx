import { Package, Star } from 'lucide-react';
import { getFeaturedProducts } from '@/app/actions/products';
import Link from 'next/link';
import { ProductImage } from './product-image';

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
                    <div className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition">
                        <div className="bg-gray-100 h-56 flex items-center justify-center relative">
                            <ProductImage
                                src={product.image}
                                alt={product.name}
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold mb-2 text-black">
                                {product.name}
                            </h3>
                            <div className="flex items-center gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>
                            <p className="text-2xl font-bold text-blue-600">
                                ${product.price.toString()}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};
