"use client";


import { userService } from "@/services/user.service";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await userService.getAllUsers();

                console.log("Admin users:", result);

                setUsers(result.data?.data || []);
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

            <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-100">
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}