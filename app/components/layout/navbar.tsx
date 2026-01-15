import Link from 'next/link';
import { Search } from 'lucide-react';
import { auth } from '@/auth';
import { NavbarActions } from './navbar-actions';

export async function Navbar({ showSearch = true }: { showSearch?: boolean }) {
    const session = await auth();

    return (
        <nav className="bg-white border-b shadow-sm mb-8">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between gap-8">
                    {/* Logo & Links */}
                    <div className="flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                        >
                            QuickCart
                        </Link>
                        <div className="hidden md:flex gap-6">
                            <Link
                                href="/products"
                                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                            >
                                Products
                            </Link>
                            <Link
                                href="/categories"
                                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                            >
                                Categories
                            </Link>
                            <Link
                                href="/deals"
                                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                            >
                                Deals
                            </Link>
                            <Link
                                href="/contact"
                                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Search Bar */}
                    {showSearch && (
                        <div className="flex-1 max-w-xl">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                />
                            </div>
                        </div>
                    )}

                    {/* Navbar actions */}
                    <NavbarActions session={session} />
                </div>
            </div>
        </nav>
    );
}
