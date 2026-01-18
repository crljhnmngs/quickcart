'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { addToCartForUser } from '@/app/actions/cart';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store/cart-store';

type AddToCartButtonProps = {
    productId: string;
    className?: string;
};

export const AddToCartButton = ({
    productId,
    className,
}: AddToCartButtonProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setLoading(true);

        try {
            const result = await addToCartForUser(productId, 1);

            if (result.success) {
                toast.success('Added to cart!', {
                    position: 'top-right',
                    duration: 2000,
                });
                window.dispatchEvent(new Event('cart-updated'));
                router.refresh();
            } else {
                addItem(productId, 1);
                toast.success('Added to cart (guest)', {
                    position: 'top-right',
                    duration: 2000,
                });
            }
        } catch {
            toast.error('Something went wrong, please try again.', {
                position: 'top-right',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}
        >
            {loading ? (
                <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding...
                </>
            ) : (
                <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                </>
            )}
        </button>
    );
};
