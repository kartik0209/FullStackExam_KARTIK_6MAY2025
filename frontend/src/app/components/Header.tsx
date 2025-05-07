"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./header.scss";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);

      
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.role === "admin") {
        setIsAdmin(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Remove the JWT
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    // Redirect to home
    router.push("/");
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__logo">
          E-Commerce Store
        </Link>

        <nav className="header__nav">
          <Link href="/products" className="header__link">
            Products
          </Link>

          {isAdmin && (
            <Link href="/reports" className="header__link">
              Reports
            </Link>
          )}

          <Link href="/cart" className="header__link">
            Cart
          </Link>

          {isLoggedIn ? (
            <>
              <Link href="/orders" className="header__link">
                My Orders
              </Link>
              <button
                onClick={handleLogout}
                className="header__button header__button--secondary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="header__button header__button--secondary"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="header__button header__button--primary"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
