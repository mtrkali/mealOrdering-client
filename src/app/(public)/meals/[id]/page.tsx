import Link from "next/link";

export default async function MealDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/meals/${id}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) console.log("meal fetch failed");
  const meal = await res.json();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <div className="h-96 w-full bg-gray-100 flex items-center justify-center">
          {meal.image ? (
            <img
              src={meal.image}
              alt={meal.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-sm">No Image Available</span>
          )}
        </div>
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">{meal.title}</h1>
          <span className="text-lg font-semibold text-blue-600">
            ৳{meal.price}
          </span>
        </div>

        {/* Category */}
        <div>
          <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
            {meal.category?.name}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm">{meal.description}</p>

        {/* Dietary */}
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Dietary</p>

          <div className="flex flex-wrap gap-2">
            {meal.dietary.length > 0 ? (
              meal.dietary.map((item: string) => (
                <span
                  key={item}
                  className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full"
                >
                  {item}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm">No Dietary Info</span>
            )}
          </div>
        </div>

        {/* Cuisine */}
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Cuisine</p>
          <span className="inline-block px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">
            {meal.cuisine}
          </span>
        </div>

        {/* Provider Info */}
        <div className="border-t pt-4">
          <h2 className="text-sm text-gray-500">Provider</h2>
          <p className="text-lg font-medium text-gray-700">
            {meal.provider?.businessName}
          </p>
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-4 border-t pt-4 text-sm text-gray-600">
          <div>
            <p className="font-medium">Meal ID</p>
            <p className="truncate">{meal.id}</p>
          </div>

          <div>
            <p className="font-medium">Created At</p>
            <p>{new Date(meal.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link href={`/meals`}>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
              Go to meal
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
