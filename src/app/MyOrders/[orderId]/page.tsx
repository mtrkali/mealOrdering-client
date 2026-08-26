"use client";

import { useAuth } from "@/context/AuthContext";
import { orderService } from "@/services/order.service";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetailsPage() {
    const user = useAuth();
    const router = useRouter();
    console.log("current user :", user);
    const params = useParams();
    const orderId = params?.orderId as string | undefined;


    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");


    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await orderService.getMySingleOrder(orderId as string)
                console.log("Single order: ", result);
                setOrder(result.data);
            } catch (error: any) {
                console.log("Failed to fetch order: ", error);

                setError(
                    error?.response?.data?.message ||
                    "Failed to load order details."
                );
            } finally {
                setLoading(false);
            };
        }
        if (orderId) fetchOrder();
    }, [orderId])

    if (loading) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    Order Details
                </h1>

                <p className="mt-6 text-gray-500">
                    Loading order...
                </p>
            </main>
        )
    }

    if (error) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    Order Details
                </h1>

                <p className="mt-6 text-red-500">
                    {error}
                </p>
            </main>
        )
    }

    if (!order) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    Order Details
                </h1>

                <p className="mt-6 text-gray-500">
                    Order not found.
                </p>
            </main>
        )
    }
    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">
                Order Details
            </h1>

            <button
                type="button"
                onClick={() => router.back()}
                className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
                ← Back to Orders
            </button>

            <div className="mt-6 space-y-6">

                {/* Order Summary */}
                <div className="border p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">
                        Order Summary
                    </h2>

                    <div className="space-y-2 text-sm">
                        <p>
                            <span className="font-medium">Order ID:</span>{" "}
                            {order.id}
                        </p>

                        <p>
                            <span className="font-medium">Status:</span>{" "}
                            <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                {order.status}
                            </span>
                        </p>

                        <p>
                            <span className="font-medium">Total:</span>{" "}
                            <span className="font-semibold text-lg">
                                ৳{order.totalPrice}
                            </span>
                        </p>


                        <p>
                            <span className="font-medium">Created At:</span>{" "}
                            {new Date(order.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Customer Information */}
                <div className="border p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">
                        Customer Information
                    </h2>

                    <div className="space-y-2 text-sm">
                        <p>
                            <span className="font-medium">Name:</span>{" "}
                            {order.user?.name}
                        </p>

                        <p>
                            <span className="font-medium">Email:</span>{" "}
                            {order.user?.email}
                        </p>

                        <p>
                            <span className="font-medium">Phone:</span>{" "}
                            {order.user?.phone || "Not provided"}
                        </p>
                    </div>
                </div>

                {/* Order Items */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        Order Items
                    </h2>

                    <div className="space-y-4">
                        {order.items?.map((item: any) => (
                            <div
                                key={item.id}
                                className="border rounded-lg p-4 flex gap-4"
                            >
                                {item.meal?.image && (
                                    <img
                                        src={item.meal.image}
                                        alt={item.meal.title}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                )}

                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold">
                                        {item.meal?.title}
                                    </h3>

                                    <p className="text-sm text-gray-600">
                                        Cuisine: {item.meal?.cuisine}
                                    </p>

                                    <p>
                                        <span className="font-medium">
                                            Quantity:
                                        </span>{" "}
                                        {item.quantity}
                                    </p>

                                    <p>
                                        <span className="font-medium">
                                            Price:
                                        </span>{" "}
                                        ৳{item.price}
                                    </p>

                                    <p className="font-medium">
                                        Subtotal: ৳{item.price * item.quantity}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}