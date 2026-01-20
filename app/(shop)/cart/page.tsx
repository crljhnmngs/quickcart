import { Navbar } from '@/app/components/layout/navbar';
import { CartProductList } from '@/app/components/cart/cart-product-list';
import { CartOrderSummary } from '@/app/components/cart/cart-order-summary';
import { auth } from '@/auth';

const CartPage = async () => {
    const session = await auth();

    return (
        <div className="max-w-7xl mx-auto px-6">
            {/* Top navigation */}
            <Navbar showSearch={false} />

            {/* Page title */}
            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

            <div className="flex gap-8">
                {/* Cart items list */}
                <CartProductList />

                {/* Order summary sidebar */}
                <CartOrderSummary userId={session?.user.id ?? ''} />
            </div>
        </div>
    );
};

export default CartPage;
