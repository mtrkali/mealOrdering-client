"use client";

import { orderService } from "@/services/order.service";
import { p } from "framer-motion/client";
import { useParams, useRouter } from "next/navigation";
import { act, useEffect, useState } from "react";

export default function AdminOrderDetailsPage() {
    const params = useParams();
    const router = useRouter();

    const orderId = params?.orderId as string;

    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updating, setUpdating] = useState(false);
    const [actionError, setActionError] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                setError("");

                const result =
                    await orderService.getSingleOrder(orderId);

                console.log("Admin single order:", result);

                setOrder(result.data);
            } catch (error: any) {
                console.log(
                    "Failed to fetch admin order:",
                    error
                );

                setError(
                    error?.response?.data?.message ||
                    "Failed to load order."
                );
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    const handleUpdateStatus = async (
        newStatus: string,
    ) => {
        try {
            setUpdating(true);
            setActionError("");

            const result = await orderService.updateOrder(
                orderId,
                newStatus,
            )

            console.log("Update order :", result);

            setOrder((prevOrder: any) => ({
                ...prevOrder,
                status: newStatus,
            }))
        } catch (error: any) {
            console.log(
                "Failed to update order status: ",
                error
            );

            setActionError(
                error?.response?.data?.message ||
                "Failed to update order status. "
            );
        } finally {
            setUpdating(false);
        }
    }

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
                    Go Back
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

            <div className="mt-6 border rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-gray-500">
                            Customer
                        </p>

                        <p className="mt-1 font-medium">
                            {order.user?.name}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Email
                        </p>

                        <p className="mt-1 font-medium">
                            {order.user?.email}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Phone
                        </p>

                        <p className="mt-1 font-medium">
                            {order.user?.phone || "N/A"}
                        </p>
                    </div>

                    <div>
                        <p className="">
                            Status
                        </p>

                        <select
                            value={order.status}
                            onChange={(e) =>
                                handleUpdateStatus(e.target.value)
                            }
                            disabled={updating}
                            className={`mt-1 border rounded px-3 py-2 ${updating
                                ? "cursor-not-allowed"
                                : ""
                                }`}
                        >
                            <option className="text-black" value="PLACED">PLACED</option>
                            <option className="text-black" value="PREPARING">PREPARING</option>
                            <option className="text-black" value="READY">READY</option>
                            <option className="text-black" value="DELIVERED">DELIVERED</option>
                            <option className="text-black" value="CANCELLED">CANCELLED</option>
                        </select>

                        {updating && (
                            <p className="mt-1 text-sm text-gray-500">
                                Updating...
                            </p>
                        )}

                        {actionError && (
                            <p className="mt-2 text-sm text-gray-500">
                                {actionError}
                            </p>
                        )}
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Delivery Address
                        </p>

                        <p className="mt-1 font-medium">
                            {order.address}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Order Date
                        </p>

                        <p className="mt-1 font-medium">
                            {new Date(
                                order.createdAt
                            ).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-6 border rounded-lg p-6">
                <h2 className="text-xl font-bold">
                    Order Items
                </h2>

                <div className="mt-4 space-y-4">
                    {order.items?.map((item: any) => (
                        <div
                            key={item.id}
                            className="flex justify-between border-b pb-4"
                        >
                            <div>
                                <p className="font-medium">
                                    {item.meal?.title}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Quantity: {item.quantity}
                                </p>
                            </div>

                            <p className="font-medium">
                                ৳{(
                                    item.price *
                                    item.quantity
                                ).toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-between text-xl font-bold">
                    <span>
                        Total
                    </span>

                    <span>
                        ৳{order.totalPrice?.toFixed(2)}
                    </span>
                </div>
            </div>
        </main>
    );
}