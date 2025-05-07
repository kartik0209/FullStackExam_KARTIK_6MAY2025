"use client";

import { useState } from "react";

interface AddToCartButtonProps {
  productId: string;
  inStock: boolean;
}

export default function AddToCartButton({
  productId,
  inStock,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!inStock) return;

    setIsAdding(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add item to cart");
      }

      alert("Product added to cart successfully!");
      // router.push('/cart');
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      alert(error.message || "Failed to add item to cart. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <label htmlFor="quantity" className="mr-3 font-medium">
          Quantity:
        </label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="input max-w-[80px]"
          disabled={!inStock || isAdding}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={!inStock || isAdding}
        className="w-full py-3 btn btn-primary flex justify-center items-center"
      >
        {isAdding ? "Adding..." : inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
