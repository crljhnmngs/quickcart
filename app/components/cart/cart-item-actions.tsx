'use client';

import { Trash2 } from 'lucide-react';
import { updateCartQuantity, removeFromCart } from '@/app/actions/cart';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type CartItemActionsProps = {
    productId: string;
    quantity: number;
    stock: number;
};

export const CartItemActions = ({
    productId,
    quantity,
    stock,
}: CartItemActionsProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleUpdateQuantity = async (newQuantity: number) => {
        setLoading(true);
        const result = await updateCartQuantity(productId, newQuantity);

        if (result.success) {
            window.dispatchEvent(new Event('cart-updated'));
            router.refresh();
        } else {
            toast.error('Failed to update quantity', {
                position: 'top-right',
            });
        }
        setLoading(false);
    };

    const handleRemove = async () => {
        setLoading(true);
        const result = await removeFromCart(productId);

        if (result.success) {
            toast.success('Removed from cart', {
                position: 'top-right',
                duration: 2000,
            });
            window.dispatchEvent(new Event('cart-updated'));
            router.refresh();
        } else {
            toast.error('Failed to remove item', {
                position: 'top-right',
            });
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center gap-4 mt-4">
            {/* Quantity controls */}
            <div className="flex items-center gap-2 border-2 border-gray-300 rounded-lg">
                {/* Decrease quantity */}
                <button
                    className="px-4 py-2 font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 text-black"
                    disabled={quantity <= 1 || loading}
                    onClick={() => handleUpdateQuantity(quantity - 1)}
                >
                    -
                </button>

                {/* Current quantity */}
                <span className="px-4 font-bold text-black">{quantity}</span>

                {/* Increase quantity */}
                <button
                    className="px-4 py-2 font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 text-black"
                    disabled={quantity >= stock || loading}
                    onClick={() => handleUpdateQuantity(quantity + 1)}
                >
                    +
                </button>
            </div>

            {/* Stock info */}
            <span className="text-sm text-gray-500">{stock} in stock</span>

            {/* Remove button */}
            <button
                className="text-red-600 hover:text-red-700 flex items-center gap-2 font-semibold hover:bg-red-50 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                disabled={loading}
                onClick={handleRemove}
            >
                <Trash2 className="w-5 h-5" />
                Remove
            </button>
        </div>
    );
};
