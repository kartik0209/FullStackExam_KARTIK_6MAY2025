"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminReportPage.scss";
import { RevenueData, TopSpender, ProductSale, CategorySale } from "../../types"; 
const AdminReportPage = () => {

  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [topSpenders, setTopSpenders] = useState<TopSpender[]>([]);
  const [productSales, setProductSales] = useState<ProductSale[]>([]);
  const [categorySales, setCategorySales] = useState<CategorySale[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token"); 
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const headers = { Authorization: `Bearer ${token}` };

        const [revenueRes, spenderRes, productRes, categoryRes] = await Promise.all([
          axios.get("http://localhost:5000/api/reports/revenue", { headers }),
          axios.get("http://localhost:5000/api/reports/top-spenders", { headers }),
          axios.get("http://localhost:5000/api/reports/product-sales", { headers }),
          axios.get("http://localhost:5000/api/reports/category-sales", { headers }),
        ]);

        setRevenueData(revenueRes.data.data);
        setTopSpenders(spenderRes.data.data);
        setProductSales(productRes.data.data);
        setCategorySales(categoryRes.data.data);
      } catch (err) {
        console.error("Error loading reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();


  }, [token]);

  
  if (loading) return <div className="loading">Loading reports...</div>;

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
              {revenueData.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
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
              {topSpenders.map((item, index) => (
                <tr key={index}>
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
              {productSales.map((item, index) => (
                <tr key={index}>
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
              {categorySales.map((item, index) => (
                <tr key={index}>
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
