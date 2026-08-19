"use client";
import AOS from "aos";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Meal as MealType } from "@/types/Meal";
import { useEffect } from "react";

interface MealProps {
  meal: MealType;
  index: number;
}


export default function Meal({ meal, index }: MealProps) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();
  const pathname = usePathname() ?? "/";

  const handleAddToCart = (meal: MealType) => {
    console.log("user in meal", user);
    if (!user) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }
    addToCart({
      id: meal.id,
      title: meal.title,
      image: meal.image,
      price: meal.price,
    })
    alert("Added to cart!")
  };


  return (
    <div data-aos="fade-up" data-aos-delay={index * 150} className="max-w-sm rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white  hover:scale-102 transition duration-300">
      {/* Image */}
      <div className="h-52 w-full bg-gray-100 flex items-center justify-center">
        {meal.image ? (
          <Image
            src={meal.image}
            alt={meal.title}
            width={400}
            height={250}
            className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 text-sm">No Image Available</span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title + Price */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">{meal.title}</h2>

          <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
            ৳ {meal.price}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-3 line-clamp-3">
          {meal.description}
        </p>

        {/* Cuisine + Category */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
            {meal.cuisine}
          </span>

          <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
            {meal?.category?.name ?? "Uncategorized"}
          </span>
        </div>

        {/* Dietary */}
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Dietary</p>

          <div className="flex flex-wrap gap-2">
            {meal.dietary?.length > 0 ? (
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

        {/* Provider */}
        <div className="mt-5 border-t pt-4 flex items-center justify-between my-3">
          <div>
            <p className="text-xs text-gray-400">Provider</p>

            <h3 className="text-md font-semibold text-gray-800">
              {meal.provider?.businessName}
            </h3>
          </div>
          <div>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 flex items-center gap-2 hover:scale-105 transition duration-200"
              onClick={() => handleAddToCart(meal)}
            >
              <span className="text-lg">+</span> Add to Cart
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
          <span>{new Date(meal.createdAt).toLocaleDateString("en-BD", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}</span>

          <Link href={`/meals/${meal.id}`}>
            <button className="text-blue-500 hover:underline">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
