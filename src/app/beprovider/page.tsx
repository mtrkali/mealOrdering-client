"use client";

import { providerAppService } from "@/services/providerApp.service";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BeProviderPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [application, setApplication] = useState<any>(null);
    const [checkingApplication, setCheckingApplication] = useState(true);

    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        if (authLoading || !user) return;

        const checkApplication = async () => {
            try {
                setCheckingApplication(true);

                const result =
                    await providerAppService.getMyProviderApplication();
                setApplication(result?.data || null)
            } catch (error: any) {
                console.log(
                    "Failed to check provider application:",
                    error
                );

                setError(
                    error?.response?.data?.message ||
                    "Failed to check application status."
                );
            } finally {
                setCheckingApplication(false)
            }
        }
        checkApplication();
    }, [authLoading, router])



    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            setLoading(true);
            setMessage("");
            setError("");

            const formData = new FormData(event.currentTarget);

            const data = {
                businessName: String(formData.get("businessName") || ""),
                phone: String(formData.get("phone") || ""),
                address: String(formData.get("address") || ""),
            };

            const result =
                await providerAppService.createProviderApplication(data);

            setMessage(
                result?.message ||
                "Your provider application has been submitted successfully!"
            );

            event.currentTarget.reset();
        } catch (error: any) {
            console.log("Provider application error:", error);

            setError(
                error?.response?.data?.details ||
                error?.response?.data?.message ||
                "Failed to submit provider application."
            );
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || !user || user.role !== "CUSTOMER") {
        return null;
    }

    if (checkingApplication) {
        <main className="min-h-screen flex items-center justifycenter">
            <p>Checking your application....</p>
        </main>
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-xl border rounded-xl p-6">
                <h1 className="text-2xl font-bold">
                    Become a Provider
                </h1>

                <p className="mt-2 text-gray-600">
                    Submit your business information to become a FoodHub
                    provider.
                </p>

                {application?.status === "PENDING" && (
                    <div className="mt-6 rounded-lg border p-4">
                        <h2 className="text-xl font-semibold">
                            Application Pending
                        </h2>

                        <p className="mt-2 text-gray-600">
                            Your provider application is currently under review.
                            Please wait for admin approval.
                        </p>
                    </div>
                )}

                {application?.status === "APPROVED" && (
                    <div className="mt-6 rounded-lg border p-4">
                        <h2 className="text-xl font-semibold">
                            You are already a Provider
                        </h2>

                        <p className="mt-2 text-gray-600">
                            Your provider application has already been approved.
                        </p>
                    </div>
                )}

                {!application && (
                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 space-y-4"
                    >
                        <div>
                            <label className="block text-sm font-medium">
                                Business Name
                            </label>

                            <input
                                name="businessName"
                                type="text"
                                required
                                className="mt-1 w-full border rounded-lg px-3 py-2"
                                placeholder="Enter your business name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">
                                Phone
                            </label>

                            <input
                                name="phone"
                                type="tel"
                                required
                                className="mt-1 w-full border rounded-lg px-3 py-2"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">
                                Address
                            </label>

                            <textarea
                                name="address"
                                required
                                rows={4}
                                className="mt-1 w-full border rounded-lg px-3 py-2"
                                placeholder="Enter your business address"
                            />
                        </div>

                        {message && (
                            <p className="text-green-600">
                                {message}
                            </p>
                        )}

                        {error && (
                            <p className="text-red-600">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
                        >
                            {loading
                                ? "Submitting..."
                                : "Apply to Become a Provider"}
                        </button>
                    </form>
                )}
            </div>
        </main>
    );
}