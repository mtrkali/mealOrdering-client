import ProviderCardSkeleton from "./components/ProviderCardSkeleton";

export default function Loading() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-10">
            {/* Page Heading */}
            <div className="mb-10 animate-pulse">
                <div className="h-8 w-60 rounded bg-gray-200" />
                <div className="mt-3 h-4 w-80 rounded bg-gray-200" />
            </div>

            {/* Search Bar Skeleton (optional) */}
            <div className="mb-8 animate-pulse">
                <div className="h-12 w-full max-w-md rounded-xl bg-gray-200" />
            </div>

            {/* Cards */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <ProviderCardSkeleton key={index} />
                ))}
            </div>
        </section>
    );
}