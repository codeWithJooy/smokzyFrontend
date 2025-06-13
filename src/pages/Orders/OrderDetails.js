import React from "react";
import "../../style/global.css";
import "../../style/Orders/OrderDetails.css";

const OrderDetails = () => {
  // Sample order data
  const order = {
    id: "#12345",
    customerName: "John Doe",
    contact: "9876543210",
    email: "john@example.com",
    orderType: "Party Catering",
    status: "In Progress",
    paymentStatus: "Paid",
    totalAmount: "₹4500",
    items: {
      hookahPots: 5,
      chillums: 2,
      coals: 10,
      flavors: ["Mint", "Grape"],
      extras: ["Ice", "Cups"]
    },
    assignedEmployees: {
      preparation: "Employee A",
      delivery: "Employee B",
      collection: "Employee C"
    },
    address: {
      street: "123 Party Street",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      landmark: "Near City Mall"
    },
    partyDetails: {
      venue: "Grand Hall",
      duration: "4 Hours",
      transportation: "₹500"
    }
  };

  return (
    <div className="main">
      <div className="header">
        <div className="hamburger">
          <img src="assets/common/hamburger.png" alt="menu" />
        </div>
        <div className="headerText">
          <p>Order Details</p>
        </div>
        <div className="headerNotification">
          <img src="assets/common/bell.png" alt="notifications" />
          <img src="assets/common/settings.png" alt="settings" />
        </div>
      </div>

      <div className="detailsSection">
        <div className="createCard">
          {/* Order Status Header */}
          <div className="statusHeader">
            <h3>Order ID: {order.id}</h3>
            <div className="statusBadge">
              <span className="paymentStatus">{order.paymentStatus}</span>
              <span className="orderStatus">{order.status}</span>
            </div>
          </div>

          {/* Customer Information */}
          <div className="createRow">
            <label>Customer Name</label>
            <div className="createInput staticText">
              <p>{order.customerName}</p>
            </div>
          </div>

          <div className="createRow">
            <label>Contact Number</label>
            <div className="createInput staticText">
              <p>{order.contact}</p>
            </div>
          </div>

          {/* Order Type Specific Details */}
          {order.orderType === "Party Catering" && (
            <div className="partyDetails">
              <div className="createRow">
                <label>Venue</label>
                <div className="createInput staticText">
                  <p>{order.partyDetails.venue}</p>
                </div>
              </div>
              <div className="createRow">
                <label>Duration</label>
                <div className="createInput staticText">
                  <p>{order.partyDetails.duration}</p>
                </div>
              </div>
            </div>
          )}

          {/* Items List */}
          <div className="itemsSection">
            <h3>Items</h3>
            <div className="createItemRow">
              <div className="itemName">Hookah Pots</div>
              <div className="itemQuantity">
                <p>{order.items.hookahPots}</p>
              </div>
            </div>
            <div className="createItemRow">
              <div className="itemName">Chillums</div>
              <div className="itemQuantity">
                <p>{order.items.chillums}</p>
              </div>
            </div>
            <div className="createItemRow">
              <div className="itemName">Coals</div>
              <div className="itemQuantity">
                <p>{order.items.coals}</p>
              </div>
            </div>
            
            <div className="createRow">
              <label>Flavors</label>
              <div className="flavorTags">
                {order.items.flavors.map((flavor) => (
                  <span key={flavor} className="flavorTag">{flavor}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Assigned Employees */}
          <div className="employeesSection">
            <h3>Assigned Team</h3>
            <div className="createRow">
              <label>Preparation</label>
              <div className="createInput staticText">
                <p>{order.assignedEmployees.preparation}</p>
              </div>
            </div>
            <div className="createRow">
              <label>Delivery</label>
              <div className="createInput staticText">
                <p>{order.assignedEmployees.delivery}</p>
              </div>
            </div>
            <div className="createRow">
              <label>Collection</label>
              <div className="createInput staticText">
                <p>{order.assignedEmployees.collection}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="createRowButtons">
            <button className="createNext">Save Changes</button>
            <button className="createCancel">Back to Orders</button>
          </div>
        </div>
      </div>

      {/* Same footer as Create Order */}
      <div className="footer">
        {/* Footer content */}
      </div>
    </div>
  );
};

export default OrderDetails;