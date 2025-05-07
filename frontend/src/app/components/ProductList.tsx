'use client';

import { useState } from 'react';
import Link from 'next/link';           // ← import Link
import { Product } from '@/types';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import './ProductList.scss';

interface ProductListProps {
  initialProducts: Product[];
  totalPages: number;
}

export default function ProductList({ initialProducts, totalPages: initialTotalPages }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/products?search=${searchTerm}&category=${category}&page=${currentPage}`);
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } else {
        setError('Failed to fetch products');
      }
    } catch {
      setError('An error occurred while fetching products');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setCurrentPage(1);
    fetchProducts();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProducts();
  };

  return (
    <div className="product-list-container">
      <div className="filters">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>

        <div className="category-select-wrapper">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="category-select"
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
        </div>
      </div>

      {loading && <p className="loading">Loading products...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="no-results">
          No products found {searchTerm && `for "${searchTerm}"`}.
        </p>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <div className="products-grid">
            {products.map((product) => (
              <Link key={product.id || product._id} href={`/products/${product.id || product._id}`}>
                {/* No <a> needed in App Router, but you can wrap in a div if you need styling */}
                <ProductCard product={product} />
              </Link>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
