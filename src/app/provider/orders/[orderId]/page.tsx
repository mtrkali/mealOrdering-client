"use client";

import { orderService } from "@/services/order.service";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProviderOrderDetailsPage() {
    const params = useParams();
    const router = useRouter();

    const orderId = params?.orderId as string;

    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                setError("");

                const result =
                    await orderService.getProviderSingleOrder(
                        orderId
                    );

                console.log(
                    "Provider order details:",
                    result
                );

                setOrder(result.data);
            } catch (error: any) {
                console.log(
                    "Failed to fetch provider order details:",
                    error
                );

                setError(
                    error?.response?.data?.message ||
                    error?.response?.data?.error ||
                    "Failed to load order details."
                );
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);

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
        );
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

                <button
                    type="button"
                    onClick={() => router.back()}
                    className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                    ← Back to Orders
                </button>
            </main>
        );
    }

    if (!order) {
        return null;
    }

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <button
                type="button"
                onClick={() => router.back()}
                className="mb-6 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
                ← Back to Orders
            </button>

            <h1 className="text-3xl font-bold">
                Order Details
            </h1>

            {/* Customer Information */}
            <div className="mt-6 border rounded-lg p-6">
                <h2 className="text-xl font-bold">
                    Customer Information
                </h2>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-500">
                            Name
                        </p>

                        <p className="font-medium">
                            {order.user?.name || "N/A"}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Email
                        </p>

                        <p className="font-medium">
                            {order.user?.email || "N/A"}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Phone
                        </p>

                        <p className="font-medium">
                            {order.user?.phone || "N/A"}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Delivery Address
                        </p>

                        <p className="font-medium">
                            {order.address || "N/A"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Order Information */}
            <div className="mt-6 border rounded-lg p-6">
                <h2 className="text-xl font-bold">
                    Order Information
                </h2>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <p className="text-gray-500">
                            Order ID
                        </p>

                        <p className="font-medium break-all">
                            {order.id}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Status
                        </p>

                        <p className="font-medium">
                            {order.status}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Order Date
                        </p>

                        <p className="font-medium">
                            {new Date(
                                order.createdAt
                            ).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <div className="mt-6 border rounded-lg p-6">
                <h2 className="text-xl font-bold">
                    Order Items
                </h2>

                <div className="mt-4 overflow-x-auto">
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="border p-3 text-left">
                                    Meal
                                </th>

                                <th className="border p-3 text-left">
                                    Cuisine
                                </th>

                                <th className="border p-3 text-left">
                                    Quantity
                                </th>

                                <th className="border p-3 text-left">
                                    Price
                                </th>

                                <th className="border p-3 text-left">
                                    Subtotal
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {order.items?.map(
                                (item: any) => (
                                    <tr key={item.id}>
                                        <td className="border p-3">
                                            {item.meal?.title}
                                        </td>

                                        <td className="border p-3">
                                            {item.meal?.cuisine}
                                        </td>

                                        <td className="border p-3">
                                            {item.quantity}
                                        </td>

                                        <td className="border p-3">
                                            ৳
                                            {item.price?.toFixed(
                                                2
                                            )}
                                        </td>

                                        <td className="border p-3">
                                            ৳
                                            {(
                                                item.price *
                                                item.quantity
                                            ).toFixed(2)}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 text-right">
                    <p className="text-gray-500">
                        Total
                    </p>

                    <p className="text-2xl font-bold">
                        ৳
                        {order.totalPrice?.toFixed(
                            2
                        )}
                    </p>
                </div>
            </div>
        </main>
    );
}