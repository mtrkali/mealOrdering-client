import ContactCard from "./components/ContactCard";
import ProviderAbout from "./components/ProviderAbout";
import ProviderHero from "./components/ProviderHero";
import ProviderMeals from "./components/ProviderMeals";
import ReviewSection from "./components/ReviewSection";
import { getProviderData } from "./functions/function";

export default async function ProviderProfile({
    params,
}: {
    params: Promise<{ providerId: string }>;
}) {
    const { providerId } = await params;

    const provider = await getProviderData(providerId, false);
    const meals = await getProviderData(providerId, true);

    return (
        <section className="mx-auto max-w-7xl px-4 py-10">

            <ProviderHero provider={provider?.data} />

            <div className="mt-12 grid gap-8 lg:grid-cols-3">

                <div className="lg:col-span-2 space-y-8">
                    <ProviderAbout provider={provider?.data} />

                    {/* <ProviderStats provider={provider.data} /> */}

                    <ProviderMeals meals={meals.data} />
                </div>

                <ContactCard provider={provider?.data} />

            </div>

            <ReviewSection />

        </section>
    );
}