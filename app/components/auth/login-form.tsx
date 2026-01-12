'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/lib/validations/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const LoginForm = ({
    onSubmit,
}: {
    onSubmit: (
        data: LoginInput & { remember?: boolean }
    ) => Promise<{ error?: string; success?: boolean } | void>;
}) => {
    const [serverError, setServerError] = useState<string | null>(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const onFormSubmit = async (data: LoginInput) => {
        setServerError(null);
        const remember = (
            document.querySelector('input[name="remember"]') as HTMLInputElement
        )?.checked;
        const result = await onSubmit({ ...data, remember });

        if (result?.error) {
            setServerError(result.error);
        } else if (result?.success) {
            router.push('/');
            router.refresh();
        }
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="space-y-5">
                {/* Server error */}
                {serverError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                        {serverError}
                    </div>
                )}

                {/* Email field */}
                <div>
                    <label className="block text-sm font-bold mb-2 text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full border-2 text-black border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password field */}
                <div>
                    <label className="block text-sm font-bold mb-2 text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full border-2 text-black border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('password')}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="remember"
                            className="rounded w-5 h-5"
                        />
                        <span className="text-sm font-medium text-black">
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
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
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
                    <button
                        type="button"
                        className="border-2 border-gray-300 py-3 rounded-xl hover:bg-gray-50 font-semibold text-black"
                    >
                        Google
                    </button>
                    <button
                        type="button"
                        className="border-2 border-gray-300 py-3 rounded-xl hover:bg-gray-50 font-semibold text-black"
                    >
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
        </form>
    );
};
