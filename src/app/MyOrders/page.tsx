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
            <h1 className="text-3xl font-bold">
                My Orders
            </h1>

            {orders.length === 0 ? (
                <p className="mt-6 text-gray-500">
                    You have no orders yet.
                </p>
            ) : (
                <div className="mt-6">
                    <p className="text-gray-600">
                        Total Orders: {orders.length}
                    </p>

                    <pre className="mt-4 bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
                        {JSON.stringify(orders, null, 2)}
                    </pre>
                </div>
            )}
        </main>
    );
}