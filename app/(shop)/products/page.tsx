import { Suspense } from 'react';
import { Star, Filter } from 'lucide-react';
import { Navbar } from '../../components/layout/navbar';
import { ProductList } from '@/app/components/products/product-list';
import { ErrorBoundary } from '../../components/ui/error-boundary';
import { ProductsError } from '../../components/shop/products-error';
import { AllProductsSkeleton } from '../../components/ui/skeletons';

const Products = () => (
    <main className="max-w-7xl mx-auto px-6 pb-5 bg-white">
        {/* Top navigation */}
        <Navbar />
        <div className="flex gap-8">
            {/* Sidebar Filters */}
            <div className="w-72 shrink-0">
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-32">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-xl text-black">
                            Filters
                        </h3>
                        <Filter className="w-5 h-5 text-gray-600" />
                    </div>
                    {/* Category Filter */}
                    <div className="mb-6">
                        <h4 className="font-semibold mb-3 text-gray-700">
                            Category
                        </h4>
                        <div className="space-y-2">
                            {[
                                'All Products',
                                'Electronics',
                                'Clothing',
                                'Books',
                                'Home & Garden',
                                'Sports',
                            ].map((cat) => (
                                <label
                                    key={cat}
                                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors text-gray-700"
                                >
                                    <input
                                        type="checkbox"
                                        className="rounded text-blue-600"
                                    />
                                    <span className="text-sm font-medium">
                                        {cat}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="mb-6 border-t pt-6">
                        <h4 className="font-semibold mb-3 text-gray-700">
                            Price Range
                        </h4>
                        <input
                            type="range"
                            className="w-full accent-blue-600"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-3 font-semibold">
                            <span>$0</span>
                            <span>$1000+</span>
                        </div>
                    </div>

                    {/* Rating Filter */}
                    <div className="mb-6 border-t pt-6">
                        <h4 className="font-semibold mb-3 text-gray-700">
                            Rating
                        </h4>
                        <div className="space-y-2">
                            {[5, 4, 3, 2].map((rating) => (
                                <label
                                    key={rating}
                                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                >
                                    <input
                                        type="checkbox"
                                        className="rounded text-blue-600"
                                    />
                                    <div className="flex items-center gap-1">
                                        {[...Array(rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                            />
                                        ))}
                                        {[...Array(5 - rating)].map((_, i) => (
                                            <Star
                                                key={i + rating}
                                                className="w-4 h-4 text-gray-300"
                                            />
                                        ))}
                                        <span className="text-sm ml-1 font-medium text-gray-700">
                                            & Up
                                        </span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Reset Filters */}
                    <button className="w-full bg-gray-100 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                        Clear All
                    </button>
                </div>
            </div>

            {/* Products Section */}
            <div className="flex-1">
                <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-md">
                    <p className="text-gray-700 font-medium">
                        Showing <span className="font-bold">1-12</span> of{' '}
                        <span className="font-bold">248</span> products
                    </p>
                    <select className="border border-gray-300 rounded-lg px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
                        <option>Sort: Featured</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest First</option>
                        <option>Best Rating</option>
                    </select>
                </div>

                {/* Product List */}
                <ErrorBoundary fallback={<ProductsError />}>
                    <Suspense fallback={<AllProductsSkeleton />}>
                        <ProductList />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </div>
    </main>
);

export default Products;
