'use client';

import Link from 'next/link';
import { User, Heart, LogIn } from 'lucide-react';
import { CartLink } from '../cart/cart-link';
import { LogoutButton } from '../buttons/logout-button';
import { Session } from 'next-auth';

type NavbarActionsProps = {
    session: Session | null;
};

export const NavbarActions = ({ session }: NavbarActionsProps) => {
    const isAuthenticated = !!session;

    return (
        <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Heart className="w-6 h-6 text-gray-600" />
            </button>

            <CartLink />

            {isAuthenticated ? (
                <>
                    <Link
                        href="/profile"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title={session?.user?.name || 'Profile'}
                    >
                        <User className="w-6 h-6 text-gray-600" />
                    </Link>

                    <LogoutButton />
                </>
            ) : (
                <Link
                    href="/login"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Login"
                >
                    <LogIn className="w-6 h-6 text-gray-600" />
                </Link>
            )}
        </div>
    );
};
