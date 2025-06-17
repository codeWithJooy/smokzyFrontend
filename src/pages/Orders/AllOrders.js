// AllOrders.js (updated)
import React, { useState,useEffect } from "react";
import "../../style/global.css";
import "../../style/Orders/AllOrders.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { getAllOrder } from "../../redux/action/orderAction";

const AllOrders = () => {
  const [allOrders,setAllOrders]=useEffect([])
  // Sample orders with different statuses
  const orders = [
    {
      id: 12345,
      customer: "John Doe",
      items: "2 Hookah Pots, Mint Flavor",
      status: "pending",
      date: "2023-08-15",
      address: "123 Main Street, Mumbai",
    },
    {
      id: 12346,
      customer: "Jane Smith",
      items: "5 Hookah Pots, Grape Flavor",
      status: "preparing",
      date: "2023-08-14",
      address: "456 Business Road, Delhi",
    },
    {
      id: 12347,
      customer: "Raj Patel",
      items: "Party Package (10 Pots)",
      status: "out-for-delivery",
      date: "2023-08-13",
      address: "789 Beach View, Goa",
    },
    {
      id: 12348,
      customer: "Priya Sharma",
      items: "3 Hookah Pots, Apple Flavor",
      status: "completed",
      date: "2023-08-12",
      address: "321 Garden Lane, Bangalore",
    },
  ];

  // Status display configuration
  const statusConfig = {
    Pending: { label: "Pending", color: "#ffd700" },
    preparing: { label: "Preparing", color: "#0fa3b1" },
    "out-for-delivery": { label: "Out for Delivery", color: "#27ae60" },
    delivered: { label: "Delivered", color: "#2ecc71" },
    completed: { label: "Completed", color: "#2ecc71" },
    cancelled: { label: "Cancelled", color: "#e74c3c" },
  };

  useEffect(() => {
    (async () => {
     const orderRes= await getAllOrder();
     setAllOrders(orderRes);
    })();
  }, []);

  return (
    <div className="main">
      <Header title="All Orders" />

      <div className="ordersSection">
        <div className="filtersSection">
          <input
            type="text"
            placeholder="Search orders..."
            className="searchInput"
          />
          {/* <select className="statusFilter">
            <option value="all">All Statuses</option>
            {Object.entries(statusConfig).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select> */}
        </div>

        <div className="ordersList">
          {allOrders.map((order) => (
            <div className="orderCard" >
              <div className="orderHeader">
                <div className="orderMeta">
                  {/* <span className="orderId">#{order.orderNumber}</span> */}
                  {/* <span className="orderDate">{order.date}</span> */}
                </div>
                {/* <span
                  className="statusBadge"
                  style={{ backgroundColor: statusConfig[order.status].color }}
                >
                  {statusConfig[order.status].label}
                </span> */}
              </div>
              <div className="orderDetails">
                <p>
                  {/* <strong>Customer:</strong> {order.customer.name} */}
                </p>
                <p>
                  {/* <strong>Items:</strong> {order.items} */}
                </p>
                <p>
                  {/* <strong>Address:</strong> {order.address.plotApartment} */}
                </p>
                <div className="orderActions">
                  <button className="viewButton">View Details</button>
                  <button className="editButton">Edit Status</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllOrders;
