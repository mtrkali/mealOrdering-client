"use client";

import { mealService } from "@/services/meal.service";
import { useEffect, useState } from "react";

export default function ProviderMealsPage() {
    const [meals, setMeals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMyMeals = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await mealService.getMyMeals();

                console.log("My meals:", result);

                setMeals(result.meals || []);
            } catch (error: any) {
                console.log("Failed to fetch my meals:", error);

                setError(
                    error?.response?.data?.message ||
                    "Failed to load meals."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMyMeals();
    }, []);

    if (loading) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    My Meals
                </h1>

                <p className="mt-6 text-gray-500">
                    Loading meals...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    My Meals
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
                My Meals
            </h1>

            <p className="mt-2 text-gray-500">
                Total Meals: {meals.length}
            </p>

            {meals.length === 0 ? (
                <p className="mt-6 text-gray-500">
                    You have no meals yet.
                </p>
            ) : (
                <div className="mt-6 overflow-x-auto">
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="border p-3 text-left">
                                    Meal
                                </th>

                                <th className="border p-3 text-left">
                                    Price
                                </th>

                                <th className="border p-3 text-left">
                                    Cuisine
                                </th>

                                <th className="border p-3 text-left">
                                    Category
                                </th>

                                <th className="border p-3 text-left">
                                    Created
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {meals.map((meal) => (
                                <tr key={meal.id}>
                                    <td className="border p-3">
                                        {meal.title}
                                    </td>

                                    <td className="border p-3">
                                        ৳{meal.price?.toFixed(2)}
                                    </td>

                                    <td className="border p-3">
                                        {meal.cuisine}
                                    </td>

                                    <td className="border p-3">
                                        {meal.category?.name || "N/A"}
                                    </td>

                                    <td className="border p-3">
                                        {new Date(
                                            meal.createdAt
                                        ).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
}