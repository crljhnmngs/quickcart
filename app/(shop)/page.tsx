import Link from 'next/link';
import { Package, Truck, Shield, ChevronRight } from 'lucide-react';
import { FeatureCard } from '../components/shop/feature-card';
import { Suspense } from 'react';
import { FeaturedProducts } from '../components/shop/featured-products';
import { ProductGridSkeleton } from '../components/ui/skeletons';
import { ErrorBoundary } from '../components/ui/error-boundary';
import { ProductsError } from '../components/shop/products-error';

export default async function HomePage() {
    return (
        <main>
            {/* Hero Section */}
            <section className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-500 text-white py-20">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Add account buttons in top right */}
                    <div className="flex justify-end gap-4 mb-8">
                        <Link
                            href="/login"
                            className="px-6 py-2 border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
                        >
                            Sign Up
                        </Link>
                    </div>

                    <h1 className="text-6xl font-bold mb-4">Summer Sale</h1>
                    <p className="text-2xl mb-8">
                        Up to 50% off on selected items
                    </p>
                    <Link
                        href="/products"
                        className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition"
                    >
                        Shop Now →
                    </Link>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Truck className="w-8 h-8" />}
                        title="Free Shipping"
                        description="On orders over $50"
                    />
                    <FeatureCard
                        icon={<Shield className="w-8 h-8" />}
                        title="Secure Payment"
                        description="100% secure transactions"
                    />
                    <FeatureCard
                        icon={<Package className="w-8 h-8" />}
                        title="Easy Returns"
                        description="30-day return policy"
                    />
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-8">
                        Featured Products
                    </h2>

                    <section className="py-16">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-bold">
                                    Featured Products
                                </h2>
                                <Link
                                    href="/products"
                                    className="text-blue-600 font-semibold flex items-center gap-2"
                                >
                                    View All{' '}
                                    <ChevronRight className="w-5 h-5" />
                                </Link>
                            </div>

                            <ErrorBoundary fallback={<ProductsError />}>
                                <Suspense fallback={<ProductGridSkeleton />}>
                                    <FeaturedProducts />
                                </Suspense>
                            </ErrorBoundary>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
}
