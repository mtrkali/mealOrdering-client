"use client";

import { providerService } from "@/services/provider.service";
import { useEffect, useState } from "react";

type ProviderProfile = {
    id: string;
    businessName: string;
    phone: string;
    address: string;
    status: string;
    user: {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        image: string | null;
        status: string;
        role: string;
    };
};

export default function ProviderProfilePage() {
    const [profile, setProfile] = useState<ProviderProfile | null>(null);

    const [businessName, setBusinessName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError("");

                const result =
                    await providerService.getMyProviderProfile();

                console.log("My provider profile:", result);

                const data = result.data;

                setProfile(data);

                setBusinessName(data.businessName || "");
                setPhone(data.phone || "");
                setAddress(data.address || "");
            } catch (error: any) {
                console.log(
                    "Failed to load provider profile:",
                    error
                );

                setError(
                    error?.response?.data?.message ||
                    error?.response?.data?.error ||
                    "Failed to load provider profile."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleUpdate = async () => {
        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const result =
                await providerService.updateMyProviderProfile({
                    businessName,
                    phone,
                    address,
                });

            console.log("Updated provider profile:", result);

            setProfile(result.data);

            setBusinessName(result.data.businessName || "");
            setPhone(result.data.phone || "");
            setAddress(result.data.address || "");

            setEditing(false);
            setSuccess("Profile updated successfully.");
        } catch (error: any) {
            console.log(
                "Failed to update provider profile:",
                error
            );

            setError(
                error?.response?.data?.error ||
                error?.response?.data?.error ||
                "Failed to update provider profile."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (!profile) return;

        setBusinessName(profile.businessName || "");
        setPhone(profile.phone || "");
        setAddress(profile.address || "");

        setError("");
        setSuccess("");
        setEditing(false);
    };

    if (loading) {
        return (
            <main className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    Provider Profile
                </h1>

                <p className="mt-6 text-gray-500">
                    Loading profile...
                </p>
            </main>
        );
    }

    if (error && !profile) {
        return (
            <main className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    Provider Profile
                </h1>

                <p className="mt-6 text-red-500">
                    {error}
                </p>
            </main>
        );
    }

    if (!profile) {
        return null;
    }

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">
                        Provider Profile
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Manage your provider profile
                    </p>
                </div>

                {!editing && (
                    <button
                        onClick={() => {
                            setError("");
                            setSuccess("");
                            setEditing(true);
                        }}
                        className="px-5 py-2 border rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            {error && (
                <p className="mb-4 text-red-500">
                    {error}
                </p>
            )}

            {success && (
                <p className="mb-4 text-green-600">
                    {success}
                </p>
            )}

            <div className="border rounded-xl p-6 shadow-sm space-y-6">
                {/* Business Name */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Business Name
                    </label>

                    {editing ? (
                        <input
                            type="text"
                            value={businessName}
                            onChange={(e) =>
                                setBusinessName(e.target.value)
                            }
                            className="w-full border rounded-lg px-4 py-2"
                        />
                    ) : (
                        <p className="font-medium">
                            {profile.businessName}
                        </p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Phone
                    </label>

                    {editing ? (
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
                            }
                            className="w-full border rounded-lg px-4 py-2"
                        />
                    ) : (
                        <p className="font-medium">
                            {profile.phone}
                        </p>
                    )}
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Address
                    </label>

                    {editing ? (
                        <textarea
                            value={address}
                            onChange={(e) =>
                                setAddress(e.target.value)
                            }
                            rows={3}
                            className="w-full border rounded-lg px-4 py-2"
                        />
                    ) : (
                        <p className="font-medium">
                            {profile.address}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Email
                    </label>

                    <p className="font-medium">
                        {profile.user.email}
                    </p>
                </div>

                {/* Role */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Role
                    </label>

                    <p className="font-medium">
                        {profile.user.role}
                    </p>
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Profile Status
                    </label>

                    <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        {profile.status}
                    </span>
                </div>

                {/* Actions */}
                {editing && (
                    <div className="flex gap-3 pt-4 border-t">
                        <button
                            onClick={handleUpdate}
                            disabled={saving}
                            className="px-5 py-2 border hover:scale-102 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>

                        <button
                            onClick={handleCancel}
                            disabled={saving}
                            className="px-5 py-2 border rounded-lg border hover:bg-gray-100 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}