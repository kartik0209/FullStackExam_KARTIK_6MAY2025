"use client";
import React from 'react';
import Link from 'next/link';
import './footer.scss';

export default function Footer() {
    return (
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__grid">
            <div className="footer__section">
              <h3>Shop</h3>
              <ul className="footer__list">
                <li><a href="/products">All Products</a></li>
                <li><a href="/products?category=electronics">Electronics</a></li>
                <li><a href="/products?category=clothing">Clothing</a></li>
                <li><a href="/products?category=books">Books</a></li>
              </ul>
            </div>
            
            <div className="footer__section">
              <h3>Account</h3>
              <ul className="footer__list">
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
                <li><a href="/cart">Cart</a></li>
                <li><a href="/orders">Orders</a></li>
              </ul>
            </div>
            
            <div className="footer__section">
              <h3>Contact</h3>
              <address className="footer__address">
                <p>123 E-Commerce St.</p>
                <p>Shopping City, SC 12345</p>
                <p className="mt-2">Email: info@ecommerce.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          
          <div className="footer__copyright">
            <p>&copy; {new Date().getFullYear()} E-Commerce Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }