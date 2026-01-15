import { handleSignup } from '@/app/actions/auth';
import { SignUpForm } from '@/app/components/auth/signup-form';
import { SignUpInput } from '@/lib/validations/auth';
import Link from 'next/link';

const Signup = async () => {
    const handleSignUp = async (data: SignUpInput) => {
        'use server';

        return await handleSignup(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-500 via-blue-500 to-purple-500 px-6">
            <div className="w-full max-w-md">
                {/* Signup card */}
                <div className="bg-white rounded-3xl shadow-2xl p-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
                            Join QuickCart
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Create your account
                        </p>
                    </div>

                    <div className="space-y-4">
                        {/* Form */}
                        <SignUpForm onSubmit={handleSignUp} />
                        {/* Sign in link */}
                        <p className="text-center text-sm text-gray-600 mt-6">
                            Already have an account?{' '}
                            <Link
                                href="login"
                                className="text-blue-600 font-bold hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
