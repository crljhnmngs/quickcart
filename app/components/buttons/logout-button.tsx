'use client';

import { LogOut } from 'lucide-react';
import { handleLogout } from '@/app/actions/auth';

export const LogoutButton = () => {
    return (
        <button
            onClick={() => handleLogout()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Logout"
        >
            <LogOut className="w-6 h-6 text-gray-600" />
        </button>
    );
};
