import { Star } from "lucide-react";

export default function ReviewSection() {
    return (
        <section className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">
                Customer Reviews
            </h2>

            <div className="rounded-2xl border bg-white p-10 text-center">
                <Star className="mx-auto h-12 w-12 text-yellow-500" />

                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                    No Reviews Yet
                </h3>

                <p className="mt-2 text-gray-500">
                    This provider hasn't received any reviews yet.
                </p>
            </div>
        </section>
    );
}