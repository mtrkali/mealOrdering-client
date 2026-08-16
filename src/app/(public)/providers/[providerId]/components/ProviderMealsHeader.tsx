interface Props {
    totalMeals: number;
}

export default function ProviderMealsHeader({
    totalMeals,
}: Props) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold">
                    Our Meals
                </h2>

                <p className="text-sm text-gray-500">
                    {totalMeals} meals available
                </p>
            </div>
        </div>
    );
}