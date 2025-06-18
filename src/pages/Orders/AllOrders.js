// AllOrders.js (updated with working search and filter)
import React, { useState, useEffect } from "react";
import "../../style/global.css";
import "../../style/Orders/AllOrders.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { getAllOrder } from "../../redux/action/orderAction";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Status display configuration
  const statusConfig = {
    Pending: { label: "Pending", color: "#ffd700" },
    Preparing: { label: "Preparing", color: "#0fa3b1" },
    "out-for-delivery": { label: "Out for Delivery", color: "#27ae60" },
    Delivered: { label: "Delivered", color: "#2ecc71" },
    Completed: { label: "Completed", color: "#2ecc71" },
    Cancelled: { label: "Cancelled", color: "#e74c3c" },
  };

  useEffect(() => {
    (async () => {
      const orderRes = await getAllOrder();
      setAllOrders(orderRes);
      setFilteredOrders(orderRes); // Initialize filtered orders with all orders
    })();
  }, []);

  // Apply filters whenever search term or status filter changes
  useEffect(() => {
    let results = allOrders;
    
    // Apply status filter
    if (statusFilter !== "all") {
      results = results.filter(order => order.status === statusFilter);
    }
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(order => 
        (order.customerName && order.customerName.toLowerCase().includes(term)) ||
        (order.orderNumber && order.orderNumber.toLowerCase().includes(term)) ||
        (order.uuid && order.uuid.toLowerCase().includes(term)) ||
        (order.address.city && order.address.city.toLowerCase().includes(term)))
    }
    
    setFilteredOrders(results);
  }, [searchTerm, statusFilter, allOrders]);

  // Helper function to format items string
  const formatItems = (items, flavor) => {
    const parts = [];
    if (items.hookah > 0) {
      parts.push(`${items.hookah} Hookah Pot${items.hookah > 1 ? 's' : ''}`);
    }
    if (items.chillums > 0) {
      parts.push(`${items.chillums} Chillum${items.chillums > 1 ? 's' : ''}`);
    }
    if (items.coals > 0) {
      parts.push(`${items.coals} Coal${items.coals > 1 ? 's' : ''}`);
    }
    if (flavor && parts.length > 0) {
      parts.push(`${flavor} Flavor`);
    }
    return parts.length > 0 ? parts.join(", ") : "No items";
  };

  // Helper function to format address
  const formatAddress = (address) => {
    return `${address.plotApartment}, ${address.streetAddress1}${
      address.streetAddress2 ? `, ${address.streetAddress2}` : ""
    }, ${address.city}, ${address.pin}`;
  };

  return (
    <div className="main">
      <Header title="All Orders" />

      <div className="ordersSection">
        <div className="orderFiltersSection">
          <input
            type="text"
            placeholder="Search orders..."
            className="ordersearchInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="orderstatusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            {Object.entries(statusConfig).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="ordersList">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const statusInfo = statusConfig[order.status] || {
                label: order.status,
                color: "#777777",
              };

              return (
                <div className="orderCard" key={order._id}>
                  <div className="orderHeader">
                    <div className="orderMeta">
                      <span className="orderId">#{order.orderNumber?order.orderNumber:order.uuid.substring(0, 8)}</span>
                      <span className="orderDate">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span
                      className="statusBadge"
                      style={{ backgroundColor: statusInfo.color }}
                    >
                      {statusInfo.label}
                    </span>
                  </div>
                  <div className="orderDetails">
                    <p>
                      <strong>Customer:</strong> {order.customerName || (order.customer?.name || "N/A")}
                    </p>
                    <p>
                      <strong>Items:</strong> {formatItems(order.items, order.flavor)}
                    </p>
                    <p>
                      <strong>Address:</strong> {formatAddress(order.address)}
                    </p>
                    <div className="orderActions">
                      <button className="viewButton">View Details</button>
                      <button className="editButton">Edit Status</button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="noOrdersFound">
              No orders found matching your criteria.
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllOrders;