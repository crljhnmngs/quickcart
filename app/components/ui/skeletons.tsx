export const ProductGridSkeleton = () => {
    return (
        <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className="bg-white border rounded-xl overflow-hidden"
                >
                    <div className="bg-gray-200 h-56 animate-pulse"></div>
                    <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};
