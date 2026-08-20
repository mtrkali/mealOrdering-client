"use client";

import { useParams } from "next/navigation";

export default function OrderDetailsPage() {
    const params = useParams();

    const orderId = params.orderId as string;

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">
                Order Details
            </h1>

            <p className="mt-4 text-gray-600">
                Order ID: {orderId}
            </p>
        </main>
    );
}