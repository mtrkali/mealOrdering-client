"use client";

import { imageService } from "@/services/image.service";
import { userService } from "@/services/user.service";
import { useEffect, useState } from "react";

type UserProfile = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    image?: string;
    role: string;
    status: string;
    createdAt: string;
}

export default function ProfilePage() {
    const [user, setUser] = useState<UserProfile | null>(null);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError("");
                const result = await userService.getMyProfile();
                const profile = result.data;
                setUser(profile);
                setName(profile.name || "");
                setPhone(profile.phone || "");
            } catch (error: any) {
                console.log("Failed to fetch profile:", error);
                setError(
                    error?.response?.data?.error ||
                    "Failed to fetch your profile."
                )
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [])

    const handleUpdateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setUpdating(true);
            setError("");
            setSuccess("");

            const result = await userService.updateMyProfile({ name, phone });
            setUser(result.data);
            setName(result.data.name || "");
            setPhone(result.data.phone || "");
            setSuccess("Profile updated successfully.");
        } catch (error: any) {
            console.log("Failed to update profile");

            setError(
                error?.response?.data?.message ||
                "Failed to update your profile."
            )
        } finally {
            setUpdating(false);
        }
    }

    const handleImageUpload = async () => {
        if (!selectedImage) {
            setError("Please select an image first.");
            return;
        }

        try {
            setUploadingImage(true);
            setError("");
            setSuccess("");

            const imageUrl = await imageService.uploadImageToImgBB(selectedImage);
            setSuccess("Image uploaded successfully.");
            console.log("Image URL:", imageUrl);
        } catch (error: any) {
            console.log("Failed to upload image: ", error);

            setError(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to upload your profile image."
            )
        } finally {
            setUploadingImage(false);
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading profile...</p>
            </main>
        );
    }

    if (error && !user) {
        return (
            <main className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <p className="text-red-500">{error}</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-black">
                            My Profile
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage your personal information.
                        </p>
                    </div>

                    {/* Profile Image */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4">
                            {user?.image ? (
                                <img
                                    src={user.image}
                                    alt={user.name}
                                    className="w-20 h-20 rounded-full object-cover border"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500">
                                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                </div>
                            )}

                            <div>
                                <h2 className="text-xl font-semibold text-black">
                                    {user?.name}
                                </h2>

                                <p className="text-gray-500">
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 ">
                            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-2">
                                Profile Image
                            </label>

                            <input
                                id="profileImage"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setSelectedImage(file);
                                }}
                                className="w-full text-black rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                            />

                            {selectedImage && (
                                <p className="text-sm text-gray-500 mt-2">
                                    Selected file: {selectedImage.name}
                                </p>
                            )}

                            <button
                                type="button"
                                onClick={handleImageUpload}
                                disabled={!selectedImage || uploadingImage}
                                className="mt-3 px-5 py-1 rounded-lg border bg-blue-600 text-black font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                {uploadingImage ? "Uploading..." : "Upload Image"}
                            </button>
                        </div>
                    </div>


                    {/* Error */}
                    {error && (
                        <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {/* Success */}
                    {success && (
                        <div className="mb-5 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600">
                            {success}
                        </div>
                    )}

                    {/* Form */}
                    <form
                        onSubmit={handleUpdateProfile}
                        className="space-y-5"
                    >
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full text-black rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={user?.email || ""}
                                disabled
                                className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500 cursor-not-allowed"
                            />

                            <p className="text-xs text-gray-400 mt-1">
                                Email cannot be changed here.
                            </p>
                        </div>

                        {/* Phone */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Phone
                            </label>

                            <input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full text-black rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label
                                htmlFor="role"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Role
                            </label>

                            <input
                                id="role"
                                type="text"
                                value={user?.role || ""}
                                disabled
                                className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500 cursor-not-allowed"
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Account Status
                            </label>

                            <input
                                id="status"
                                type="text"
                                value={user?.status || ""}
                                disabled
                                className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500 cursor-not-allowed"
                            />
                        </div>

                        {/* Submit */}
                        <div className="pt-3">
                            <button
                                type="submit"
                                disabled={updating}
                                className="w-full md:w-auto px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                {updating
                                    ? "Updating..."
                                    : "Update Profile"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main >
    );
}