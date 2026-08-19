"use client";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
    } = useCart();

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">
                    My Cart
                </h1>

                {cart.length > 0 && (
                    <button
                        onClick={clearCart}
                        className="text-red-500 hover:text-red-700 font-medium"
                    >
                        Clear Cart
                    </button>
                )}
            </div>

            {cart.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">
                        Your cart is empty.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="border rounded-lg p-4 flex items-center justify-between gap-4"
                        >
                            {/* Meal Info */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />

                                <div>
                                    <h2 className="font-semibold">
                                        {item.title}
                                    </h2>

                                    <p className="text-gray-600">
                                        ৳ {item.price}
                                    </p>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() =>
                                        decreaseQuantity(item.id)
                                    }
                                    className="w-8 h-8 border rounded hover:bg-gray-100"
                                >
                                    -
                                </button>

                                <span className="font-semibold min-w-5 text-center">
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        increaseQuantity(item.id)
                                    }
                                    className="w-8 h-8 border rounded hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>

                            {/* Remove */}
                            <button
                                onClick={() =>
                                    removeFromCart(item.id)
                                }
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}