export default function ProviderCardSkeleton() {
    return (
        <div className="rounded-2xl border bg-white p-5 shadow-sm animate-pulse">
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="h-16 w-16 rounded-full bg-gray-200" />

                <div className="flex-1 space-y-3">
                    <div className="h-5 w-40 rounded bg-gray-200" />
                    <div className="h-4 w-24 rounded bg-gray-200" />
                </div>

                <div className="h-7 w-20 rounded-full bg-gray-200" />
            </div>

            <div className="mt-6 space-y-4">
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-2/3 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-5/6 rounded bg-gray-200" />
            </div>

            <div className="mt-6 h-11 w-full rounded-xl bg-gray-200" />
        </div>
    );
}