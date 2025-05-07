"use client";

import React from "react";
import styles from "./CartItem.module.scss";
import { CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
}

export default function CartItem({
  item,
  updateQuantity,
  removeItem,
}: CartItemProps) {
  const { product: productId, quantity, name, price, image } = item;

  const handleQtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQty = parseInt(e.target.value, 10);
    updateQuantity(productId, newQty);
  };

  // Default max quantity to 10 if stock info isn't available
  const maxQuantity = 10;
  const quantityOptions = Array.from({ length: maxQuantity }, (_, i) => i + 1);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={image}
          alt={name}
          sizes="80px"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className={styles.details}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>₹{price.toFixed(2)}</p>
        <div className={styles.controls}>
          <label htmlFor={`qty-${productId}`} className={styles.label}>
            Qty:
          </label>
          <select
            id={`qty-${productId}`}
            value={quantity}
            onChange={handleQtyChange}
            className={styles.select}
          >
            {quantityOptions.map((qty) => (
              <option key={qty} value={qty}>
                {qty}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={() => removeItem(productId)}
        className={styles.removeButton}
        aria-label="Remove item"
      >
        ×
      </button>
    </div>
  );
}
