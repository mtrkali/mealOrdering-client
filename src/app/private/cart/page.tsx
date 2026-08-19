"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const router = useRouter();
    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
    } = useCart();

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );



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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => {
                            const itemSubtotal =
                                item.price * item.quantity;

                            return (
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

                                            <p className="text-sm text-gray-500 mt-1">
                                                Subtotal: ৳ {itemSubtotal}
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
                            );
                        })}
                    </div>

                    {/* Order Summary */}
                    <div className="border rounded-lg p-6 h-fit">
                        <h2 className="text-xl font-bold mb-5">
                            Order Summary
                        </h2>

                        <div className="flex justify-between mb-3">
                            <span className="text-gray-600">
                                Total Items
                            </span>

                            <span className="font-medium">
                                {totalItems}
                            </span>
                        </div>

                        <div className="flex justify-between mb-4">
                            <span className="text-gray-600">
                                Subtotal
                            </span>

                            <span className="font-medium">
                                ৳ {subtotal}
                            </span>
                        </div>

                        <div className="border-t pt-4 flex justify-between">
                            <span className="font-bold">
                                Total
                            </span>

                            <span className="font-bold text-lg">
                                ৳ {subtotal}
                            </span>
                        </div>

                        <button
                            onClick={() => router.push("/private/checkout")}
                            disabled={cart.length === 0}
                            className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}