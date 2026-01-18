// app/page.tsx - Fixed homepage
import Link from 'next/link';
import { Package, Truck, Shield, ChevronRight } from 'lucide-react';
import { FeatureCard } from '../components/shop/feature-card';
import { Suspense } from 'react';
import { FeaturedProducts } from '../components/shop/featured-products';
import { ProductListSkeleton } from '../components/ui/skeletons';
import { ErrorBoundary } from '../components/ui/error-boundary';
import { ProductsError } from '../components/shop/products-error';
import { Navbar } from '../components/layout/navbar';
import { auth } from '@/auth';
import { CartSync } from '../components/cart/cart-sync';

export default async function HomePage() {
    const session = await auth();

    return (
        <main className="max-w-7xl mx-auto px-6">
            {/* Sync local cart to database after login */}
            {session?.user && <CartSync />}

            {/* Navbar */}
            <Navbar />
            {/* Hero Section */}
            <section className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-500 text-white p-16 rounded-2xl mb-12 shadow-xl">
                <div className="max-w-2xl">
                    <h1 className="text-6xl font-bold mb-4">Summer Sale</h1>
                    <p className="text-2xl mb-8 text-blue-100">
                        Up to 50% off on selected items
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg">
                        Shop Now →
                    </button>
                </div>
            </section>

            {/* Features */}
            <section className="grid md:grid-cols-3 gap-6 mb-16">
                <FeatureCard
                    icon={<Truck className="w-8 h-8" />}
                    title="Free Shipping"
                    description="On orders over $50"
                    color="blue"
                />
                <FeatureCard
                    icon={<Shield className="w-8 h-8" />}
                    title="Secure Payment"
                    description="100% secure transactions"
                    color="green"
                />
                <FeatureCard
                    icon={<Package className="w-8 h-8" />}
                    title="Easy Returns"
                    description="30-day return policy"
                    color="purple"
                />
            </section>

            {/* Featured Products */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-black">
                        Featured Products
                    </h2>
                    <Link
                        href="/products"
                        className="text-blue-600 font-semibold flex items-center gap-2"
                    >
                        View All <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

                <ErrorBoundary fallback={<ProductsError />}>
                    <Suspense fallback={<ProductListSkeleton />}>
                        <FeaturedProducts />
                    </Suspense>
                </ErrorBoundary>
            </section>

            {/* New Arrivals and Best Sellers */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-linear-to-br from-orange-400 to-pink-500 rounded-2xl p-8 text-white shadow-xl">
                    <h3 className="text-3xl font-bold mb-4">New Arrivals</h3>
                    <p className="mb-6 text-orange-100">
                        Check out the latest products
                    </p>
                    <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-orange-50 cursor-pointer">
                        Explore Now
                    </button>
                </div>
                <div className="bg-linear-to-br from-green-400 to-blue-500 rounded-2xl p-8 text-white shadow-xl">
                    <h3 className="text-3xl font-bold mb-4">Best Sellers</h3>
                    <p className="mb-6 text-green-100">
                        Most popular items this month
                    </p>
                    <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-green-50 cursor-pointer">
                        Shop Now
                    </button>
                </div>
            </div>
        </main>
    );
}
