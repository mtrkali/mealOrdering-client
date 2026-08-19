"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
    const { cart } = useCart();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
    })
    const [error, setError] = useState("");

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handlePlaceOrder = () => {
        setError("");

        if (!formData.name.trim()) {
            setError("Please enter your name");
            return;
        }

        if (!formData.phone.trim()) {
            setError("please enter your phone number");
            return;
        }

        if (!formData.address.trim()) {
            setError("Please enter your delivery address.");
            return;
        }
        console.log("checkOut data : ", {
            customer: formData,
            items: cart.map((item) => ({
                mealId: item.id,
                quantity: item.quantity,
            })),
        });
    }

    if (cart.length === 0) {
        return (
            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center py-20">
                    <h1 className="text-2xl font-bold">
                        Your cart is empty
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Add some meals before checkout.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">
                Checkout
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Customer Information */}
                <div className="lg:col-span-2 border rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-6">
                        Customer Information
                    </h2>

                    {error && (
                        <p className="mb-4 text-sm text-red-500">{error}</p>
                    )}

                    <div className="space-y-5">

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Name
                            </label>

                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                placeholder="Enter your name"
                                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Phone
                            </label>

                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        phone: e.target.value,
                                    })
                                }
                                placeholder="Enter your phone number"
                                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Delivery Address
                            </label>

                            <textarea
                                rows={4}
                                value={formData.address}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        address: e.target.value,
                                    })
                                }
                                placeholder="Enter your delivery address"
                                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Place Order */}
                        <button
                            type="button"
                            onClick={handlePlaceOrder}
                            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600"
                        >
                            Place Order
                        </button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="border rounded-lg p-6 h-fit">
                    <h2 className="text-xl font-bold mb-5">
                        Order Summary
                    </h2>

                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between gap-4"
                            >
                                <div>
                                    <p className="font-medium">
                                        {item.title}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {item.quantity} × ৳ {item.price}
                                    </p>
                                </div>

                                <p className="font-medium">
                                    ৳ {item.price * item.quantity}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t mt-5 pt-5">
                        <div className="flex justify-between">
                            <span>Total Items</span>

                            <span className="font-medium">
                                {totalItems}
                            </span>
                        </div>

                        <div className="flex justify-between mt-3">
                            <span className="font-bold">
                                Total
                            </span>

                            <span className="font-bold text-lg">
                                ৳ {subtotal}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}