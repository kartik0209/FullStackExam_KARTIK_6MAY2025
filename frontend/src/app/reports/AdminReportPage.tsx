"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminReportPage.scss";
import {
  RevenueData,
  TopSpender,
  ProductSale,
  CategorySale,
} from "../../types";

const AdminReportPage: React.FC = () => {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [topSpenders, setTopSpenders] = useState<TopSpender[]>([]);
  const [productSales, setProductSales] = useState<ProductSale[]>([]);
  const [categorySales, setCategorySales] = useState<CategorySale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token not found.");
          setLoading(false);
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };
        const [revenueRes, spenderRes, productRes, categoryRes] =
          await Promise.all([
            axios.get(
              "https://fullstackexam-kartik-chaudhary-6may2025.onrender.com/api/reports/revenue",
              { headers }
            ),
            axios.get(
              "https://fullstackexam-kartik-chaudhary-6may2025.onrender.com/api/reports/top-spenders",
              { headers }
            ),
            axios.get(
              "https://fullstackexam-kartik-chaudhary-6may2025.onrender.com/api/reports/product-sales",
              { headers }
            ),
            axios.get(
              "https://fullstackexam-kartik-chaudhary-6may2025.onrender.com/api/reports/category-sales",
              { headers }
            ),
          ]);

        setRevenueData(revenueRes.data.data);
        setTopSpenders(spenderRes.data.data);
        setProductSales(productRes.data.data);
        setCategorySales(categoryRes.data.data);
      } catch (err) {
        console.error("Error loading reports:", err);
        setError("Failed to load report data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <div className="loading">Loading reports...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-report-page">
      <h1>Admin Reports</h1>

      <section>
        <h2>📈 Daily Revenue (Last 7 Days)</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Revenue ($)</th>
              </tr>
            </thead>
            <tbody>
              {revenueData.map((item) => (
                <tr key={item.date}>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{Number(item.totalRevenue).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>💰 Top Spenders</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Total Spent ($)</th>
              </tr>
            </thead>
            <tbody>
              {topSpenders.map((item) => (
                <tr key={item.user_id}>
                  <td>{item.user_id}</td>
                  <td>{Number(item.total_spent).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>🛒 Product Sales</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity Sold</th>
                <th>Total Sales ($)</th>
              </tr>
            </thead>
            <tbody>
              {productSales.map((item) => (
                <tr key={item.product_name}>
                  <td>{item.product_name}</td>
                  <td>{item.total_quantity}</td>
                  <td>{Number(item.total_sales).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>📦 Sales by Category</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th># Products</th>
                <th>Avg Price</th>
                <th>Min Price</th>
                <th>Max Price</th>
              </tr>
            </thead>
            <tbody>
              {categorySales.map((item) => (
                <tr key={item.categoryName}>
                  <td>{item.categoryName}</td>
                  <td>{item.productCount}</td>
                  <td>{item.avgPrice.toFixed(2)}</td>
                  <td>{item.minPrice.toFixed(2)}</td>
                  <td>{item.maxPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminReportPage;
