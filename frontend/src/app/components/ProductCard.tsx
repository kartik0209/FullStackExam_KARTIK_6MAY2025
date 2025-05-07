'use client';

import React, { useState } from 'react';
import { Product } from '@/types'; 
import './Product-card.scss';


interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  
  const addToCart = async (productId: string) => {
    setIsLoading(true);
    setErrorMessage(''); 

    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity: 1, 
        }),
      });

      const data = await response.json();

      if (response.ok) {
     
        console.log('Product added to cart', data);
      } else {
       
        setErrorMessage(data.message || 'Failed to add product to cart');
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again later.');
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-card">
      <div className="image-wrapper">
        <img
          src={product.imageUrl || '/placeholder.png'}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">₹{product.price.toFixed(2)}</p>
        <p className="product-category">{product.category}</p>
        {product.stock !== undefined && (
          <p
            className={`product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button
          className="add-to-cart-btn"
          onClick={() => addToCart(product.id || product._id || '')}
          disabled={product.stock === 0 || isLoading}
        >
          {isLoading ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
