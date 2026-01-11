export const ProductSkeleton = () => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Image skeleton */}
            <div className="bg-linear-to-br from-gray-200 to-gray-300 h-56"></div>

            <div className="p-5">
                {/* Category skeleton */}
                <div className="h-3 bg-gray-200 rounded w-20 mb-3 animate-pulse"></div>
                {/* Title skeleton */}
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                {/* Stars skeleton */}
                <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className="w-4 h-4 bg-gray-200 rounded animate-pulse"
                        ></div>
                    ))}
                    <div className="h-3 bg-gray-200 rounded w-10 ml-1 animate-pulse"></div>
                </div>
                {/* Price skeleton */}
                <div className="flex gap-2 h-7 mb-3">
                    <div className="h-full bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse mt-2"></div>
                </div>
                {/* Button skeleton */}
                <div className="w-full h-11 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
        </div>
    );
};

export const ProductListSkeleton = () => {
    return (
        <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <ProductSkeleton key={i} />
            ))}
        </div>
    );
};

export const AllProductsSkeleton = () => {
    return (
        <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse"
                >
                    {/* Image skeleton */}
                    <div className="bg-linear-to-br from-gray-200 to-gray-300 h-56"></div>

                    <div className="p-4">
                        {/* Category skeleton */}
                        <div className="h-3 bg-gray-200 rounded w-20 mb-3"></div>

                        {/* Title skeleton */}
                        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>

                        {/* Stars skeleton */}
                        <div className="flex items-center gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <div
                                    key={s}
                                    className="w-4 h-4 bg-gray-200 rounded"
                                ></div>
                            ))}
                            <div className="h-4 bg-gray-200 rounded w-10 ml-1"></div>
                        </div>

                        {/* Price skeleton */}
                        <div className="flex gap-2 h-9 mb-3">
                            <div className="h-full bg-gray-200 rounded w-24 animate-pulse"></div>
                            <div className="h-7 bg-gray-200 rounded w-20 animate-pulse mt-2"></div>
                        </div>

                        {/* Button skeleton */}
                        <div className="w-full h-11 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const ProductDetailsSkeleton = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex gap-12">
                {/* Product Images Skeleton */}
                <div className="w-1/2">
                    <div className="bg-linear-to-br from-gray-100 to-gray-200 rounded-2xl h-125 flex items-center justify-center mb-6 shadow-inner animate-pulse">
                        <div className="w-40 h-40 bg-gray-300 rounded-lg"></div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="bg-linear-to-br from-gray-100 to-gray-200 rounded-xl h-28 flex items-center justify-center border-2 border-transparent animate-pulse"
                            >
                                <div className="w-10 h-10 bg-gray-300 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1">
                    {/* Category Skeleton */}
                    <div className="mb-4">
                        <div className="h-6 bg-gray-200 rounded-full w-24 animate-pulse"></div>
                    </div>

                    {/* Title Skeleton */}
                    <div className="h-10 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>

                    {/* Rating Skeleton */}
                    <div className="flex items-center gap-6 mb-6">
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="w-5 h-5 bg-gray-200 rounded animate-pulse"
                                ></div>
                            ))}
                        </div>
                        <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
                        <div className="h-5 bg-gray-200 rounded w-28 animate-pulse"></div>
                    </div>

                    {/* Price Skeleton */}
                    <div className="bg-gray-100 p-6 rounded-xl mb-6">
                        <div className="h-12 bg-gray-200 rounded w-48 animate-pulse"></div>
                    </div>

                    {/* Description Skeleton */}
                    <div className="mb-8 border-l-4 border-gray-300 pl-4 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                    </div>

                    {/* Quantity Skeleton */}
                    <div className="mb-8">
                        <div className="h-6"></div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                            <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                    </div>

                    {/* Buttons Skeleton */}
                    <div className="flex gap-4 mb-10">
                        <div className="flex-1 h-14 bg-gray-200 rounded-xl animate-pulse"></div>
                        <div className="w-14 h-14 bg-gray-200 rounded-xl animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
