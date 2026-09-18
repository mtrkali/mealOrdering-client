"use client"
import { reviewService } from "@/services/review.service";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";


export type reviewSectionProps = {
    meals: any[]
}
export default function ReviewSection({ meals }: reviewSectionProps) {
    const [reviews, setReviews] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false);


    const fetchReviews = async () => {
        try {
            setLoading(true);

            const reviewResult = await Promise.all(
                meals.map((meal) =>
                    reviewService.getMealReviews(meal.id))
            )

            const allReview = reviewResult.flatMap(
                (result) => result.data?.reviews || []
            )

            setReviews(allReview);
        } catch (error: any) {
            console.log("Failed to fetch provider review ", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (meals.length > 0) {
            fetchReviews();
        } else {
            setLoading(false);
        }
    }, [meals])
    return (
        <section className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">
                Customer Reviews
            </h2>

            <div className="rounded-2xl border bg-white p-6">

                {loading ? (
                    <p className="text-center text-gray-500">
                        Loading reviews...
                    </p>
                ) : reviews.length === 0 ? (
                    <div className="p-6 text-center">
                        <Star className="mx-auto h-12 w-12 text-yellow-500" />

                        <h3 className="mt-4 text-xl font-semibold text-gray-900">
                            No Reviews Yet
                        </h3>

                        <p className="mt-2 text-gray-500">
                            This provider hasn't received any reviews yet.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="border-b pb-5 last:border-b-0 last:pb-0"
                            >
                                <div className="flex items-center gap-3">
                                    {review.user?.image ? (
                                        <img
                                            src={review.user.image}
                                            alt={review.user?.name || "Customer"}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-sm font-semibold">
                                                {review.user?.name?.charAt(0) || "C"}
                                            </span>
                                        </div>
                                    )}

                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {review.user?.name || "Anonymous"}
                                        </p>

                                        <div className="flex items-center">
                                            <span className="text-yellow-500">
                                                {"★".repeat(review.rating)}
                                            </span>

                                            <span className="text-gray-300">
                                                {"★".repeat(5 - review.rating)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {review.comment && (
                                    <p className="mt-3 text-gray-600">
                                        {review.comment}
                                    </p>
                                )}

                                <p className="mt-2 text-xs text-gray-400">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}