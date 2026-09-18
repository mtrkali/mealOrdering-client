"use client";

import { categoryService } from "@/services/category.service";
import { useEffect, useState } from "react";

type Category = {
    id: string;
    name: string;
};

export default function AdminCategoryPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [categoryName, setCategoryName] = useState("");
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState("");
    const [createSuccess, setCreateSuccess] = useState("");

    const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
    const [editingCategoryName, setEditingCategoryName] = useState("");
    const [updating, setUpdating] = useState(false);
    const [updateError, setUpdateError] = useState("");

    const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);
    const [deleteError, setDeleteError] = useState("");

    const fetchCategories = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await categoryService.getAllCategories();

            setCategories(result.data || []);
        } catch (error: any) {
            console.log("Failed to fetch categories:", error);

            setError(
                error?.response?.data?.message ||
                "Failed to fetch categories"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    const handleCreateCategory = async () => {
        const name = categoryName.trim();

        if (!name) {
            setCreateError("Category name is required");
            return;
        }

        try {
            setCreating(true);
            setCreateError("");
            setCreateSuccess("");

            await categoryService.createCategory(name);

            setCategoryName("");
            setCreateSuccess("Category created successfully");

            await fetchCategories();
        } catch (error: any) {
            console.log("Failed to create category:", error);

            setCreateError(
                error?.response?.data?.message ||
                "Failed to create category"
            );
        } finally {
            setCreating(false);
        }
    };


    const handleUpdateCategory = async () => {
        if (!editingCategoryId) return;

        const name = editingCategoryName.trim();

        if (!name) {
            setUpdateError("Category name is required");
            return;
        }

        try {
            setUpdating(true);
            setUpdateError("");

            await categoryService.updateCategory(
                editingCategoryId,
                name
            );

            setEditingCategoryId(null);
            setEditingCategoryName("");

            await fetchCategories();
        } catch (error: any) {
            console.log("Failed to update category:", error);

            setUpdateError(
                error?.response?.data?.message ||
                "Failed to update category"
            );
        } finally {
            setUpdating(false);
        }
    };

    const handleEditCategory = (category: Category) => {
        setEditingCategoryId(category.id);
        setEditingCategoryName(category.name);
        setUpdateError("");
        setCreateSuccess("");
        setCreateError("");
    };

    const handleDeleteCategory = async (category: Category) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${category.name}"?`
        );

        if (!confirmed) return;

        try {
            setDeletingCategoryId(category.id);
            setDeleteError("");

            await categoryService.deleteCategory(category.id);

            await fetchCategories();
        } catch (error: any) {
            console.log("Failed to delete category:", error);

            setDeleteError(
                error?.response?.data?.message ||
                "Failed to delete category"
            );
        } finally {
            setDeletingCategoryId(null);
        }
    };
    return (
        <section className="p-6 text-black">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Category Management
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage meal categories from here.
                </p>
            </div>

            <div className="mb-8 rounded-xl border bg-white p-5">
                <h2 className="text-xl font-semibold">
                    Create Category
                </h2>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Enter category name"
                        className="flex-1 rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
                    />

                    <button
                        type="button"
                        onClick={handleCreateCategory}
                        disabled={creating}
                        className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {creating ? "Creating..." : "Create Category"}
                    </button>
                </div>

                {createError && (
                    <p className="mt-3 text-sm text-red-600">
                        {createError}
                    </p>
                )}

                {createSuccess && (
                    <p className="mt-3 text-sm text-green-600">
                        {createSuccess}
                    </p>
                )}
            </div>

            {loading ? (
                <div className="rounded-xl border bg-white p-8 text-center">
                    <p className="text-gray-500">
                        Loading categories...
                    </p>
                </div>
            ) : error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                    <p className="text-red-600">{error}</p>
                </div>
            ) : (
                <div className="rounded-xl border bg-white">
                    <div className="border-b p-5">
                        <h2 className="text-xl font-semibold">
                            All Categories
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Total categories: {categories.length}
                        </p>
                    </div>

                    {deleteError && (
                        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
                            <p className="text-sm text-red-600">
                                {deleteError}
                            </p>
                        </div>
                    )}

                    {categories.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-500">
                                No categories found.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-gray-50 text-left">
                                        <th className="px-5 py-4 font-semibold">
                                            #
                                        </th>

                                        <th className="px-5 py-4 font-semibold">
                                            Category Name
                                        </th>

                                        <th className="px-5 py-4 font-semibold">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {categories.map(
                                        (category, index) => (
                                            <tr
                                                key={category.id}
                                                className="border-b last:border-b-0"
                                            >
                                                <td className="px-5 py-4">
                                                    {index + 1}
                                                </td>

                                                <td className="px-5 py-4 font-medium">
                                                    {editingCategoryId === category.id ? (
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={editingCategoryName}
                                                                onChange={(e) =>
                                                                    setEditingCategoryName(e.target.value)
                                                                }
                                                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500"
                                                            />

                                                            {updateError &&
                                                                editingCategoryId === category.id && (
                                                                    <p className="mt-2 text-sm text-red-600">
                                                                        {updateError}
                                                                    </p>
                                                                )}
                                                        </div>
                                                    ) : (
                                                        category.name
                                                    )}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex gap-2 text-black">
                                                        {editingCategoryId === category.id ? (
                                                            <>
                                                                <button
                                                                    type="button"
                                                                    onClick={handleUpdateCategory}
                                                                    disabled={updating}
                                                                    className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                                >
                                                                    {updating ? "Saving..." : "Save"}
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setEditingCategoryId(null);
                                                                        setEditingCategoryName("");
                                                                        setUpdateError("");
                                                                    }}
                                                                    disabled={updating}
                                                                    className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleEditCategory(category)
                                                                    }
                                                                    className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                                                >
                                                                    Edit
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleDeleteCategory(category)
                                                                    }
                                                                    disabled={deletingCategoryId === category.id}
                                                                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                                >
                                                                    {deletingCategoryId === category.id
                                                                        ? "Deleting..."
                                                                        : "Delete"}
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}   