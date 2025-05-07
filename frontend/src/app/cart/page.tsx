"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CartItem from "../components/Cartitem";
import styles from "./CartPage.module.scss";
import axios from "axios";
import { CartItemType, Product } from "@/types";

const API_URL = "http://localhost:5000/api";
const getToken = () => {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        const token = getToken();

        if (!token) {
          router.push("/login");
          return;
        }

        const response = await axios.get(`${API_URL}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Transform API response to match frontend structure
        const items =
          response.data.data?.items.map((item: any) => ({
            ...item,
            productId: item.product, // Store product ID separately
            imageUrl: item.image, // Map image to imageUrl
          })) || [];

        setCartItems(items);
      } catch (error) {
        console.error("Failed to fetch cart", error);

        if (axios.isAxiosError(error) && error.response?.status === 401) {
          router.push("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [router]);

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }

      await axios.put(
        `${API_URL}/cart/${productId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartItems((prev) =>
        prev.map((item) =>
          item.product === productId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }

      await axios.delete(`${API_URL}/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems((prev) => prev.filter((item) => item.product !== productId));
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  const proceedToCheckout = () => {
    router.push("/chekout");
  };

  if (isLoading) {
    return (
      <div className={styles.center}>
        <div className={styles.loadingText}>Loading your cart...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className={styles.center}>
        <h1 className={styles.emptyTitle}>Your Cart is Empty</h1>
        <p className={styles.emptyText}>
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link href="/products" className={styles.primaryButton}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.title}>Your Shopping Cart</h1>

      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))}
        </div>

        <div className={styles.summary}>
          <div className={styles.summaryBox}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.summaryDetails}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={proceedToCheckout}
              className={styles.primaryButton}
            >
              Proceed to Checkout
            </button>

            <div className={styles.continueShopping}>
              <Link href="/products" className={styles.link}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
