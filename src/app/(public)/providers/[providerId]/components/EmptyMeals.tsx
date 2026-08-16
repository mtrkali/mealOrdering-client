import { UtensilsCrossed } from "lucide-react";

export default function EmptyMeals() {
    return (
        <div className="rounded-2xl border border-dashed p-12 text-center">
            <UtensilsCrossed className="mx-auto mb-4 h-12 w-12 text-gray-400" />

            <h3 className="text-lg font-semibold">
                No Meals Available
            </h3>

            <p className="mt-2 text-gray-500">
                This provider hasn't added any meals yet.
            </p>
        </div>
    );
}