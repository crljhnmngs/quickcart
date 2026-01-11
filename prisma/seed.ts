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

    console.log('Clearing existing data...');
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    console.log('Creating admin user...');
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
    console.log('Admin user created:', admin.email);

    console.log('Creating sample products...');
    const products = await Promise.all([
        prisma.product.create({
            data: {
                name: 'Premium Wireless Headphones',
                description:
                    'High-quality noise-cancelling headphones with 30-hour battery life. Features advanced ANC technology, comfortable ear cushions, and premium sound quality.',
                price: 259.99,
                discount: 23,
                images: [
                    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
                    'https://images.unsplash.com/photo-1484704849700-f032a568e944',
                    'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a',
                ],
                stock: 25,
                category: 'Electronics',
                featured: true,
                rating: 4.8,
                reviewCount: 245,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Smart Watch Pro',
                description:
                    'Fitness tracking, heart rate monitor, and smartphone notifications. Track your health 24/7 with advanced sensors.',
                price: 399.99,
                discount: 25,
                images: [
                    'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
                    'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
                ],
                stock: 15,
                category: 'Electronics',
                featured: true,
                rating: 4.6,
                reviewCount: 187,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Ultrabook Laptop 15"',
                description:
                    '16GB RAM, 512GB SSD, Intel i7 processor. Ultra-thin design with stunning display and all-day battery life.',
                price: 999.99,
                discount: null,
                images: [
                    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
                    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed',
                ],
                stock: 10,
                category: 'Electronics',
                featured: true,
                rating: 4.9,
                reviewCount: 356,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Wireless Mouse',
                description:
                    'Ergonomic design with precision tracking. Perfect for productivity and gaming.',
                price: 49.99,
                discount: null,
                images: [
                    'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7',
                ],
                stock: 50,
                category: 'Electronics',
                featured: true,
                rating: 4.4,
                reviewCount: 124,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Mechanical Keyboard RGB',
                description:
                    'Cherry MX switches with customizable RGB lighting. Durable construction with responsive keys.',
                price: 149.99,
                discount: 20,
                images: [
                    'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
                    'https://images.unsplash.com/photo-1595225476474-87563907a212',
                ],
                stock: 30,
                category: 'Electronics',
                featured: true,
                rating: 4.7,
                reviewCount: 298,
            },
        }),
        prisma.product.create({
            data: {
                name: '4K Webcam',
                description:
                    'Crystal clear video for streaming and calls. Auto-focus and HDR support.',
                price: 129.99,
                discount: 15,
                images: [
                    'https://images.unsplash.com/photo-1623949556303-b0d17a0f2a9b',
                ],
                stock: 20,
                category: 'Electronics',
                featured: true,
                rating: 4.5,
                reviewCount: 89,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Portable SSD 1TB',
                description:
                    'Fast external storage with USB-C connection. Transfer speeds up to 1000MB/s.',
                price: 179.99,
                discount: null,
                images: [
                    'https://images.unsplash.com/photo-1612197527276-3c0a54eeb9df',
                ],
                stock: 35,
                category: 'Electronics',
                featured: true,
                rating: 4.8,
                reviewCount: 412,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Gaming Chair Pro',
                description:
                    'Ergonomic gaming chair with lumbar support. Adjustable armrests and recline function.',
                price: 349.99,
                discount: 30,
                images: [],
                stock: 12,
                category: 'Furniture',
                featured: true,
                rating: 4.3,
                reviewCount: 156,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Bluetooth Speaker',
                description:
                    'Portable speaker with deep bass and waterproof design. 12-hour battery life.',
                price: 89.99,
                discount: 10,
                images: [
                    'https://images.unsplash.com/photo-1585386959984-a41552231692',
                ],
                stock: 40,
                category: 'Electronics',
                featured: true,
                rating: 4.6,
                reviewCount: 203,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Noise Cancelling Earbuds',
                description:
                    'Compact earbuds with active noise cancellation. Premium sound in a tiny package.',
                price: 129.99,
                discount: null,
                images: [
                    'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46',
                ],
                stock: 45,
                category: 'Electronics',
                featured: true,
                rating: 4.7,
                reviewCount: 178,
            },
        }),
        prisma.product.create({
            data: {
                name: 'USB-C Charging Cable',
                description:
                    'Durable 1.5m fast charging cable. Supports up to 100W power delivery.',
                price: 9.99,
                discount: null,
                images: [
                    'https://images.unsplash.com/photo-1583863788434-e58a36330cf0',
                ],
                stock: 100,
                category: 'Accessories',
                featured: false,
                rating: 4.2,
                reviewCount: 67,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Laptop Sleeve',
                description:
                    'Protective 15-inch laptop sleeve. Water-resistant material with soft interior.',
                price: 19.99,
                discount: null,
                images: [
                    'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04',
                ],
                stock: 60,
                category: 'Accessories',
                featured: false,
                rating: 4.4,
                reviewCount: 92,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Desk Organizer',
                description:
                    'Minimalist desk organizer for productivity. Bamboo construction with multiple compartments.',
                price: 24.99,
                discount: null,
                images: [
                    'https://images.unsplash.com/photo-1616628182506-17cfa00b1a30',
                ],
                stock: 35,
                category: 'Office',
                featured: false,
                rating: 4.3,
                reviewCount: 54,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Notebook Journal',
                description:
                    'Hardcover notebook for notes and planning. 200 pages of premium paper.',
                price: 14.99,
                discount: null,
                images: [],
                stock: 80,
                category: 'Stationery',
                featured: false,
                rating: 4.5,
                reviewCount: 128,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Water Bottle',
                description:
                    'Reusable stainless steel water bottle. Keeps drinks cold for 24 hours.',
                price: 17.99,
                discount: null,
                images: [
                    'https://images.unsplash.com/photo-1523362628745-0c100150b504',
                ],
                stock: 70,
                category: 'Lifestyle',
                featured: false,
                rating: 4.6,
                reviewCount: 215,
            },
        }),
    ]);

    console.log(`Created ${products.length} products`);
};

main()
    .catch((e) => {
        console.error('Error during seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
