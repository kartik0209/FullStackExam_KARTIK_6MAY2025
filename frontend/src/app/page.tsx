"use client";
import { useEffect, useState } from 'react';
import ProductList from './components/ProductList';
import { Product } from '@/types';
import styles from '../app/products/ProductDetailPage.module.scss';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const body = await res.json();
console.log("Response body:", body); // Debugging line
      if (!res.ok) {
        throw new Error(body.message || "Failed to fetch products");
      }
      setProducts(body.data || []);
      setTotalPages(body.pagination?.totalPages || 1);
      
    } catch (err:any) {
      setError(err.message || "An error occurred while fetching products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  console.log("Products:", products);

  useEffect(() => {
    getProducts();
  }, []); 

  return (
    <div className={styles.productsContainer}>
      <h1 className={styles.heading}>All Products</h1>
      
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <div className={styles.error}>
          <p>Error: {error}</p>
          <button onClick={getProducts} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      ) : (
        <ProductList initialProducts={products} totalPages={totalPages} />
      )}
    </div>
  );
}