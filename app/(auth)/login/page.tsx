import { LoginForm } from '@/app/components/auth/login-form';
import { LoginInput } from '@/lib/validations/auth';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { cookies } from 'next/headers';

const Login = async () => {
    const handleLogin = async (data: LoginInput & { remember?: boolean }) => {
        'use server';

        try {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                remember: data.remember,
                redirect: false,
            });

            if (result?.error) {
                return { error: 'Invalid email or password' };
            }

            if (data.remember) {
                const cookieStore = await cookies();
                const sessionCookie =
                    cookieStore.get('authjs.session-token') ||
                    cookieStore.get('__Secure-authjs.session-token');

                if (sessionCookie) {
                    cookieStore.set(sessionCookie.name, sessionCookie.value, {
                        maxAge: 30 * 24 * 60 * 60, // 30 days
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'lax',
                        path: '/',
                    });
                }
            } else {
                // Session expires when browser closes
                const cookieStore = await cookies();
                const sessionCookie =
                    cookieStore.get('authjs.session-token') ||
                    cookieStore.get('__Secure-authjs.session-token');

                if (sessionCookie) {
                    cookieStore.set(sessionCookie.name, sessionCookie.value, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'lax',
                        path: '/',
                    });
                }
            }

            return { success: true };
        } catch (error) {
            if (error instanceof AuthError) {
                return { error: 'Invalid email or password' };
            }
            return { error: 'Something went wrong' };
        }
    };

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
                    <LoginForm onSubmit={handleLogin} />
                </div>
            </div>
        </div>
    );
};

export default Login;
