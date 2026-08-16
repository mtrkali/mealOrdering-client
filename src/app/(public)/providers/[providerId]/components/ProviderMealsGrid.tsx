
import Meal from "@/components/meal";
import { Meal as MealType } from "@/types/Meal";

interface Props {
    meals: MealType[];
}

export default function ProviderMealsGrid({
    meals,
}: Props) {
    return (
        <div
            className="
        grid
        gap-6
        sm:grid-cols-2
        xl:grid-cols-2
      "
        >
            {meals.map((meal, index) => (
                <Meal
                    key={meal.id}
                    meal={meal}
                    index={index}
                />
            ))}
        </div>
    );
}