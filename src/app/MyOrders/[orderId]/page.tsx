"use client";

import { useAuth } from "@/context/AuthContext";
import { orderService } from "@/services/order.service";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { reviewService } from "@/services/review.service";

export default function OrderDetailsPage() {
    const user = useAuth();
    const router = useRouter();
    const params = useParams();
    const orderId = params?.orderId as string | undefined;


    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");


    const [reviewingMealId, setReviewingMealId] = useState<string | null>(null);
    const [rating, setRating] = useState<number>(5);
    const [comment, setComment] = useState("");
    const [reviewLoading, setReviewLoading] = useState(false);
    const [reviewError, setReviewError] = useState("");
    const [reviewSuccess, setReviewSuccess] = useState("");


    const [myReview, setMyReview] = useState<any[]>([])

    const [mealReviews, setMealReviews] = useState<Record<string, any[]>>({})


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
                    error?.response?.data?.error ||
                    "Failed to load order details."
                );
            } finally {
                setLoading(false);
            };
        }
        const fetchMyReview = async () => {
            try {
                const result = await reviewService.getMyReviews();
                setMyReview(result.data || [])
            } catch (error: any) {
                console.log("Failed to fetch my reviews: ", error)
            }
        }
        if (orderId) {
            fetchOrder();
            fetchMyReview();
        }
    }, [orderId])


    const fetchMealReviews = async (mealId: string) => {
        try {
            const result = await reviewService.getMealReviews(mealId);

            setMealReviews((prev) => ({
                ...prev,
                [mealId]: result.data?.reviews || [],
            }));
        } catch (error) {
            console.log("Failed to fetch meal reviews:", error);
        }
    };

    const handleCreateReview = async () => {
        if (!reviewingMealId || !orderId) return;
        try {
            setReviewLoading(true);
            setReviewError("");
            setReviewSuccess("");

            await reviewService.createReview({
                mealId: reviewingMealId,
                orderId,
                rating,
                comment,
            })


            setComment("");
            setRating(5);
            setReviewingMealId(null);

            await order.items.forEach((item: any) => {
                fetchMealReviews(item.mealId)
            })
        } catch (error: any) {
            console.log("Failed to create review :", error);

            setReviewError(
                error?.response?.data?.message ||
                "Failed to crete review"
            )
        } finally {
            setReviewLoading(false);
        }
    }


    useEffect(() => {
        if (!order?.items) return;
        order.items.forEach((item: any) => {
            fetchMealReviews(item.mealId)
        })
    }, [order])

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


                                    {myReview.some(
                                        (review => review.mealId === item.mealId)
                                    ) ? (
                                        <p className="mt-3 text-sm text-green-600 font-medium">
                                            ✓ You reviewed this meal
                                        </p>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setReviewingMealId(item.mealId);
                                                setReviewError("");
                                                setReviewSuccess("");
                                            }}
                                            className="mt-3 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                                        >
                                            Write Review
                                        </button>
                                    )}













                                    {/* review Form */}
                                    {reviewingMealId === item.mealId && (
                                        <div className="mt-4 border-t pt-4">
                                            <h4 className="font-semibold mb-3">
                                                Write a Review
                                            </h4>

                                            <div className="mb-3">
                                                <label className="block text-sm font-medium mb-1">
                                                    Rating
                                                </label>

                                                <select
                                                    value={rating}
                                                    onChange={(e) => setRating(Number(e.target.value))}
                                                    className="border rounded px-3 py-2 bg-black text-white"
                                                >
                                                    <option value={5}>5 - Excellent</option>
                                                    <option value={4}>4 - Good</option>
                                                    <option value={3}>3 - Average</option>
                                                    <option value={2}>2 - Poor</option>
                                                    <option value={1}>1 - Very Poor</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label className="block text-sm font-medium mb-1">
                                                    Comment
                                                </label>

                                                <textarea
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    placeholder="Write your review..."
                                                    rows={4}
                                                    className="w-full border rounded px-3 py-2"
                                                />
                                            </div>

                                            {reviewError && (
                                                <p className="text-sm text-red-500 mb-2">
                                                    {reviewError}
                                                </p>
                                            )}

                                            {reviewSuccess && (
                                                <p className="text-sm text-green-600 mb-2">
                                                    {reviewSuccess}
                                                </p>
                                            )}

                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={handleCreateReview}
                                                    disabled={reviewLoading}
                                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                                                >
                                                    {reviewLoading ? "Submitting..." : "Submit Review"}
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setReviewingMealId(null);
                                                        setReviewError("");
                                                        setReviewSuccess("");
                                                    }}
                                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    )}



                                    {/* customerReview */}
                                    {mealReviews[item.mealId]?.length > 0 && (
                                        <div className="mt-4 border-t pt-4">
                                            <h4 className="font-semibold mb-3">
                                                Customer Reviews
                                            </h4>

                                            <div className="space-y-3">
                                                {mealReviews[item.mealId].map((review: any) => (
                                                    <div
                                                        key={review.id}
                                                        className="border rounded p-3"
                                                    >
                                                        <p className="font-medium">
                                                            {review.user?.name || "Anonymous"}
                                                        </p>

                                                        <p className="text-yellow-500">
                                                            {"★".repeat(review.rating)}
                                                            {"☆".repeat(5 - review.rating)}
                                                        </p>

                                                        {review.comment && (
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                {review.comment}
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </main>
    );
}