import { Clock, Plus, Star } from "lucide-react";

const meals = [
    {
        id: 1,
        name: "Classic Chicken Burger",
        category: "Burger",
        price: 250,
        rating: 4.8,
        time: "20 min",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    },
    {
        id: 2,
        name: "Italian Cheese Pizza",
        category: "Pizza",
        price: 450,
        rating: 4.9,
        time: "30 min",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
    },
    {
        id: 3,
        name: "Crispy Fried Chicken",
        category: "Chicken",
        price: 320,
        rating: 4.7,
        time: "25 min",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",
    },
    {
        id: 4,
        name: "Chocolate Dessert",
        category: "Dessert",
        price: 180,
        rating: 4.8,
        time: "15 min",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
    },
];

export default function PopularMeals() {
    return (
        <section data-aos="zoom-in" className="bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-500">
                            Our Menu
                        </p>

                        <h2 className="text-3xl font-bold md:text-4xl">
                            Popular Meals
                        </h2>

                        <p className="mt-3 text-gray-500">
                            Discover meals loved by our customers.
                        </p>
                    </div>

                    <button className="w-fit font-semibold text-orange-500 hover:text-orange-600">
                        View All Meals →
                    </button>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {meals.map((meal) => (
                        <div
                            key={meal.id}
                            className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src={meal.image}
                                    alt={meal.name}
                                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                                />

                                <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium">
                                    {meal.category}
                                </span>
                            </div>

                            <div className="p-5">
                                <h3 className="font-semibold">
                                    {meal.name}
                                </h3>

                                <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Star
                                            size={16}
                                            className="fill-yellow-400 text-yellow-400"
                                        />
                                        {meal.rating}
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <Clock size={16} />
                                        {meal.time}
                                    </span>
                                </div>

                                <div className="mt-5 flex items-center justify-between">
                                    <p className="text-xl font-bold">
                                        ৳{meal.price}
                                    </p>

                                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white transition hover:bg-orange-600">
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}