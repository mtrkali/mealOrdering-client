"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function AddToCart({ meal }: any) {
  const { addToCart } = useCart();
  const [disable, setDisable] = useState(false);

  const handleClick = async () => {
    setDisable(true);
    addToCart(meal);
    await new Promise((res) => setTimeout(res,300))
    console.log("items added");
    setDisable(false);
  };

  return (
    <button
      disabled={disable}
      className={`border-0 rounded px-2 py-1 transition ${
        disable ? "bg-stone-400" : "bg-blue-300 hover:scale-105"
      }`}
      onClick={handleClick}
    >
      Add to Cart +
    </button>
  );
}