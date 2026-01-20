'use client';

import Link from 'next/link';
import { CartSummarySkeleton } from '../ui/skeletons';
import { useCart } from '@/hooks/use-cart';

type CartOrderSummaryProps = {
    userId: string;
};

export const CartOrderSummary = ({ userId }: CartOrderSummaryProps) => {
    const { itemCount, subtotal, tax, total, isLoading } = useCart(userId);

    if (isLoading) {
        return <CartSummarySkeleton />;
    }

    return (
        <div className="w-96 shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
                <h3 className="font-bold text-2xl mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-700">
                        <span>
                            Subtotal ({itemCount}{' '}
                            {itemCount === 1 ? 'item' : 'items'})
                        </span>
                        <span className="font-bold">
                            ₱{subtotal.toFixed(2)}
                        </span>
                    </div>

                    <div className="flex justify-between text-gray-700">
                        <span>Shipping</span>
                        <span className="font-bold text-green-600">FREE</span>
                    </div>

                    <div className="flex justify-between text-gray-700">
                        <span>Tax</span>
                        <span className="font-bold">₱{tax.toFixed(2)}</span>
                    </div>

                    <div className="border-t-2 pt-4 flex justify-between items-center">
                        <span className="font-bold text-xl">Total</span>
                        <span className="font-bold text-3xl text-blue-600">
                            ₱{total.toFixed(2)}
                        </span>
                    </div>
                </div>

                <Link href="/checkout" className="w-full block">
                    <button
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 mb-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={itemCount === 0}
                    >
                        Proceed to Checkout
                    </button>
                </Link>

                <Link href="/products" className="w-full block">
                    <button className="w-full border-2 border-gray-300 py-3 rounded-xl hover:bg-gray-50 font-semibold text-black cursor-pointer transition-colors">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    );
};
