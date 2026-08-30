"use client";

import { userService } from "@/services/user.service";
import { useEffect, useState } from "react";

type Profile = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    image?: string;
    role: string;
    status: string;
};

export default function AdminProfilePage() {
    const [profile, setProfile] = useState<Profile | null>(null);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await userService.getMyProfile();

                console.log("Admin profile:", result);

                const user = result.data;

                setProfile(user);
                setName(user.name || "");
                setPhone(user.phone || "");
                setImage(user.image || "");
            } catch (error: any) {
                console.log("Failed to fetch admin profile:", error);

                setError(
                    error?.response?.data?.message ||
                    "Failed to load profile."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const result = await userService.updateMyProfile({
                name: name.trim(),
                phone: phone.trim(),
                image: image.trim(),
            });

            console.log("Updated admin profile:", result);

            setProfile(result.data);

            setSuccess("Profile updated successfully.");
        } catch (error: any) {
            console.log("Failed to update admin profile:", error);

            setError(
                error?.response?.data?.message ||
                "Failed to update profile."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <main className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    Admin Profile
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
                    Admin Profile
                </h1>

                <p className="mt-6 text-red-500">
                    {error}
                </p>
            </main>
        );
    }

    if (!profile) return null;

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Admin Profile
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage your account information.
                </p>
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

            <div className="border rounded-xl p-6 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2"
                            required
                        />
                    </div>

                    {/* Email - Read Only */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            value={profile.email}
                            disabled
                            className="w-full border rounded-lg px-4 py-2 bg-black cursor-not-allowed"
                        />

                        <p className="mt-1 text-sm text-gray-500">
                            Email cannot be changed from profile settings.
                        </p>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Phone
                        </label>

                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter phone number"
                            className="w-full border rounded-lg px-4 py-2"
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Profile Image URL
                        </label>

                        <input
                            type="url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="w-full border rounded-lg px-4 py-2"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Role
                        </label>

                        <input
                            type="text"
                            value={profile.role}
                            disabled
                            className="w-full border rounded-lg px-4 py-2 bg-black cursor-not-allowed"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Status
                        </label>

                        <input
                            type="text"
                            value={profile.status}
                            disabled
                            className="w-full border rounded-lg px-4 py-2 bg-black cursor-not-allowed"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={saving}
                        className={`px-5 py-2 rounded-lg text-white ${saving
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600"
                            }`}
                    >
                        {saving ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </main>
    );
}