import { create } from 'zustand';

type CartItem = {
    productId: string;
    quantity: number;
};

type CartState = {
    items: CartItem[];
    hydrated: boolean;
    addItem: (productId: string, quantity?: number) => void;
    setItems: (items: CartItem[]) => void;
    clear: () => void;
    hydrate: () => void;
};

const CART_KEY = 'guest_cart';

const saveToStorage = (items: CartItem[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
    }
};

const loadFromStorage = (): CartItem[] => {
    if (typeof window === 'undefined') return [];

    try {
        const stored = localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    hydrated: false,

    hydrate: () => {
        const items = loadFromStorage();
        set({ items, hydrated: true });
    },

    setItems: (items) => {
        set({ items });
        saveToStorage(items);
    },

    addItem: (productId, quantity = 1) => {
        const items = [...get().items];
        const existing = items.find((i) => i.productId === productId);

        if (existing) {
            existing.quantity += quantity;
            if (existing.quantity <= 0) {
                const filtered = items.filter((i) => i.productId !== productId);
                set({ items: filtered });
                saveToStorage(filtered);
                return;
            }
        } else if (quantity > 0) {
            items.push({ productId, quantity });
        }

        set({ items });
        saveToStorage(items);
    },

    clear: () => {
        set({ items: [] });
        if (typeof window !== 'undefined') {
            localStorage.removeItem(CART_KEY);
        }
    },
}));
