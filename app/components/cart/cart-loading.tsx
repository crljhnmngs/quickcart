export const CartLoading = () => {
    return (
        <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
                {/* Loading skeleton for cart items */}
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="flex gap-6 border-b pb-6 mb-6 last:border-b-0 last:mb-0 last:pb-0 animate-pulse"
                    >
                        {/* Image skeleton */}
                        <div className="relative w-32 h-32 bg-gray-200 rounded-xl shrink-0" />

                        <div className="flex-1">
                            <div className="flex justify-between mb-2">
                                <div className="flex-1">
                                    {/* Title skeleton */}
                                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />

                                    {/* Category skeleton */}
                                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />

                                    {/* Rating skeleton */}
                                    <div className="flex items-center gap-1 mb-3">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <div
                                                key={star}
                                                className="w-4 h-4 bg-gray-200 rounded"
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Price skeleton */}
                                <div className="text-right">
                                    <div className="h-8 bg-gray-200 rounded w-24 mb-2" />
                                    <div className="h-4 bg-gray-200 rounded w-20" />
                                </div>
                            </div>

                            {/* Quantity controls skeleton */}
                            <div className="flex items-center gap-4 mt-4">
                                <div className="h-10 bg-gray-200 rounded-lg w-32" />
                                <div className="h-4 bg-gray-200 rounded w-20" />
                                <div className="h-10 bg-gray-200 rounded-lg w-24" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
