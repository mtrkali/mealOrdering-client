"use client";

import { useCart } from "@/context/CartContext";


export default function CartPage() {
    const { cart } = useCart();

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">
                My Cart
            </h1>

            {cart.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">
                        Your cart is empty.
                    </p>
                </div>
            ) : (
                <div>
                    <p className="text-gray-600">
                        Cart Items: {cart.length}
                    </p>

                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="border rounded-lg p-4 mt-4"
                        >
                            <h2 className="font-semibold">
                                {item.title}
                            </h2>

                            <p>Price: ৳ {item.price}</p>

                            <p>Quantity: {item.quantity}</p>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}