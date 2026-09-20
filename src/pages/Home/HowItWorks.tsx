import {
    CheckCircle2,
    ShoppingCart,
    Utensils,
} from "lucide-react";

const steps = [
    {
        number: "01",
        icon: Utensils,
        title: "Browse Meals",
        description:
            "Explore different meals and find something you love.",
    },
    {
        number: "02",
        icon: ShoppingCart,
        title: "Add to Cart",
        description:
            "Choose your favorite meals and add them to your cart.",
    },
    {
        number: "03",
        icon: CheckCircle2,
        title: "Place Your Order",
        description:
            "Confirm your address and place your order easily.",
    },
];

export default function HowItWorks() {
    return (
        <section data-aos="zoom-in" className="bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-12 text-center">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-500">
                        Simple Process
                    </p>

                    <h2 className="text-3xl font-bold md:text-4xl">
                        How It Works
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-gray-500">
                        Ordering your favorite food has never been easier.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {steps.map((step) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.number}
                                className="relative rounded-2xl bg-white p-8 text-center shadow-sm"
                            >
                                <span className="absolute right-5 top-5 text-4xl font-bold text-orange-100">
                                    {step.number}
                                </span>

                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-white">
                                    <Icon size={30} />
                                </div>

                                <h3 className="text-xl font-semibold">
                                    {step.title}
                                </h3>

                                <p className="mt-3 text-gray-500">
                                    {step.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}