"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<any>(null);

export const CartProvider = ({children}: any) => {
    const [cart, setCart] = useState<any[]>([]);

    // load from localStorage 
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if(storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, [])

    // save to localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
    
    const addToCart = (meal: any) => {
        setCart((prev)=> {
            const exists = prev.find((item) => item.id === meal.id); // prev array er modde mealid jukto kono obj ace kina
           
            if(exists){
                return prev.map((item) => 
                item.id === meal.id ? {...item, quantity: (item.quantity || 1) + 1}
                : item
             );
            }

            return [...prev, {...meal, quantity: 1}];
        });
    };

    const removeFromCart = (mealId: number) => {
        setCart((prev) =>{
            return prev
            .map((item) => {
                if(item.id === mealId) {
                    return {...item,
                        quantity: item.quantity - 1,
                    };
                }
                return item;
            }).filter((item) => item.quantity > 0);
        });
    }




    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () =>  useContext(CartContext);