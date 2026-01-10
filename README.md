# QuickCart

A modern e-commerce platform built with Next.js 16, featuring user authentication, shopping cart functionality, and a clean, responsive design.

## Features

-   🔐 Secure authentication with NextAuth.js
-   💾 PostgreSQL database with Prisma ORM
-   ⚡ Server-side rendering with Next.js App Router

## Tech Stack

-   **Framework:** Next.js 16.1.1
-   **Language:** TypeScript
-   **Database:** PostgreSQL with Prisma
-   **Authentication:** NextAuth.js v5
-   **Styling:** Tailwind CSS v4
-   **Icons:** Lucide React

## Getting Started

### Prerequisites

-   Node.js 18+
-   PostgreSQL database
-   npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up your environment variables (create a `.env` file):

```env
DATABASE_URL="your-postgresql-connection-string"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
quickcart/
├── app/              # Next.js app directory
├── prisma/           # Database schema and migrations
├── public/           # Static assets
└── ...
```

## Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production (includes Prisma generation)
-   `npm start` - Start production server
-   `npm run lint` - Run ESLint

## Database

This project uses Prisma as the ORM. To manage your database:

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio
```

## Learn More

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Prisma Documentation](https://www.prisma.io/docs)
-   [NextAuth.js Documentation](https://next-auth.js.org)
-   [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add your environment variables
4. Deploy

Make sure to set up your PostgreSQL database (Vercel Postgres, Supabase, etc.) and add the `DATABASE_URL` to your environment variables.

### Other Platforms

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for other deployment options.
