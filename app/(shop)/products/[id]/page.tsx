import { Suspense } from 'react';
import { Navbar } from '@/app/components/layout/navbar';
import { ProductDetail } from '@/app/components/products/product-detail';
import { ProductDetailsSkeleton } from '@/app/components/ui/skeletons';

type ProductDetailScreenProps = {
    params: {
        id: string;
    };
};

const ProductDetailScreen = async ({ params }: ProductDetailScreenProps) => {
    const { id } = await params;
    return (
        <div className="max-w-7xl mx-auto px-6">
            {/* Top navigation */}
            <Navbar />
            {/* Product Detail */}
            <Suspense fallback={<ProductDetailsSkeleton />}>
                <ProductDetail id={id} />
            </Suspense>
        </div>
    );
};

export default ProductDetailScreen;
