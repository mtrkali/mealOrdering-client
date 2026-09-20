import { Quote, Star } from "lucide-react";

const reviews = [
    {
        id: 1,
        name: "Rahim Ahmed",
        role: "Customer",
        rating: 5,
        comment:
            "The food was delicious and the ordering process was really easy.",
    },
    {
        id: 2,
        name: "Nusrat Jahan",
        role: "Customer",
        rating: 5,
        comment:
            "I found some amazing meals on FoodHub. The whole experience was great.",
    },
    {
        id: 3,
        name: "Tanvir Hasan",
        role: "Customer",
        rating: 4,
        comment:
            "Very simple platform with lots of delicious food choices.",
    },
];

export default function CustomerReviews() {
    return (
        <section data-aos="zoom-in" className="py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-12 text-center">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-500">
                        Customer Feedback
                    </p>

                    <h2 className="text-3xl font-bold md:text-4xl">
                        What Our Customers Say
                    </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="relative rounded-2xl border bg-white p-7 shadow-sm"
                        >
                            <Quote
                                size={38}
                                className="absolute right-6 top-6 text-orange-100"
                            />

                            <div className="mb-5 flex gap-1">
                                {Array.from({
                                    length: review.rating,
                                }).map((_, index) => (
                                    <Star
                                        key={index}
                                        size={17}
                                        className="fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            <p className="leading-7 text-gray-600">
                                "{review.comment}"
                            </p>

                            <div className="mt-6">
                                <h3 className="font-semibold">
                                    {review.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {review.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}