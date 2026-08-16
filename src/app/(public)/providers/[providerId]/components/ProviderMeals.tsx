import MealCard from "@/components/meal/MealCard";
import { Meal } from "@/types/meal";
import ProviderMealsHeader from "./ProviderMealsHeader";
import ProviderMealsGrid from "./ProviderMealsGrid";
import EmptyMeals from "./EmptyMeals";

interface Props {
    meals: Meal[];
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