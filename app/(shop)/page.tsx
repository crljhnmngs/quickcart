import Link from 'next/link';
import { Package, Truck, Shield, Star, ChevronRight } from 'lucide-react';
import { FeatureCard } from '../components/shop/feature-card';

export default async function HomePage() {
    const featuredProducts = [
        {
            id: '1',
            name: 'Premium Wireless Headphones',
            description:
                'High-quality noise-cancelling headphones with 30-hour battery life',
            price: 199.99,
            image: null,
            stock: 25,
            category: 'Electronics',
            featured: true,
        },
        {
            id: '2',
            name: 'Smart Watch Pro',
            description:
                'Fitness tracking, heart rate monitor, and smartphone notifications',
            price: 299.99,
            image: null,
            stock: 15,
            category: 'Electronics',
            featured: true,
        },
        {
            id: '3',
            name: 'Ultrabook Laptop 15"',
            description: '16GB RAM, 512GB SSD, Intel i7 processor',
            price: 999.99,
            image: null,
            stock: 10,
            category: 'Electronics',
            featured: true,
        },
        {
            id: '4',
            name: 'Wireless Mouse',
            description: 'Ergonomic design with precision tracking',
            price: 49.99,
            image: null,
            stock: 50,
            category: 'Electronics',
            featured: true,
        },
        {
            id: '5',
            name: 'Mechanical Keyboard RGB',
            description: 'Cherry MX switches with customizable RGB lighting',
            price: 149.99,
            image: null,
            stock: 30,
            category: 'Electronics',
            featured: true,
        },
        {
            id: '6',
            name: '4K Webcam',
            description: 'Crystal clear video for streaming and calls',
            price: 129.99,
            image: null,
            stock: 20,
            category: 'Electronics',
            featured: true,
        },
        {
            id: '7',
            name: 'Portable SSD 1TB',
            description: 'Fast external storage with USB-C connection',
            price: 179.99,
            image: null,
            stock: 35,
            category: 'Electronics',
            featured: true,
        },
        {
            id: '8',
            name: 'Gaming Chair Pro',
            description: 'Ergonomic gaming chair with lumbar support',
            price: 349.99,
            image: null,
            stock: 12,
            category: 'Furniture',
            featured: true,
        },
    ];

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
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold">
                            Featured Products
                        </h2>
                        <Link
                            href="/products"
                            className="text-blue-600 font-semibold flex items-center gap-2"
                        >
                            View All <ChevronRight className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                            >
                                <div className="bg-white border rounded-xl overflow-hidden hover:shadow-xl transition">
                                    <div className="bg-gray-100 h-56 flex items-center justify-center">
                                        <Package className="w-20 h-20 text-gray-400" />
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
                </div>
            </section>
        </main>
    );
}
