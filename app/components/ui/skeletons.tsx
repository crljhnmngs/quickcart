export const ProductSkeleton = () => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Image skeleton */}
            <div className="bg-gray-200 h-56 flex items-center justify-center relative animate-pulse">
                <div className="w-32 h-32 bg-gray-300 rounded-lg"></div>
            </div>
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
                <div className="h-7 bg-gray-200 rounded w-24 mb-3 animate-pulse"></div>
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
                        <div className="h-9 bg-gray-300 rounded w-24 mb-3"></div>

                        {/* Button skeleton */}
                        <div className="w-full h-11 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};
