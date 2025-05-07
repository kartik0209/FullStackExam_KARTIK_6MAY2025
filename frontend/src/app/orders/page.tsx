"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./orders.module.scss";

import { Order } from "../../types";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  console.log(orders);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/orders/myorders", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        const body = await res.json();
        if (!res.ok) throw new Error(body.message || "Failed to load orders");
        setOrders(body.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className={styles.center}>Loading your orders…</div>;
  if (error) return <div className={styles.center}>Error: {error}</div>;
  if (orders.length === 0)
    return <div className={styles.center}>You have no orders yet.</div>;

  return (
    <div className={styles.ordersPage}>
      <h1 className={styles.title}>My Orders</h1>
      <ul className={styles.orderList}>
        {orders.map((order) => (
          <li key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <span>Order #{order.id}</span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            <p className={styles.status}>Status: {order.status}</p>
            <p>Total: ₹{Number(order.total_amount)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
