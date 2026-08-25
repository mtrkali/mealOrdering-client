"use client";

import { mealService } from "@/services/meal.service";
import { useEffect, useState } from "react";

export const cuisines = [
    "BANGLADESHI",
    "INDIAN",
    "CHINESE",
    "ITALIAN",
    "MEXICAN",
    "THAI",
    "JAPANESE"
]

export default function ProviderMealsPage() {
    const [meals, setMeals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [edditingMeal, setEdditingMeal] = useState<any>(null);
    const [updatingMeal, setUpdatingMeal] = useState(false);
    const [creatingMeal, setCreatingMeal] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newMeal, setNewMeal] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
        cuisine: "BANGLADESHI",
        dietary: [] as string[],
        categoryId: "",
    })
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

    const handleCreatMeal = async () => {
        try {
            setCreatingMeal(true);
            setError("");

            if (!newMeal.title.trim()) {
                setError("Meal title required");
                return;
            }

            if (!newMeal.price || Number(newMeal.price) < 0) {
                setError("Valid Meal price required")
                return;
            }
            if (!newMeal.categoryId) {
                setError("meal categoryId required");
                return;
            }

            const result = await mealService.createMeal({
                ...newMeal, price: Number(newMeal.price),
            })

            console.log("created meal ", result);
            setMeals(prev => [
                result.data,
                ...prev
            ]
            )

            setNewMeal({
                title: "",
                price: "",
                description: "",
                image: "",
                cuisine: "BANGLADESHI",
                dietary: [],
                categoryId: "",
            })

            setShowCreateForm(false);

        } catch (error: any) {
            console.log("Failed to create meal:", error);

            setError(
                error?.response?.data?.message ||
                "Failed to create meal."
            );
        } finally {
            setCreatingMeal(false);
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
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    My Meals
                </h1>

                <button
                    type="button"
                    onClick={() => setShowCreateForm(true)}
                    className="px-4 py-2 rounded text-white bg-green-500 hover:bg-green-600">
                    + Add Meal
                </button>
            </div>


            <p className="mt-2 text-gray-500">
                Total Meals: {meals.length}
            </p>





            {/* create Form */}
            {showCreateForm && (
                <div className="border rounded-lg mt-6 p-6">
                    <h2 className="text-xl font-bold">Create new Meal</h2>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Meal Title</label>

                            <input
                                type="text"
                                value={newMeal.title}
                                onChange={(e) => setNewMeal({
                                    ...newMeal, title: e.target.value,
                                })
                                }
                                className="mt-1 border rounded w-full px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Meal Price</label>

                            <input
                                type="text"
                                value={newMeal.price}
                                onChange={(e) => setNewMeal({
                                    ...newMeal, price: e.target.value,
                                })
                                }
                                className="mt-1 border rounded w-full px-3 py-2"
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium">Meal CategoryId</label>

                            <input
                                type="text"
                                value={newMeal.categoryId}
                                onChange={(e) => setNewMeal({
                                    ...newMeal, categoryId: e.target.value,
                                })
                                }
                                className="mt-1 border rounded w-full px-3 py-2"
                                placeholder="Enter meal categoryId"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Meal Image</label>

                            <input
                                type="text"
                                value={newMeal.image}
                                onChange={(e) => setNewMeal({
                                    ...newMeal, image: e.target.value,
                                })
                                }
                                className="mt-1 border rounded w-full px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Meal Cuisine</label>

                            <select
                                value={newMeal.cuisine}
                                onChange={(e) => setNewMeal({
                                    ...newMeal, cuisine: e.target.value,
                                })
                                }
                                className="mt-1 border rounded w-full px-3 py-2"
                            >
                                {cuisines.map((cuisine, index) => (
                                    <option key={index} value={cuisine} className="bg-black">{cuisine}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Meal Description</label>

                            <textarea
                                value={newMeal.description}
                                onChange={(e) => setNewMeal({
                                    ...newMeal, description: e.target.value,
                                })
                                }
                                className="mt-1 border rounded w-full px-3 py-2"
                                rows={3}
                            />
                        </div>

                        <div className="mt-6 flex gap-2">
                            <button
                                type="button"
                                onClick={() => setShowCreateForm(false)}
                                className="px-3 py-1 rounded text-white bg-gray-400">
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleCreatMeal}
                                disabled={creatingMeal}
                                className={`px-4 py-2 rounded text-white ${creatingMeal
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-500 hover:bg-green-600"
                                    }`}>
                                {creatingMeal ? "Creating..." : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}








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