# QuickCart

A modern e-commerce platform built with Next.js 16, featuring user authentication, shopping cart functionality, Stripe payment integration, and a clean, responsive design.

## Features

- 🔐 Secure authentication with NextAuth.js
- 💾 PostgreSQL database with Prisma ORM
- ⚡ Server-side rendering with Next.js App Router
- 💳 Stripe payment integration for secure checkout

## Tech Stack

- **Framework:** Next.js 16.1.1
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma
- **Authentication:** NextAuth.js v5
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Payment:** Stripe

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm, yarn, pnpm, or bun
- Stripe account (for payment processing)

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
# Database
DATABASE_URL="your-postgresql-connection-string"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. (Optional) Seed the database:

```bash
npx prisma db seed
```

6. Start the development server:

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

## Stripe Webhook Setup (Development)

For local development, you need to forward Stripe webhooks to your local server using the Stripe CLI:

1. Install Stripe CLI:

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows/Linux
# Download from https://github.com/stripe/stripe-cli/releases
```

2. Login to Stripe:

```bash
stripe login
```

3. Forward webhooks to your local server:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

4. Copy the webhook signing secret (starts with `whsec_`) and add it to your `.env.local` file

5. Keep the Stripe CLI running while testing payments

## Project Structure

```
quickcart/
├── app/              # Next.js app directory
├── prisma/           # Database schema and migrations
├── public/           # Static assets
└── ...
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes Prisma generation)
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Database

This project uses Prisma as the ORM. To manage your database:

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Open Prisma Studio (Database GUI)
npx prisma studio
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [React Hook Form Documentation](https://react-hook-form.com)

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add your environment variables:
    - `DATABASE_URL`
    - `NEXTAUTH_SECRET`
    - `NEXTAUTH_URL`
    - `STRIPE_SECRET_KEY`
    - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
    - `STRIPE_WEBHOOK_SECRET`
4. Deploy

#### Setting up Stripe Webhooks in Production:

1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter your webhook URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events: `payment_intent.succeeded` and `payment_intent.payment_failed`
5. Copy the webhook signing secret and add it to your Vercel environment variables

### Database Setup

Make sure to set up your PostgreSQL database:

- **Vercel Postgres**
- **Supabase**
- **Railway**
- **Neon**
- Or any PostgreSQL provider

Add the `DATABASE_URL` to your environment variables.

### Other Platforms

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for other deployment options.

## Development Workflow

1. **Start the dev server:**

```bash
npm run dev
```

2. **Start Prisma Studio (in a new terminal):**

```bash
npx prisma studio
```

3. **Start Stripe webhook forwarding (in another terminal):**

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

**Optional - Test Stripe webhooks:**

```bash
stripe trigger payment_intent.succeeded   # Simulate a successful payment
stripe trigger payment_intent.payment_failed  # Simulate a failed payment
```

Now you have:

- App running at http://localhost:3000
- Database GUI at http://localhost:5555
- Stripe webhooks forwarding to your local server
