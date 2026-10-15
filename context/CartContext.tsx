"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CHILE_USD_TO_CLP_RATE } from "@/lib/currency";

export interface CartItem {
    slug: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    type?: "product" | "ticket" | "payment-plan";
    zone?: string;
    countryId?: string;
    currency?: string;
    currencySymbol?: string;
    serviceFeePerTicket?: number;
    installmentInterestPerTicket?: number;
    isInstallment?: boolean;
    installmentMonths?: number;
    paymentSchedule?: PaymentScheduleEntry[];
}

interface PaymentScheduleEntry {
    date: string;
    amount: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (slug: string) => void;
    updateItemQuantity: (slug: string, quantity: number) => void;
    updateItem: (slug: string, props: Partial<CartItem>) => void;
    clearCart: () => void;
    total: number;
    count: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem("bts-cart");
            if (saved) {
                const savedItems = JSON.parse(saved) as CartItem[];
                if (!Array.isArray(savedItems)) {
                    throw new Error("Saved cart must be an array");
                }
                setItems(savedItems.map(item => {
                    if (item.countryId !== "chile") return item;
                    return {
                        ...item,
                        price: item.currency === "CLP"
                            ? item.price
                            : Math.round(item.price * CHILE_USD_TO_CLP_RATE),
                        currency: "CLP",
                        currencySymbol: "$",
                        serviceFeePerTicket: 0,
                        installmentInterestPerTicket: 0,
                        isInstallment: false,
                        installmentMonths: undefined,
                        paymentSchedule: undefined,
                    };
                }));
            }
        } catch (error) {
            console.error("Failed to load cart", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        if (!isLoaded) return;
        localStorage.setItem("bts-cart", JSON.stringify(items));
    }, [items, isLoaded]);

    const addItem = (newItem: Omit<CartItem, "quantity">) => {
        setItems(current => {
            const existing = current.find(i => i.slug === newItem.slug);
            if (existing) {
                return current.map(i =>
                    i.slug === newItem.slug
                        ? { ...i, ...newItem, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...current, { ...newItem, quantity: 1 }];
        });
    };

    const updateItem = (slug: string, props: Partial<CartItem>) => {
        setItems(current => current.map(i => i.slug === slug ? { ...i, ...props } : i));
    };

    const updateItemQuantity = (slug: string, quantity: number) => {
        setItems(current => {
            if (quantity <= 0) {
                return current.filter(i => i.slug !== slug);
            }

            return current.map(i => (i.slug === slug ? { ...i, quantity } : i));
        });
    };

    const removeItem = (slug: string) => {
        setItems(current => current.filter(i => i.slug !== slug));
    };

    const clearCart = () => setItems([]);

    const total = items.reduce((acc, item) => {
        const serviceFee = item.serviceFeePerTicket || 0;
        const installmentInterest = item.installmentInterestPerTicket || 0;
        const unitTotal = item.price + serviceFee + installmentInterest;
        return acc + (unitTotal * item.quantity);
    }, 0);
    const count = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateItemQuantity, updateItem, clearCart, total, count }}>
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
