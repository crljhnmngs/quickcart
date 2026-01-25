import { z } from 'zod';

export const checkoutSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z
        .string()
        .min(10, 'Phone number must be at least 10 digits')
        .regex(/^[0-9+\s()-]+$/, 'Invalid phone number format'),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    paymentMethod: z.enum(['credit-card', 'cod']),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
