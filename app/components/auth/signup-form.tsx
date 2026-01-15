'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignUpInput, signupSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

export const SignUpForm = ({
    onSubmit,
}: {
    onSubmit: (data: SignUpInput) => Promise<{
        error?: string;
        message?: string;
        success?: boolean;
    } | void>;
}) => {
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpInput>({
        resolver: zodResolver(signupSchema),
    });

    const onFormSubmit = async (data: SignUpInput) => {
        setServerError(null);
        const result = await onSubmit(data);

        if (result?.error) {
            setServerError(result.error);
        } else if (result?.success) {
            toast.success(result?.message ?? 'Signup successful!', {
                position: 'top-right',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
            {/* Server error */}
            {serverError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                    {serverError}
                </div>
            )}

            {/* Full Name field */}
            <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">
                    Full Name
                </label>
                <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    {...register('fullName')}
                />
                {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.fullName.message}
                    </p>
                )}
            </div>

            {/* Email field */}
            <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    {...register('password')}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Confirm Password field */}
            <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">
                    Confirm Password
                </label>
                <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>

            {/* Terms checkbox */}
            <div>
                <label className="flex items-start gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        className="rounded w-5 h-5 mt-1"
                        {...register('agreeToTerms')}
                    />
                    <span className="text-sm text-gray-600">
                        I agree to the Terms and Privacy Policy
                    </span>
                </label>
                {errors.agreeToTerms && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.agreeToTerms.message}
                    </p>
                )}
            </div>

            {/* Create Account button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-linear-to-r from-green-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>

            {/* Divider */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="px-4 bg-white text-gray-500 font-semibold">
                        Or sign up with
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
        </form>
    );
};
