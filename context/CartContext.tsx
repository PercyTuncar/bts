"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
    slug: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (slug: string) => void;
    clearCart: () => void;
    total: number;
    count: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem("bts-cart");
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load cart", e);
            }
        }
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        localStorage.setItem("bts-cart", JSON.stringify(items));
    }, [items]);

    const addItem = (newItem: Omit<CartItem, "quantity">) => {
        setItems(current => {
            const existing = current.find(i => i.slug === newItem.slug);
            if (existing) {
                return current.map(i =>
                    i.slug === newItem.slug
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...current, { ...newItem, quantity: 1 }];
        });
    };

    const removeItem = (slug: string) => {
        setItems(current => current.filter(i => i.slug !== slug));
    };

    const clearCart = () => setItems([]);

    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const count = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total, count }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
