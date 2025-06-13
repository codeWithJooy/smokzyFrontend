import React, { useState } from "react";
import Footer from "../../components/Footer/Footer";
import "../../style/global.css";
import "../../style/Orders/CreateOrder.css";
import { addNewCustomer } from "../../redux/action/customerAction";

const Customer = () => {
  const [customerStage, setCustomerStage] = useState(1);
  const [customerData, setCustomerData] = useState({
    name: "",
    number: "",
    email: "",
    plotApartment: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    pin: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStageUpgrade = () => {
    // Basic validation before proceeding to next stage
    // if (!customerData.name || !customerData.number || !customerData.email) {
    //   alert("Please fill in all required fields");
    //   return;
    // }
    setCustomerStage((prev) => prev + 1);
  };

  const handleStageDowngrade = () => {
    setCustomerStage((prev) => prev - 1);
  };

  const addCustomer = async () => {
    // Final validation before submission
    // if (!customerData.plotApartment || !customerData.streetAddress1 || !customerData.city || !customerData.pin) {
    //   alert("Please fill in all address fields");
    //   return;
    // }

    try {
      const res = await addNewCustomer(customerData);
      console.log(res);
      if (res) {
        console.log("Customer data to be submitted:", customerData);
        alert("Customer added successfully!");
      }
      // For now, we'll just log the data and show a success message

      // Reset form after successful submission
      setCustomerData({
        name: "",
        number: "",
        email: "",
        plotApartment: "",
        streetAddress1: "",
        streetAddress2: "",
        city: "",
        pin: "",
      });
      setCustomerStage(1);
    } catch (error) {
      console.error("Error adding customer:", error);
      alert("Failed to add customer. Please try again.");
    }
  };

  return (
    <div className="main">
      <div className="header">
        <div className="hamburger">
          <img src="assets/common/hamburger.png" alt="Menu" />
        </div>
        <div className="headerText">
          <p>Add Customer</p>
        </div>
        <div className="headerNotification">
          <img src="assets/common/bell.png" alt="Notifications" />
          <img src="assets/common/settings.png" alt="Settings" />
        </div>
      </div>

      {/* Customer Section Starts Here */}
      {customerStage === 1 && (
        <div className="createSection">
          <div className="createCard">
            <div className="createRow">
              <label>Customer Name</label>
              <div className="createInput">
                <input
                  type="text"
                  name="name"
                  placeholder="Add Customer Name"
                  value={customerData.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="createRow">
              <label>Customer Number</label>
              <div className="createInput">
                <input
                  type="number"
                  name="number"
                  placeholder="Add Customer Number"
                  value={customerData.number}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="createRow">
              <label>Customer Email</label>
              <div className="createInput">
                <input
                  type="email"
                  name="email"
                  placeholder="Add Customer Email"
                  value={customerData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="createRowButtons">
              <button className="createCancel">Cancel</button>
              <button className="createNext" onClick={handleStageUpgrade}>
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Section Part 2 Starts Here*/}
      {customerStage === 2 && (
        <div className="createSection">
          <div className="creareCard">
            <div className="createRow">
              <label>Plot/Apartment Name</label>
              <div className="createInput">
                <input
                  type="text"
                  name="plotApartment"
                  placeholder=""
                  value={customerData.plotApartment}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="createRow">
              <label>Street Address 1</label>
              <div className="createInput">
                <input
                  type="text"
                  name="streetAddress1"
                  placeholder="Add Street Address 1"
                  value={customerData.streetAddress1}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="createRow">
              <label>Street Address 2</label>
              <div className="createInput">
                <input
                  type="text"
                  name="streetAddress2"
                  placeholder="Add Street Address 2"
                  value={customerData.streetAddress2}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="createRow">
              <label>City</label>
              <div className="createInput">
                <input
                  type="text"
                  name="city"
                  placeholder="Add City"
                  value={customerData.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="createRow">
              <label>Pin</label>
              <div className="createInput">
                <input
                  type="text"
                  name="pin"
                  placeholder="Add Pin Code"
                  value={customerData.pin}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="createRowButtons">
              <button className="createCancel" onClick={handleStageDowngrade}>
                Back
              </button>
              <button className="createNext" onClick={addCustomer}>
                Add Customer
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Customer Section Part 2 Ends Here*/}

      <Footer />
    </div>
  );
};

export default Customer;
