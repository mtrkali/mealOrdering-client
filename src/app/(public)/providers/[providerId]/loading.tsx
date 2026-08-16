function SkeletonCard() {
    return (
        <div className="animate-pulse rounded-2xl border bg-white p-6">
            <div className="h-6 w-40 rounded bg-gray-200" />

            <div className="mt-6 space-y-4">
                <div className="h-4 rounded bg-gray-200" />
                <div className="h-4 w-5/6 rounded bg-gray-200" />
                <div className="h-4 w-4/6 rounded bg-gray-200" />
            </div>
        </div>
    );
}

export default function Loading() {
    return (
        <main className="mx-auto max-w-7xl px-4 py-10">
            <div className="h-72 animate-pulse rounded-3xl bg-gray-200" />

            <div className="mt-10 grid gap-8 lg:grid-cols-3">
                <div className="space-y-8 lg:col-span-2">
                    <SkeletonCard />
                    <SkeletonCard />

                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-80 animate-pulse rounded-2xl bg-gray-200"
                            />
                        ))}
                    </div>
                </div>

                <SkeletonCard />
            </div>
        </main>
    );
}