"use client";

import { Button } from "./Button";
import { useCart } from "@/context/CartContext";
import { ProductData } from "@/lib/data/products";
import { useState } from "react";
import { Check } from "lucide-react";

export function AddToCartButton({ product }: { product: ProductData }) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addItem(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <Button
            size="lg"
            className={`flex-1 transition-all ${added ? 'bg-green-500 border-green-500 text-black' : 'shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]'}`}
            onClick={handleAdd}
            disabled={added}
        >
            {added ? (
                <>
                    <Check className="w-5 h-5 mr-2" /> Añadido
                </>
            ) : (
                "Añadir al Carrito"
            )}
        </Button>
    );
}
