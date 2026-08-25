"use client";

import { mealService } from "@/services/meal.service";
import { useEffect, useState } from "react";

export default function ProviderMealsPage() {
    const [meals, setMeals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [edditingMeal, setEdditingMeal] = useState<any>(null);
    const [updatingMeal, setUpdatingMeal] = useState(false);
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

    const handleDelete = async (mealId: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this meal"
        )
        if (!confirmed) return
        try {
            setError("");
            await mealService.deleteMeal(mealId);

            setMeals((prev) =>
                prev.filter((meal) => meal.id !== mealId)
            );

        } catch (error: any) {
            console.log("Failed to delete meal", error)

            setError(
                error?.response?.data?.message ||
                "Failed to delete meal"
            )
        }
    }

    const updateMeal = async () => {
        if (!edditingMeal) return;
        try {
            setUpdatingMeal(true);
            setError("");

            const result = await mealService.updateMeal(
                edditingMeal.id,
                {
                    title: edditingMeal.title,
                    price: Number(edditingMeal.price),
                    description: edditingMeal.description,
                    image: edditingMeal.image,
                    cuisine: edditingMeal.cuisine,
                    dietary: edditingMeal.dietary,
                    categoryId: edditingMeal.categoryId,
                }
            )
            console.log("Updating meals : ", result);
            setMeals((prev) =>
                prev.map((meal) => meal.id === edditingMeal.id
                    ? { ...meal, ...result.data }
                    : meal))
            setEdditingMeal(null);
        } catch (error: any) {
            console.log("Failed to update meal", error);

            setError(
                error?.response?.data?.message ||
                "Failed to update meal"
            )
        } finally {
            setUpdatingMeal(false);
        }
    }

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

                                <th className="border p-3 text-left">
                                    Actions
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

                                    <td className="border p-3">
                                        <button
                                            type="button"
                                            onClick={() => setEdditingMeal({ ...meal })}
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Eddit
                                        </button>


                                        <button
                                            type="button"
                                            onClick={() => handleDelete(meal.id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}











            {edditingMeal && (
                <div className="fixed inset-0 z-50 bg-black-70 flex justify-center items-center p-4">
                    <div className="bg-white rounded-lg max-w-lg w-full p-6">
                        <h2 className="text-2xl font-bold">
                            Edit Meal
                        </h2>

                        <div className="mt-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Meal Title</label>

                                <input
                                    type="text"
                                    value={edditingMeal.title || ""}
                                    onChange={(e) =>
                                        setEdditingMeal({ ...edditingMeal, title: e.target.value })
                                    }
                                    className="mt-1 w-full border rounded px-3 py-2"
                                />
                            </div>


                            <div>
                                <label className="block text-sm font-medium">Price</label>

                                <input
                                    type="number"
                                    value={edditingMeal.price || ""}
                                    onChange={(e) =>
                                        setEdditingMeal({ ...edditingMeal, price: e.target.value })
                                    }
                                    className="mt-1 w-full border rounded px-3 py-2"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Description</label>

                            <textarea
                                value={edditingMeal.description || ""}
                                onChange={(e) =>
                                    setEdditingMeal({ ...edditingMeal, description: e.target.value })
                                }
                                className="mt-1 w-full border rounded px-3 py-2"
                                rows={3}
                            />
                        </div>

                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setEdditingMeal(null)}
                                disabled={updatingMeal}
                                className="px-4 py-2 text-white rounded bg-gray-500 hover:bg-gray-600">
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={updateMeal}
                                disabled={updatingMeal}
                                className={`px-4 py-2 rounded text-white${updatingMeal
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600"
                                    }`}>
                                {updatingMeal ? "Updating..." : "Update Meal"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}