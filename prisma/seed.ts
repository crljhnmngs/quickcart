import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
    adapter,
});

const main = async () => {
    console.log('Starting database seed...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@gmail.com' },
        update: {},
        create: {
            email: 'admin@gmail.com',
            name: 'Admin User',
            password: hashedPassword,
            emailVerified: new Date(),
            isAdmin: true,
        },
    });

    console.log('Admin user created');

    // Create sample products
    const products = await Promise.all([
        prisma.product.create({
            data: {
                name: 'Premium Wireless Headphones',
                description:
                    'High-quality noise-cancelling headphones with 30-hour battery life',
                price: 199.99,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
                stock: 25,
                category: 'Electronics',
                featured: true,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Smart Watch Pro',
                description:
                    'Fitness tracking, heart rate monitor, and smartphone notifications',
                price: 299.99,
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
                stock: 15,
                category: 'Electronics',
                featured: true,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Ultrabook Laptop 15"',
                description: '16GB RAM, 512GB SSD, Intel i7 processor',
                price: 999.99,
                image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
                stock: 10,
                category: 'Electronics',
                featured: true,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Wireless Mouse',
                description: 'Ergonomic design with precision tracking',
                price: 49.99,
                image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7',
                stock: 50,
                category: 'Electronics',
                featured: true,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Mechanical Keyboard RGB',
                description:
                    'Cherry MX switches with customizable RGB lighting',
                price: 149.99,
                image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
                stock: 30,
                category: 'Electronics',
                featured: true,
            },
        }),
        prisma.product.create({
            data: {
                name: '4K Webcam',
                description: 'Crystal clear video for streaming and calls',
                price: 129.99,
                image: 'https://images.unsplash.com/photo-1623949556303-b0d17a0f2a9b',
                stock: 20,
                category: 'Electronics',
                featured: true,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Portable SSD 1TB',
                description: 'Fast external storage with USB-C connection',
                price: 179.99,
                image: 'https://images.unsplash.com/photo-1612197527276-3c0a54eeb9df',
                stock: 35,
                category: 'Electronics',
                featured: true,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Gaming Chair Pro',
                description: 'Ergonomic gaming chair with lumbar support',
                price: 349.99,
                image: null,
                stock: 12,
                category: 'Furniture',
                featured: true,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Bluetooth Speaker',
                description:
                    'Portable speaker with deep bass and waterproof design',
                price: 89.99,
                image: 'https://images.unsplash.com/photo-1585386959984-a41552231692',
                stock: 40,
                category: 'Electronics',
                featured: true,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Noise Cancelling Earbuds',
                description: 'Compact earbuds with active noise cancellation',
                price: 129.99,
                image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46',
                stock: 45,
                category: 'Electronics',
                featured: true,
            },
        }),
        prisma.product.create({
            data: {
                name: 'USB-C Charging Cable',
                description: 'Durable 1.5m fast charging cable',
                price: 9.99,
                image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0',
                stock: 100,
                category: 'Accessories',
                featured: false,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Laptop Sleeve',
                description: 'Protective 15-inch laptop sleeve',
                price: 19.99,
                image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04',
                stock: 60,
                category: 'Accessories',
                featured: false,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Desk Organizer',
                description: 'Minimalist desk organizer for productivity',
                price: 24.99,
                image: 'https://images.unsplash.com/photo-1616628182506-17cfa00b1a30',
                stock: 35,
                category: 'Office',
                featured: false,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Notebook Journal',
                description: 'Hardcover notebook for notes and planning',
                price: 14.99,
                image: null,
                stock: 80,
                category: 'Stationery',
                featured: false,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Water Bottle',
                description: 'Reusable stainless steel water bottle',
                price: 17.99,
                image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504',
                stock: 70,
                category: 'Lifestyle',
                featured: false,
            },
        }),
    ]);

    console.log(admin);
    console.log(products);
};

main()
    .catch((e) => {
        console.error('Error during seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
