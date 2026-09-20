import { ArrowRight, ShoppingBag } from "lucide-react";

export default function CTASection() {
    return (
        <section data-aos="zoom-in" className="px-4 py-16">
            <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-orange-500 px-6 py-14 text-center text-white md:px-12">
                <div className="mx-auto max-w-2xl">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                        <ShoppingBag size={30} />
                    </div>

                    <h2 className="text-3xl font-bold md:text-4xl">
                        Ready to Order Your Favorite Meal?
                    </h2>

                    <p className="mt-4 leading-7 text-orange-50">
                        Discover delicious meals from trusted providers and
                        order your favorite food today.
                    </p>

                    <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-orange-500 transition hover:bg-gray-100">
                        Explore Meals
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
}