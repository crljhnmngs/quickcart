const Login = async () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 px-6">
            <div className="w-full max-w-md">
                {/* Login card */}
                <div className="bg-white rounded-3xl shadow-2xl p-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                            QuickCart
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Welcome back! Please sign in
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-5">
                        {/* Email field */}
                        <div>
                            <label className="block text-sm font-bold mb-2 text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Password field */}
                        <div>
                            <label className="block text-sm font-bold mb-2 text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Remember me & Forgot password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="rounded w-5 h-5"
                                />
                                <span className="text-sm font-medium">
                                    Remember me
                                </span>
                            </label>
                            <a
                                href="#"
                                className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Sign in button */}
                        <button className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all">
                            Sign In
                        </button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t-2"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-4 bg-white text-gray-500 font-semibold">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        {/* Social login buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button className="border-2 border-gray-300 py-3 rounded-xl hover:bg-gray-50 font-semibold">
                                Google
                            </button>
                            <button className="border-2 border-gray-300 py-3 rounded-xl hover:bg-gray-50 font-semibold">
                                Facebook
                            </button>
                        </div>

                        {/* Sign up link */}
                        <p className="text-center text-sm text-gray-600 mt-6">
                            {`Don't have an account? `}
                            <a
                                href="#"
                                className="text-blue-600 font-bold hover:underline"
                            >
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
