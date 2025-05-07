// components/AddToCartButton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './AddToCartButton.module.scss';

interface AddToCartButtonProps {
  productId: string;
  inStock: boolean;
}

export default function AddToCartButton({ productId, inStock }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!inStock) return;
    setIsAdding(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || 'Add to cart failed');
      alert('Added to cart!');
    
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor="qty" className={styles.label}>Qty:</label>
      <select
        id="qty"
        value={quantity}
        onChange={(e) => setQuantity(+e.target.value)}
        disabled={!inStock || isAdding}
        className={styles.select}
      >
        {[...Array(10)].map((_, i) => (
          <option key={i+1} value={i+1}>{i+1}</option>
        ))}
      </select>

      <button
        onClick={handleAddToCart}
        disabled={!inStock || isAdding}
        className={styles.button}
      >
        {isAdding ? 'Adding…' : inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
}
