'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Package, CreditCard } from 'lucide-react';
import { CheckoutFormData, checkoutSchema } from '@/lib/validations/checkout';
import { useCheckout } from './checkout-client-wrapper';

export const CheckoutForm = () => {
    const { handleCheckout } = useCheckout();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting, isValid, isDirty },
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        mode: 'onChange',
        defaultValues: {
            paymentMethod: 'credit-card',
        },
    });

    // Watch payment method to conditionally render card fields
    const paymentMethod = useWatch({
        control,
        name: 'paymentMethod',
        defaultValue: 'credit-card',
    });

    const onFormSubmit = async (data: CheckoutFormData) => {
        await handleCheckout(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="flex-1 space-y-6"
        >
            {/* Shipping Address Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="font-bold text-2xl mb-6">Shipping Address</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {/* First Name*/}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            placeholder="John"
                            {...register('firstName')}
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>
                    {/* Last Name */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            placeholder="Doe"
                            {...register('lastName')}
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>
                    {/* Email */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            {...register('email')}
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Phone Number*/}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            placeholder="+63 912 345 6789"
                            {...register('phone')}
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">
                            Address
                        </label>
                        <input
                            type="text"
                            placeholder="123 Main Street"
                            {...register('address')}
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.address.message}
                            </p>
                        )}
                    </div>
                    {/* City */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            City
                        </label>
                        <input
                            type="text"
                            placeholder="Cebu"
                            {...register('city')}
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.city && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.city.message}
                            </p>
                        )}
                    </div>
                    {/* Postal Code */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Postal Code
                        </label>
                        <input
                            type="text"
                            placeholder="6015"
                            {...register('postalCode')}
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.postalCode && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.postalCode.message}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="font-bold text-2xl mb-6">Payment Method</h3>
                <div className="space-y-3 mb-6">
                    {/* Credit Card Option */}
                    <label
                        className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer ${
                            paymentMethod === 'credit-card'
                                ? 'border-blue-600 bg-gray-50'
                                : 'border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        <input
                            type="radio"
                            value="credit-card"
                            {...register('paymentMethod')}
                            className="w-5 h-5"
                        />
                        <CreditCard
                            className={`w-7 h-7 ${
                                paymentMethod === 'credit-card'
                                    ? 'text-blue-600'
                                    : 'text-gray-600'
                            }`}
                        />
                        <div className="flex-1">
                            <span className="font-bold block">Credit Card</span>
                            <span className="text-sm text-gray-600">
                                Visa, Mastercard, Amex
                            </span>
                        </div>
                    </label>
                    {/* Cash on Delivery Option */}
                    <label
                        className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer ${
                            paymentMethod === 'cod'
                                ? 'border-blue-600 bg-gray-50'
                                : 'border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        <input
                            type="radio"
                            value="cod"
                            {...register('paymentMethod')}
                            className="w-5 h-5"
                        />
                        <Package
                            className={`w-7 h-7 ${
                                paymentMethod === 'cod'
                                    ? 'text-blue-600'
                                    : 'text-gray-600'
                            }`}
                        />
                        <div className="flex-1">
                            <span className="font-bold block">
                                Cash on Delivery
                            </span>
                            <span className="text-sm text-gray-600">
                                Pay when you receive
                            </span>
                        </div>
                    </label>
                </div>
            </div>
            {/* Submit Button */}
            <button
                type="submit"
                disabled={!isDirty || !isValid || isSubmitting}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-4"
            >
                {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
        </form>
    );
};
