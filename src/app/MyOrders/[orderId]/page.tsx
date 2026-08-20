"use client";

import { orderService } from "@/services/order.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetailsPage() {
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

            <pre className="mt-6 bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
                {JSON.stringify(order, null, 2)}
            </pre>
        </main>
    );
}