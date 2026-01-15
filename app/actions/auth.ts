'use server';

import { signOut } from '@/auth';
import prisma from '@/lib/prisma';
import { signupSchema } from '@/lib/validations/auth';
import bcrypt from 'bcryptjs';
import { SignUpInput } from '@/lib/validations/auth';

export const handleLogout = async () => {
    await signOut({ redirectTo: '/' });
};

export const handleSignup = async (data: SignUpInput) => {
    try {
        const validatedFields = signupSchema.safeParse(data);

        if (!validatedFields.success) {
            return { success: false, error: 'Invalid fields' };
        }

        const { fullName, email, password } = validatedFields.data;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            // TODO: Send "already registered" email
            return {
                success: true,
                message:
                    'Account created! Please check your email to verify your account.',
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                name: fullName,
                email,
                password: hashedPassword,
                emailVerified: null,
            },
        });

        // TODO: Send verification email here

        return {
            success: true,
            message:
                'Account created! Please check your email to verify your account.',
        };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }

        return {
            success: false,
            error: 'Failed to create account. Please try again.',
        };
    }
};
