"use client"
import { orderService } from "@/services/order.service";
import { useEffect, useState } from "react";

export default function MyOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMyOrders = async () => {
            try {
                setLoading(true)
                setError("");

                const result = await orderService.getMyOrders()
                console.log("My Orders : ", result)
                setOrders(result.data);
            } catch (error: any) {
                console.log("Failed to fetch orders")

                setError(
                    error?.response?.data?.message ||
                    "Failed to load your orders."
                );
            } finally {
                setLoading(false);
            }
        }
        fetchMyOrders();
    }, [])

    if (loading) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    My Orders
                </h1>

                <p className="mt-6 text-gray-500">
                    Loading orders...
                </p>
            </main>
        )
    }

    if (error) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    My Orders
                </h1>

                <p className="mt-6 text-red-500">
                    {error}
                </p>
            </main>
        )
    }


    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">
                        My Orders
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Your order history
                    </p>
                </div>

                <span className="text-gray-600">
                    Total Orders: {orders.length}
                </span>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">
                        You have no orders yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="border rounded-xl p-6 shadow-sm"
                        >
                            {/* Order Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Order ID
                                    </p>

                                    <p className="font-semibold break-all">
                                        {order.id}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Order Date
                                    </p>

                                    <p className="font-medium">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString("en-BD", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>

                                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium capitalize">
                                    {order.status}
                                </span>
                            </div>

                            {/* Order Items */}
                            <div className="mt-5 space-y-4">
                                {order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4"
                                    >
                                        <img
                                            src={item.meal.image}
                                            alt={item.meal.title}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />

                                        <div className="flex-1">
                                            <h2 className="font-semibold">
                                                {item.meal.title}
                                            </h2>

                                            <p className="text-sm text-gray-500">
                                                {item.meal.cuisine}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>

                                        <p className="font-medium">
                                            ৳ {item.price * item.quantity}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Order Footer */}
                            <div className="border-t mt-5 pt-5">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Delivery Address
                                        </p>

                                        <p className="font-medium">
                                            {order.address}
                                        </p>
                                    </div>

                                    <div className="text-left sm:text-right">
                                        <p className="text-sm text-gray-500">
                                            Total
                                        </p>

                                        <p className="text-xl font-bold">
                                            ৳ {order.totalPrice}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}