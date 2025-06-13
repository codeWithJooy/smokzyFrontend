// src/pages/Inventory/Inventory.js
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import Modal from "react-modal";
import "../../style/Inventory/Inventory.css";
import "../../style/global.css";
// Initialize modal (required for react-modal)
Modal.setAppElement("#root");

const InventoryPage = () => {
  // Inventory Data State
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Mint Flavor",
      stock: 45,
      threshold: 20,
      supplier: "Flavor King",
    },
    {
      id: 2,
      name: "Grape Flavor",
      stock: 32,
      threshold: 20,
      supplier: "Flavor King",
    },
    {
      id: 3,
      name: "Hookah Coal",
      stock: 120,
      threshold: 50,
      supplier: "Coal Masters",
    },
    {
      id: 4,
      name: "Chillum",
      stock: 15,
      threshold: 10,
      supplier: "Glass Works",
    },
  ]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    stock: "",
    threshold: "",
    supplier: "",
  });

  // Chart Data
  const chartData = {
    labels: inventory.map((item) => item.name),
    datasets: [
      {
        label: "Current Stock",
        data: inventory.map((item) => item.stock),
        backgroundColor: "#0fa3b1",
        borderColor: "#0d8c97",
        borderWidth: 1,
      },
      {
        label: "Reorder Threshold",
        data: inventory.map((item) => item.threshold),
        backgroundColor: "#eddea4",
        borderColor: "#e0d19a",
        borderWidth: 1,
      },
    ],
  };

  // Handle Form Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]:
        name === "name" || name === "supplier" ? value : parseInt(value) || 0,
    });
  };

  // Add New Inventory Item
  const handleAddItem = (e) => {
    e.preventDefault();
    setInventory([
      ...inventory,
      {
        id: inventory.length + 1,
        ...newItem,
      },
    ]);
    setNewItem({ name: "", stock: "", threshold: "", supplier: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="main">
      <div className="header">
        <div className="hamburger">
          <img src="assets/common/hamburger.png" alt="menu" />
        </div>
        <div className="headerText">
          <p>Inventory Management</p>
        </div>
        <div className="headerNotification">
          <img src="assets/common/bell.png" alt="notifications" />
          <img src="assets/common/settings.png" alt="settings" />
        </div>
      </div>
      <div className="inventoryContainer">
        <div className="controls">
          <input
            type="text"
            placeholder="Search Inventor.y..."
            className="searchInput"
          />
          <select className="filterSelect">
            <option value="all">All Status</option>
            <option value="admin">Out Of Irder</option>
            <option value="employee">Employees</option>
          </select>
          <button className="addButton">
            <img src="/assets/common/add.png" alt="Add Employee" onClick={()=>setIsModalOpen(true)}/>
          </button>
        </div>
        {/* Inventory Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card">
            <h3>Total Items</h3>
            <p>{inventory.length}</p>
          </div>
          <div className="summary-card">
            <h3>Low Stock</h3>
            <p>
              {inventory.filter((item) => item.stock < item.threshold).length}
            </p>
          </div>
          <div className="summary-card">
            <h3>
              Reorder</h3>
            <p>
              {
                inventory.filter((item) => item.stock <= item.threshold * 1.2)
                  .length
              }
            </p>
          </div>
        </div>

        {/* Inventory Chart */}
        <div className="chart-container">
          <h3>Stock Levels</h3>
          <div className="chart-wrapper">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Inventory Table */}
        <div className="inventory-table">
          <h3>Inventory Items</h3>
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Current Stock</th>
                <th>Threshold</th>
                <th>Supplier</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr
                  key={item.id}
                  className={
                    item.stock < item.threshold
                      ? "critical"
                      : item.stock <= item.threshold * 1.2
                      ? "warning"
                      : ""
                  }
                >
                  <td>{item.name}</td>
                  <td>{item.stock}</td>
                  <td>{item.threshold}</td>
                  <td>{item.supplier}</td>
                  <td>
                    {item.stock < item.threshold ? (
                      <span className="status-badge critical">Critical</span>
                    ) : item.stock <= item.threshold * 1.2 ? (
                      <span className="status-badge warning">Warning</span>
                    ) : (
                      <span className="status-badge healthy">Healthy</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Inventory Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="inventory-modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h3>Add New Inventory Item</h3>
          <button
            className="close-button"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleAddItem}>
          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Current Stock</label>
            <input
              type="number"
              name="stock"
              value={newItem.stock}
              onChange={handleInputChange}
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label>Reorder Threshold</label>
            <input
              type="number"
              name="threshold"
              value={newItem.threshold}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label>Supplier</label>
            <input
              type="text"
              name="supplier"
              value={newItem.supplier}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Item
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default InventoryPage;
