"use client";

import { useEffect, useState } from "react";

export default function FoodHubHero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-orange-50 flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div
          className={`transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Delicious Food <br />
            <span className="text-violet-600">Delivered Fast</span>
          </h1>

          <p className="mt-5 text-gray-600 text-lg">
            Discover tasty meals, order your favorite dishes, and enjoy
            restaurant-quality food at your home with FoodHub.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 bg-violet-600 text-white rounded-xl shadow-md hover:bg-violet-700 transition">
              Order Now
            </button>

            <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition">
              Explore Menu
            </button>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-white shadow rounded-xl hover:scale-105 transition duration-300 hover:-translate-y-2">
              <h3 className="text-xl font-bold text-violet-600">500+</h3>
              <p className="text-sm text-gray-500">Foods</p>
            </div>
            <div className="p-3 bg-white shadow rounded-xl hover:scale-105 transition duration-300 hover:-translate-y-2">
              <h3 className="text-xl font-bold text-violet-600">100+</h3>
              <p className="text-sm text-gray-500">Restaurants</p>
            </div>
            <div className="p-3 bg-white shadow rounded-xl hover:scale-105 transition duration-300 hover:-translate-y-2">
              <h3 className="text-xl font-bold text-violet-600">10k+</h3>
              <p className="text-sm text-gray-500">Users</p>
            </div>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div
          className={`relative transition-all duration-1000 delay-100 hover:scale-105 hover:-translate-y-5 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
        >
          {/* Floating Card 1 */}
          <div className="absolute -top-6 -left-6 bg-white shadow-lg rounded-xl p-4 animate-bounce">
            🍔 Burger Combo
          </div>

          {/* Main Card */}
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600891964092-4316c288032e"
              alt="Food"
              className="w-full h-80 object-cover"
            />

            <div className="p-5">
              <h3 className="text-xl font-semibold">Premium Meal</h3>
              <p className="text-gray-500 text-sm mt-1">
                Fresh, tasty and delivered hot
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-violet-600 font-bold text-lg">
                  $12.99
                </span>

                <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Floating Card 2 */}
          <div className="absolute -bottom-6 -right-6 bg-white shadow-lg rounded-xl p-4 animate-pulse">
            🍕 Hot Pizza
          </div>
        </div>
      </div>
    </div>
  );
}
