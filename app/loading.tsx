const Loading = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                {/* Spinner */}
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

                {/* Loading text */}
                <p className="text-xl font-semibold text-gray-700">
                    Loading...
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    Please wait a moment
                </p>
            </div>
        </div>
    );
};

export default Loading;
