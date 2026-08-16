"use client";

import { ChangeEvent } from "react";
import { cuisines, dietaryOptions } from "../constants";
import { MealSearchFormProps } from "../types";



export default function MealSearchForm({
    value,
}: MealSearchFormProps) {
    const {
        setMinPrice,
        setMaxPrice,
        setCuisine,
        setDietary,
        fetchMeals,
        loading,
        dietary,
    } = value;

    const handleDietaryChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        if (checked) {
            setDietary((prev) => [...prev, value]);
        } else {
            setDietary((prev) => prev.filter((item) => item !== value));
        }
    };

    return (
        <div className="w-80 rounded-xl border bg-white/80 text-black shadow-xl p-5 space-y-5">
            <h2 className="text-lg font-semibold text-gray-800">
                Search Meals
            </h2>

            {/* Min Price */}
            <div>
                <label className="block text-sm font-medium mb-1">
                    Min Price
                </label>

                <input
                    type="number"
                    placeholder="0"
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="border rounded-sm p-1 w-full"
                />
            </div>

            {/* Max Price */}
            <div>
                <label className="block text-sm font-medium mb-1">
                    Max Price
                </label>

                <input
                    type="number"
                    placeholder="1000"
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="border rounded-sm p-1 w-full"
                />
            </div>

            {/* Cuisine */}
            <div>
                <label className="block text-sm font-medium mb-1">
                    Cuisine
                </label>

                <select
                    className="border p-1 rounded-sm w-full"
                    defaultValue=""
                    onChange={(e) => setCuisine(e.target.value)}
                >
                    <option value="">All</option>

                    {cuisines.map((item) => (
                        <option key={item} value={item}>
                            {item.replaceAll("_", " ")}
                        </option>
                    ))}
                </select>
            </div>

            {/* Dietary */}
            <div>
                <p className="text-sm font-medium mb-2">
                    Dietary Preferences
                </p>

                <div className="grid grid-cols-2 gap-2">
                    {dietaryOptions.map((item) => (
                        <label
                            key={item}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                value={item}
                                checked={dietary.includes(item)}
                                onChange={handleDietaryChange}
                                className="checkbox checkbox-success checkbox-sm"
                            />

                            <span className="text-sm">
                                {item.replaceAll("_", " ")}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Button */}
            <button
                onClick={fetchMeals}
                disabled={loading}
                className="border rounded border-outline w-full shadow-lg hover:scale-105 transition-transform duration-300"
            >
                {loading ? "Searching..." : "Search Meals"}
            </button>
        </div>
    );
}