

import ProviderMealsHeader from "./ProviderMealsHeader";
import ProviderMealsGrid from "./ProviderMealsGrid";
import EmptyMeals from "./EmptyMeals";
import { Meal as MealType } from "@/types/Meal";

interface Props {
    meals: MealType[];
}

export default function ProviderMeals({ meals }: Props) {
    return (
        <section className="space-y-6">
            <ProviderMealsHeader totalMeals={meals.length} />

            {meals.length > 0 ? (
                <ProviderMealsGrid meals={meals} />
            ) : (
                <EmptyMeals />
            )}
        </section>
    );
}