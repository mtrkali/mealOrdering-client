"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type CartItem = {
    id: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
}

type CartContextType = {
    cart: CartItem[];
    addToCart: (meal: Omit<CartItem, "quantity">) => void;
    increaseQuantity: (mealId: string) => void;
    decreaseQuantity: (mealId: string) => void;
    removeFromCart: (mealId: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // load from localStorage 
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            try {
                setCart(JSON.parse(storedCart));
            } catch (error) {
                console.log("Failed to parse cart: ", error)
                localStorage.removeItem("cart")
            }
        }
        setIsLoaded(true);
    }, [])

    // save cart to localStorage
    useEffect(() => {
        if (!isLoaded) return;
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart, isLoaded]);

    // add meal to cart 
    const addToCart = (meal: Omit<CartItem, "quantity">) => {
        setCart((prev) => {
            const exists = prev.find((item) => item.id === meal.id); // prev array er modde mealid jukto kono obj ace kina

            if (exists) {
                return prev.map((item) =>
                    item.id === meal.id ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            }

            return [...prev, { ...meal, quantity: 1 }];
        });
    };
    // Increase quantity
    const increaseQuantity = (mealId: string) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === mealId
                    ? {
                        ...item, quantity: item.quantity + 1,
                    }
                    : item
            )
        );
    };

    // Decrease quantity 
    const decreaseQuantity = (mealId: string) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.id === mealId
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    // Remove item completely
    const removeFromCart = (mealId: string) => {
        setCart((prev) =>
            prev.filter((item) => item.id !== mealId)
        );
    }

    // Clear entire Cart
    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error("useCart must be use inside CartProvider")
    return context;
};