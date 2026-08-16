import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
    return (
        <main className="flex min-h-[70vh] items-center justify-center px-4">
            <div className="max-w-md text-center">
                <SearchX className="mx-auto h-20 w-20 text-orange-500" />

                <h1 className="mt-6 text-3xl font-bold">
                    Provider Not Found
                </h1>

                <p className="mt-3 text-gray-500">
                    The provider you're looking for doesn't exist or may have been removed.
                </p>

                <Link
                    href="/providers"
                    className="mt-8 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600"
                >
                    Browse Providers
                </Link>
            </div>
        </main>
    );
}