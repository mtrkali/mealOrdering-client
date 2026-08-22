"use client";


import { userService } from "@/services/user.service";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [updatingUserId, setUpdatingUserId] = useState<string | null>(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionError, setActionError] = useState("");


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await userService.getAllUsers();

                console.log("Admin users:", result);

                setUsers(result.data || []);
            } catch (error: any) {
                console.log("Failed to fetch users:", error);

                setError(
                    error?.response?.data?.message ||
                    "Failed to load users."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleToggleStatus = async (
        userId: string,
        currentStatus: string
    ) => {
        try {
            setActionError("");
            setUpdatingUserId(userId);

            const newStatus =
                currentStatus === "INACTIVE"
                    ? "ACTIVE"
                    : "INACTIVE"

            await userService.updateUser(userId, {
                status: newStatus,
            });

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId
                        ? { ...user, status: newStatus }
                        : user
                )
            );
        } catch (error: any) {
            console.log("Failed to update user status:", error);

            setActionError(
                error?.response?.data?.message ||
                "Failed to update user status."
            )
        } finally {
            setUpdatingUserId(null);
        }
    }

    const handleDeleteUser = async (userId: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) return;

        try {
            setActionError("");
            setUpdatingUserId(userId);
            await userService.deleteUser(userId);
            setUsers((prevUsers) =>
                prevUsers.filter((user) => user.id !== userId)
            );
        } catch (error: any) {
            console.log("Failed to delete user: ", error);

            setActionError(
                error?.response?.data?.message ||
                "Failed to delete user."
            );
        } finally {
            setUpdatingUserId(null);
        }
    }
    if (loading) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    Manage Users
                </h1>

                <p className="mt-6 text-gray-500">
                    Loading users...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    Manage Users
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
                Manage Users
            </h1>

            <p className="mt-2 text-gray-500">
                Total Users: {users.length}
            </p>

            {actionError &&
                <p className="mt-4 text-red-500">{actionError}</p>
            }

            <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-blue-500">
                            <th className="border p-3 text-left">
                                Name
                            </th>

                            <th className="border p-3 text-left">
                                Email
                            </th>

                            <th className="border p-3 text-left">
                                Role
                            </th>

                            <th className="border p-3 text-left">
                                Status
                            </th>

                            <th className="border p-3 text-left">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border p-3">
                                    {user.name}
                                </td>

                                <td className="border p-3">
                                    {user.email}
                                </td>

                                <td className="border p-3">
                                    {user.role}
                                </td>

                                <td className="border p-3">
                                    {user.status}
                                </td>

                                <td className="border p-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleToggleStatus(user.id, user.status)
                                        }
                                        disabled={updatingUserId === user.id}
                                        className={`px-3 py-1 rounded text-white ${user.status === "INACTIVE"
                                            ? "bg-green-500 hover:bg-green-600"
                                            : "bg-red-500 hover:bg-red-600"
                                            } ${updatingUserId === user.id
                                                ? "cursor-not-allowed bg-gray-400"
                                                : ""
                                            }`}>
                                        {
                                            updatingUserId === user.id
                                                ? "Updating..."
                                                : user.status === "INACTIVE"
                                                    ? "Activate"
                                                    : "Deactivate"
                                        }
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleDeleteUser(user.id)}
                                        disabled={updatingUserId === user.id}
                                        className={`ml-2 px-3 py-1 rounded text-white ${updatingUserId === user.id
                                            ? "cursor-not-allowed bg-gray-400"
                                            : "bg-red-500 hover:bg-red-700"
                                            }`}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}