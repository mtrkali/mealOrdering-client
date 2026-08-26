"use client";

import { orderService } from "@/services/order.service";
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const orderStatus = [
    "PLACED",
    "PREPARING",
    "READY",
    "DELIVERED",
    "CANCELLED"
]


export default function ProviderOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

    const router = useRouter();
    useEffect(() => {
        const fetchProviderOrders = async () => {
            try {
                setLoading(true);
                setError("");

                const result =
                    await orderService.getProviderOrders();

                console.log("Provider orders:", result);

                setOrders(result.data || []);
            } catch (error: any) {
                console.log(
                    "Failed to fetch provider orders:",
                    error
                );

                setError(
                    error?.response?.data?.message ||
                    "Failed to load orders."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProviderOrders();
    }, []);


    const handleStatusChange = async (orderId: string, status: string) => {
        try {
            setUpdatingOrderId(orderId);
            setError("");

            const result = await orderService.updateProvidersOrder(orderId, status);
            console.log("order status updated :", result);
            setOrders(prev =>
                prev.map(order => order.id === orderId
                    ? { ...order, status }
                    : order
                )
            )
        } catch (error: any) {
            console.log("Failed to update order status:", error);

            setError(
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "Failed to update order status."
            )
        } finally {
            setUpdatingOrderId(null);
        }
    }

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

            {orders.length === 0 ? (
                <p className="mt-6 text-gray-500">
                    You don't have any orders yet.
                </p>
            ) : (
                <div className="mt-6 overflow-x-auto">
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="border p-3 text-left">
                                    Customer
                                </th>

                                <th className="border p-3 text-left">
                                    Meals
                                </th>

                                <th className="border p-3 text-left">
                                    Quantity
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
                                <th className="border p-3 text-left">
                                    Action
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
                                        {order.items?.map(
                                            (item: any) => (
                                                <div
                                                    key={item.id}
                                                    className="mb-1"
                                                >
                                                    {item.meal?.title}
                                                </div>
                                            )
                                        )}
                                    </td>

                                    <td className="border p-3">
                                        {order.items?.map(
                                            (item: any) => (
                                                <div
                                                    key={item.id}
                                                    className="mb-1"
                                                >
                                                    {item.quantity}
                                                </div>
                                            )
                                        )}
                                    </td>

                                    <td className="border p-3 font-medium">
                                        ৳{order?.items
                                            .map((item: any) => item.price * item.quantity)
                                            .reduce((sum: number, singlePrice: number) => {
                                                return sum + singlePrice
                                            }, 0).toFixed(2)}
                                    </td>

                                    <td className="border p-3">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            disabled={order.id === updatingOrderId}
                                            className="border rounded px-2 py-1">
                                            {orderStatus.map((status, index) => (
                                                <option key={index} className="bg-black" value={status}>{status}</option>
                                            ))}
                                        </select>
                                        {order.id === updatingOrderId && <p>Updating....</p>}
                                    </td>

                                    <td className="border p-3">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="border p-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                router.push(
                                                    `/provider/orders/${order.id}`
                                                )
                                            }
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
            }
        </main >
    );
}