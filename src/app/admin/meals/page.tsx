"use client";

import { cuisines, dietaryOptions } from "@/app/provider/constants";
import { mealService } from "@/services/meal.service";
import { useEffect, useState } from "react";

type Meal = {
    id: string;
    title: string;
    image?: string;
    description?: string;
    price: number;
    cuisine: string;
    dietary: string[];
    category?: {
        id: string;
        name: string;
    } | null;
    provider?: {
        id: string;
        businessName: string;
        phone?: string;
    };
};

export default function AdminMealsPage() {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingMealId, setDeletingMealId] = useState<string | null>(
        null
    );

    const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
    const [updatingMeal, setUpdatingMeal] = useState(false);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await mealService.getAllMeals();

                console.log("Admin meals:", result);

                setMeals(result.data || []);
            } catch (error: any) {
                console.log("Failed to fetch meals:", error);

                setError(
                    error?.response?.data?.message ||
                    "Failed to load meals."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, []);

    const handleDeleteMeal = async (mealId: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this meal?"
        );

        if (!confirmed) return;

        try {
            setDeletingMealId(mealId);
            setError("");

            await mealService.adminDeleteMeal(mealId);

            setMeals((previousMeals) =>
                previousMeals.filter((meal) => meal.id !== mealId)
            );
        } catch (error: any) {
            console.log("Failed to delete meal:", error);

            setError(
                error?.response?.data?.message ||
                "Failed to delete meal."
            );
        } finally {
            setDeletingMealId(null);
        }
    };


    const handleUpdateMeal = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!editingMeal) return;

        try {
            setUpdatingMeal(true);
            setError("");

            const formData = new FormData(event.currentTarget);

            const updatedData = {
                title: formData.get("title"),
                price: Number(formData.get("price")),
                image: formData.get("image"),
                cuisine: formData.get("cuisine"),
                dietary: formData.getAll("dietary"),
                description: formData.get("description"),
            };

            const result = await mealService.adminUpdateMeal(
                editingMeal.id,
                updatedData
            );

            console.log("Updated meal:", result);

            setMeals((previousMeals) =>
                previousMeals.map((meal) =>
                    meal.id === editingMeal.id
                        ? {
                            ...meal,
                            ...result.data,
                        }
                        : meal
                )
            );

            setEditingMeal(null);
        } catch (error: any) {
            console.log("Failed to update meal:", error);

            setError(
                error?.response?.data?.message ||
                "Failed to update meal."
            );
        } finally {
            setUpdatingMeal(false);
        }
    };


    const handleDietaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setEditingMeal({})
        } else {
            setEditingMeal({})
        }
    }

    if (loading) {
        return (
            <main className="p-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold">
                        Manage Meals
                    </h1>

                    <p className="mt-4 text-black">
                        Loading meals...
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="p-4 md:p-6 relative">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Manage Meals
                    </h1>

                    <p className="text-black mt-1">
                        View and manage all meals from providers.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600">
                        {error}
                    </div>
                )}

                {/* Empty state */}
                {meals.length === 0 ? (
                    <div className="rounded-xl border bg-white p-8 text-center">
                        <p className="text-black">
                            No meals found.
                        </p>
                    </div>
                ) : (
                    <div className={`${editingMeal ? "opacity-0" : "overflow-x-auto rounded-xl border bg-white"}`}>
                        <table className="w-full min-w-[1000px]">
                            <thead className="border-b text-black">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">
                                        Meal
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-semibold">
                                        Price
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-semibold">
                                        Cuisine
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-semibold">
                                        Dietary
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-semibold">
                                        Category
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-semibold">
                                        Provider
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-semibold">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y text-black">
                                {meals.map((meal) => (
                                    <tr key={meal.id} className="hover:scale-102 border rounded transition">
                                        {/* Meal */}
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                {meal.image ? (
                                                    <img
                                                        src={meal.image}
                                                        alt={meal.title}
                                                        className="h-14 w-14 rounded-lg object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-14 w-14 rounded-lg bg-gray-200 flex items-center justify-center text-xs text-black">
                                                        No Image
                                                    </div>
                                                )}

                                                <div>
                                                    <p className="font-medium">
                                                        {meal.title}
                                                    </p>

                                                    <p className="text-xs text-black">
                                                        {meal.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Price */}
                                        <td className="px-4 py-4 font-medium">
                                            ৳{meal.price.toFixed(2)}
                                        </td>

                                        {/* Cuisine */}
                                        <td className="px-4 py-4">
                                            {meal.cuisine}
                                        </td>

                                        {/* Dietary */}
                                        <td className="px-4 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {meal.dietary?.length ? (
                                                    meal.dietary.map(
                                                        (item) => (
                                                            <span
                                                                key={item}
                                                                className="rounded-full bg-gray-100 px-2 py-1 text-xs"
                                                            >
                                                                {item}
                                                            </span>
                                                        )
                                                    )
                                                ) : (
                                                    <span className="text-black">
                                                        —
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td className="px-4 py-4">
                                            {meal.category?.name || "—"}
                                        </td>

                                        {/* Provider */}
                                        <td className="px-4 py-4">
                                            <p className="font-medium">
                                                {meal.provider?.businessName ||
                                                    "—"}
                                            </p>

                                            <p className="text-xs text-black">
                                                {meal.provider?.phone || ""}
                                            </p>
                                        </td>

                                        {/* Action */}
                                        <td className="px-4 py-4 flex gap-1">
                                            <button
                                                type="button"
                                                onClick={() => setEditingMeal(meal)}
                                                className="mr-2 rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDeleteMeal(
                                                        meal.id
                                                    )
                                                }
                                                disabled={
                                                    deletingMealId ===
                                                    meal.id
                                                }
                                                className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {deletingMealId === meal.id
                                                    ? "Deleting..."
                                                    : "Delete"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>





















            {editingMeal && (
                <div className="fixed inset-0 z-50 absolute flex items-center justify-center text-black px-4">
                    <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-bold">
                                Edit Meal
                            </h2>

                            <button
                                type="button"
                                onClick={() => setEditingMeal(null)}
                                className="text-gray-500 hover:text-gray-800"
                            >
                                ✕
                            </button>
                        </div>

                        <form
                            onSubmit={handleUpdateMeal}
                            className="space-y-4"
                        >
                            {/* Title */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Meal Title
                                </label>

                                <input
                                    name="title"
                                    defaultValue={editingMeal.title}
                                    required
                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* image */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Meal Image
                                </label>

                                <input
                                    name="image"
                                    defaultValue={editingMeal.image}
                                    required
                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* dietary */}
                            <div>
                                <label htmlFor="" className="mb-2 block text-sm font-medium">Dietary</label>

                                <div className="grid grid-cols-2 gap-2 border rounded-lg p-4">
                                    {dietaryOptions.map((item, index) => (
                                        <label key={index} htmlFor="" className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                name="dietary"
                                                value={item}
                                                defaultChecked={editingMeal.dietary?.includes(item)}
                                            />
                                            <span className="text-sm">{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Price
                                </label>

                                <input
                                    name="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    defaultValue={editingMeal.price}
                                    required
                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Cuisine */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Cuisine
                                </label>

                                <select
                                    name="cuisine"
                                    defaultValue={editingMeal.cuisine}
                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500"
                                >
                                    {cuisines.map((cuisine: string, index: number) => (
                                        <option key={index} value={cuisine}>
                                            {cuisine}
                                        </option>
                                    ))}

                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    rows={4}
                                    defaultValue={
                                        editingMeal.description || ""
                                    }
                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setEditingMeal(null)
                                    }
                                    className="rounded-lg border px-4 py-2"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={updatingMeal}
                                    className="rounded-lg border bg-blue-400 px-4 py-2 text-black hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 "
                                >
                                    {updatingMeal
                                        ? "Updating..."
                                        : "Update Meal"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}