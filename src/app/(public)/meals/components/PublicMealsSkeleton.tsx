"use client";

export default function PublicMealsSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Search Button */}
            <div className="relative h-10 my-5 flex justify-end">
                <div className="h-10 w-44 rounded-lg bg-gray-200" />
            </div>

            {/* Meal Grid */}
            <div
                className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-5
          max-w-7xl
          mx-auto
          mt-10
        "
            >
                {Array.from({ length: 9 }).map((_, index) => (
                    <div
                        key={index}
                        className="max-w-sm rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white  hover:scale-102 transition duration-300"
                    >
                        {/* Image */}
                        <div className="h-52 w-full bg-gray-200" />

                        <div className="p-5">
                            {/* Title & Price */}
                            <div className="flex justify-between items-center">
                                <div className="h-6 w-40 rounded bg-gray-200" />
                                <div className="h-7 w-20 rounded-full bg-gray-200" />
                            </div>

                            {/* Description */}
                            <div className="mt-4 space-y-2">
                                <div className="h-3 rounded bg-gray-200" />
                                <div className="h-3 rounded bg-gray-200" />
                                <div className="h-3 w-2/3 rounded bg-gray-200" />
                            </div>

                            {/* Tags */}
                            <div className="flex gap-2 mt-5">
                                <div className="h-6 w-20 rounded-full bg-gray-200" />
                                <div className="h-6 w-24 rounded-full bg-gray-200" />
                            </div>

                            {/* Dietary */}
                            <div className="mt-5">
                                <div className="h-4 w-24 rounded bg-gray-200 mb-3" />

                                <div className="flex gap-2 flex-wrap">
                                    <div className="h-6 w-16 rounded-full bg-gray-200" />
                                    <div className="h-6 w-20 rounded-full bg-gray-200" />
                                    <div className="h-6 w-14 rounded-full bg-gray-200" />
                                </div>
                            </div>

                            {/* Provider */}
                            <div className="mt-5 border-t pt-4 flex justify-between items-center">
                                <div>
                                    <div className="h-3 w-16 rounded bg-gray-200 mb-2" />
                                    <div className="h-5 w-28 rounded bg-gray-200" />
                                </div>

                                <div className="h-10 w-32 rounded-lg bg-gray-200" />
                            </div>

                            {/* Footer */}
                            <div className="mt-5 flex justify-between">
                                <div className="h-3 w-20 rounded bg-gray-200" />
                                <div className="h-4 w-24 rounded bg-gray-200" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}