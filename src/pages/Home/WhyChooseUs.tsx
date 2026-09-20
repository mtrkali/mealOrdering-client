import {
    BadgeCheck,
    Clock3,
    HeartHandshake,
    Leaf,
} from "lucide-react";

const features = [
    {
        icon: Clock3,
        title: "Fast Delivery",
        description:
            "Get your favorite meals delivered quickly and conveniently.",
    },
    {
        icon: Leaf,
        title: "Fresh Ingredients",
        description:
            "Enjoy delicious meals prepared with fresh and quality ingredients.",
    },
    {
        icon: BadgeCheck,
        title: "Trusted Providers",
        description:
            "Order from reliable food providers available on FoodHub.",
    },
    {
        icon: HeartHandshake,
        title: "Easy Ordering",
        description:
            "Browse, add to cart and place your order with just a few clicks.",
    },
];

export default function WhyChooseUs() {
    return (
        <section data-aos="zoom-in" className="py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-12 text-center">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-500">
                        Why FoodHub
                    </p>

                    <h2 className="text-3xl font-bold md:text-4xl">
                        Why Choose Us?
                    </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="rounded-2xl border p-6 text-center transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                                    <Icon size={28} />
                                </div>

                                <h3 className="text-lg font-semibold">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-gray-500">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}