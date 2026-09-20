import {
    CakeSlice,
    Coffee,
    Drumstick,
    Hamburger,
    Pizza,
    Soup,
} from "lucide-react";

const categories = [
    {
        name: "Pizza",
        icon: Pizza,
        meals: 24,
    },
    {
        name: "Burger",
        icon: Hamburger,
        meals: 18,
    },
    {
        name: "Chicken",
        icon: Drumstick,
        meals: 15,
    },
    {
        name: "Desserts",
        icon: CakeSlice,
        meals: 12,
    },
    {
        name: "Drinks",
        icon: Coffee,
        meals: 20,
    },
    {
        name: "Soup",
        icon: Soup,
        meals: 10,
    },
];

export default function PopularCategories() {
    return (
        <section data-aos="zoom-in" className="py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-10 text-center">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-500">
                        Explore Categories
                    </p>

                    <h2 className="text-3xl font-bold md:text-4xl">
                        What are you craving?
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-gray-500">
                        Explore delicious meals from different categories and
                        find something perfect for your taste.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {categories.map((category) => {
                        const Icon = category.icon;

                        return (
                            <div
                                key={category.name}
                                className="group cursor-pointer rounded-2xl border bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
                                    <Icon size={30} />
                                </div>

                                <h3 className="font-semibold">
                                    {category.name}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    {category.meals} meals
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}