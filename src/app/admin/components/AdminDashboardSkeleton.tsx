"use client";

export default function AdminDashboardSkeleton() {
    return (
        <main className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
            {/* Title */}
            <div className="h-9 w-64 bg-gray-200 rounded"></div>

            {/* Subtitle */}
            <div className="mt-3 h-4 w-80 bg-gray-200 rounded"></div>

            {/* Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className="border rounded-lg p-6 shadow-sm"
                    >
                        {/* Label */}
                        <div className="h-4 w-28 bg-gray-200 rounded"></div>

                        {/* Number */}
                        <div className="mt-4 h-10 w-20 bg-gray-300 rounded"></div>

                        {/* Button */}
                        <div className="mt-6 h-10 w-36 bg-gray-200 rounded"></div>
                    </div>
                ))}

            </div>
        </main>
    );
}