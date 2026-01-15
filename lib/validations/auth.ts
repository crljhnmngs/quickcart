import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const signupSchema = z
    .object({
        fullName: z.string().min(2, 'Full name must be at least 2 characters'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string(),
        agreeToTerms: z.boolean().refine((val) => val === true, {
            message: 'You must agree to the terms and privacy policy',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export type SignUpInput = z.infer<typeof signupSchema>;
