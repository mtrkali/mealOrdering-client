"use client";

import { providerApplicationService } from "@/services/providerApplication.service";
import { useEffect, useState } from "react";

export default function AdminProviderApplicationsPage() {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                setError("");

                const result =
                    await providerApplicationService.getAllProviderApplications();

                console.log("Provider applications:", result);

                setApplications(result.data || []);
            } catch (error: any) {
                console.log(
                    "Failed to fetch provider applications:",
                    error
                );

                setError(
                    error?.response?.data?.message ||
                    "Failed to load provider applications."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    if (loading) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    Provider Applications
                </h1>

                <p className="mt-6 text-gray-500">
                    Loading applications...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    Provider Applications
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
                Provider Applications
            </h1>

            <p className="mt-2 text-gray-500">
                Total Applications: {applications.length}
            </p>

            {applications.length === 0 ? (
                <p className="mt-6 text-gray-500">
                    No provider applications found.
                </p>
            ) : (
                <div className="mt-6 overflow-x-auto">
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="border p-3 text-left">
                                    Applicant
                                </th>

                                <th className="border p-3 text-left">
                                    Email
                                </th>

                                <th className="border p-3 text-left">
                                    Business Name
                                </th>

                                <th className="border p-3 text-left">
                                    Phone
                                </th>

                                <th className="border p-3 text-left">
                                    Address
                                </th>

                                <th className="border p-3 text-left">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {applications.map((application) => (
                                <tr key={application.id}>
                                    <td className="border p-3">
                                        {application.user?.name || "N/A"}
                                    </td>

                                    <td className="border p-3">
                                        {application.user?.email || "N/A"}
                                    </td>

                                    <td className="border p-3">
                                        {application.businessName}
                                    </td>

                                    <td className="border p-3">
                                        {application.phone}
                                    </td>

                                    <td className="border p-3">
                                        {application.address}
                                    </td>

                                    <td className="border p-3">
                                        {application.status}
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