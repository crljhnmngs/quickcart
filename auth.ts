import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { loginSchema } from './lib/validations/auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: 'jwt',
    },
    cookies: {
        sessionToken: {
            name:
                process.env.NODE_ENV === 'production'
                    ? '__Secure-authjs.session-token'
                    : 'authjs.session-token',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production',
            },
        },
    },
    providers: [
        Credentials({
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
                remember: { label: 'Remember', type: 'checkbox' },
            },
            async authorize(credentials) {
                const validatedFields = loginSchema.safeParse(credentials);

                if (!validatedFields.success) {
                    throw new Error('Invalid credentials format');
                }

                const { email, password } = validatedFields.data;

                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user || !user.password) {
                    throw new Error('Invalid email or password');
                }

                const isValid = await bcrypt.compare(password, user.password);

                if (!isValid) {
                    throw new Error('Invalid email or password');
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    isAdmin: user.isAdmin,
                    remember: credentials.remember === 'true',
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.isAdmin = user.isAdmin;
                token.remember = user.remember;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.isAdmin = token.isAdmin as boolean;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
});
