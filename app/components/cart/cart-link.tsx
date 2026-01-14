import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';

export const CartLink = () => {
    const totalItems = useCartStore((state) =>
        state.items.reduce((sum, item) => sum + item.quantity, 0)
    );

    return (
        <Link
            href="/cart"
            className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors"
        >
            <ShoppingCart className="w-6 h-6 text-gray-600" />

            {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                    {totalItems}
                </span>
            )}
        </Link>
    );
};
