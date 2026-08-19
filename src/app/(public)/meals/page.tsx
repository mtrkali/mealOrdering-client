"use client";
import Meal from "@/components/meal";
import { FaSearch } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import MealSearchForm from "./components/MealSerchForoms";
import PublicMealsSkeleton from "./components/PublicMealsSkeleton";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function PublicMeals() {
  const router = useRouter();

  const [meals, setMeals] = useState<any[]>([]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [cuisine, setCuisine] = useState<string>("");
  const [dietary, setDietary] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState(false);


  // const searchRef = useRef<HTMLDivElement>(null);
  // UseCLickOutside(searchRef, () => { setCLickSearchFilter(false) })


  const fetchMeals = async () => {
    try {
      setLoading(true)

      const params = new URLSearchParams();

      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
      if (cuisine) params.append("cuisine", cuisine);

      dietary.forEach((item) => params.append("dietary", item));
      console.log('this is params', params)

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/meals?${params}`,
        { credentials: "include" }
      )

      if (!res.ok) throw new Error("Failed to fetch meals");
      const data = await res.json();
      setMeals(data.data);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    fetchMeals();
  }, []);

  if (loading) return <PublicMealsSkeleton />
  return (
    <div className="relative">
      <div className="relative h-10 flex items-center my-5">
        {/* ref={searchRef} */}
        <button
          className="bg-green-500 flex items-center justify-between w-50 absolute bottom-0 right-2 px-4 py-2 hover:scale-105 transition-transform duration-400 rounded text-center mt-3 block mx-auto"
          onClick={() => setSearchOpen((prev) => !prev)}
          disabled={loading}
        >
          <FaSearch /> Search <IoChevronDown className={`transition-transform duration-500 ${searchOpen ? "rotate-180" : ""}`} />
        </button>


        <div
          className={`absolute top-14 right-0 overflow-hidden transition-all duration-500 z-50 
           ${searchOpen
              ? "max-h-[600px] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"}
           `}
        >


          <MealSearchForm
            value={{
              setMinPrice,
              setMaxPrice,
              setCuisine,
              setDietary,
              fetchMeals,
              loading,
              dietary,
            }}
          />


        </div>





      </div>












      {meals?.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-5 mt-20">
          <p className=" text-xl">
            no meal!!
          </p>
          <Link
            href="/meals"
            onClick={(e) => {
              e.preventDefault();
              window.location.reload();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition"
          >
            Back to meals
          </Link>
        </div>
      ) : (
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-5
          max-w-7xl
          mx-auto
          mt-10">
          {meals.map((meal: any, index) => (
            <Meal key={meal.id} meal={meal} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
