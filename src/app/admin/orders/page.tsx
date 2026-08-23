"use client";

import { orderService } from "@/services/order.service";
import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await orderService.getAllOrders();

                console.log("Admin orders:", result);

                setOrders(result.data || []);
            } catch (error: any) {
                console.log("Failed to fetch admin orders:", error);

                setError(
                    error?.response?.data?.message ||
                    "Failed to load orders."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    Manage Orders
                </h1>

                <p className="mt-6 text-gray-500">
                    Loading orders...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    Manage Orders
                </h1>

                <p className="mt-6 text-red-500">
                    {error}
                </p>
            </main>
        );
    }

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">
                Manage Orders
            </h1>

            <p className="mt-2 text-gray-500">
                Total Orders: {orders.length}
            </p>

            <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="border p-3 text-left">
                                Customer
                            </th>

                            <th className="border p-3 text-left">
                                Items
                            </th>

                            <th className="border p-3 text-left">
                                Total
                            </th>

                            <th className="border p-3 text-left">
                                Status
                            </th>

                            <th className="border p-3 text-left">
                                Date
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className="border p-3">
                                    <p className="font-medium">
                                        {order.user?.name}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {order.user?.email}
                                    </p>
                                </td>

                                <td className="border p-3">
                                    {order.items?.map((item: any) => (
                                        <div key={item.id}>
                                            {item.meal?.title} × {item.quantity}
                                        </div>
                                    ))}
                                </td>

                                <td className="border p-3 font-medium">
                                    ৳{order.totalPrice?.toFixed(2)}
                                </td>

                                <td className="border p-3">
                                    {order.status}
                                </td>

                                <td className="border p-3">
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}