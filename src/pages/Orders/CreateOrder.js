import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import "../../style/global.css";
import "../../style/Orders/CreateOrder.css";
import { getAllCustomers } from "../../redux/action/customerAction";
import { getUsers } from "../../redux/action/userAction";
import { addOrder } from "../../redux/action/orderAction";

const CreateOrder = () => {
  // Navigation state
  const [orderStage, setOrderStage] = useState(1);
  
  // Data fetching states
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  
  // Customer search states
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Complete order state
  const [orderData, setOrderData] = useState({
    customer: null,
    orderType: "Regular Order",
    items: {
      hookah: 0,
      chillums: 0,
      coals: 0
    },
    flavor: "Mint",
    extras: {
      ice: false,
      cups: false,
      tongs: false
    },
    staff: {
      preparedBy: "",
      deliveredBy: "",
      collectedBy: ""
    },
    address: null
  });

  // Stage navigation handlers
  const handleStageUpgrade = () => {
    if (orderStage < 4) setOrderStage(prev => prev + 1);
  };

  const handleStageDowngrade = () => {
    if (orderStage > 1) setOrderStage(prev => prev - 1);
  };

  // Customer selection handlers
  const handleCustomerSelect = (customer) => {
    setOrderData(prev => ({
      ...prev,
      customer,
      address: customer.address || null
    }));
    setSearchTerm(customer.name);
    setShowSuggestions(false);
  };

  // Order details handlers
  const handleOrderTypeChange = (e) => {
    setOrderData(prev => ({
      ...prev,
      orderType: e.target.value
    }));
  };

  const handleItemQuantityChange = (item, value) => {
    setOrderData(prev => ({
      ...prev,
      items: {
        ...prev.items,
        [item]: Math.max(0, value)
      }
    }));
  };

  const handleFlavorChange = (e) => {
    setOrderData(prev => ({
      ...prev,
      flavor: e.target.value
    }));
  };

  const handleExtraChange = (extra) => {
    setOrderData(prev => ({
      ...prev,
      extras: {
        ...prev.extras,
        [extra]: !prev.extras[extra]
      }
    }));
  };

  // Staff selection handlers
  const handleStaffChange = (role, e) => {
    setOrderData(prev => ({
      ...prev,
      staff: {
        ...prev.staff,
        [role]: e.target.value
      }
    }));
  };

  // Address handlers
  const handleAddressChange = (field, e) => {
    setOrderData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: e.target.value
      }
    }));
  };

  // Order submission
  const handleCreateOrder = async () => {
    try {
      // Validate required fields
      if (!orderData.customer) {
        alert("Please select a customer");
        return;
      }

      console.log("Submitting order:", orderData);
      const res=await addOrder(orderData)
      if(res){
        alert("Customer Added Successfully.")
      }
    } catch (error) {
      console.error("Error creating order:", error);
      // Show error message to user
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersRes, employeesRes] = await Promise.all([
          getAllCustomers(),
          getUsers()
        ]);
        console.log(customersRes);
        setCustomers(customersRes);
        setEmployees(employeesRes);
        
        // Set default staff selections if employees exist
        if (employeesRes.length > 0) {
          setOrderData(prev => ({
            ...prev,
            staff: {
              preparedBy: employeesRes[0].uuid,
              deliveredBy: employeesRes[0].uuid,
              collectedBy: employeesRes[0].uuid
            }
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter customers based on search term
  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log("Filtered",filtered)
      setFilteredCustomers(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredCustomers([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, customers]);

  return (
    <div className="main">
      <div className="header">
        <div className="hamburger">
          <img src="assets/common/hamburger.png" alt="Menu" />
        </div>
        <div className="headerText">
          <p>Create Order</p>
        </div>
        <div className="headerNotification">
          <img src="assets/common/bell.png" alt="Notifications" />
          <img src="assets/common/settings.png" alt="Settings" />
        </div>
      </div>

      {/* Stage 1: Customer Information */}
      {orderStage === 1 && (
        <div className="createSection">
          <div className="createCard">
            <div className="createRow">
              <label>Customer Name</label>
              <div className="createInput" style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search Customer Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                />
              </div>
              {showSuggestions && filteredCustomers.length > 0 && (
                  <div className="suggestions-dropdown">
                    {filteredCustomers.map((customer) => (
                      <div
                        key={customer._id}
                        className="suggestion-item"
                        onClick={() => handleCustomerSelect(customer)}
                      >
                        {customer.name}
                      </div>
                    ))}
                  </div>
                )}
            </div>
            <div className="createRow">
              <label>Customer Number</label>
              <div className="createInput">
                <input
                  type="number"
                  placeholder="Customer Number"
                  value={orderData.customer?.number || ''}
                  readOnly
                />
              </div>
            </div>
            <div className="createRow">
              <label>Customer Email</label>
              <div className="createInput">
                <input
                  type="email"
                  placeholder="Customer Email"
                  value={orderData.customer?.email || ''}
                  readOnly
                />
              </div>
            </div>
            <div className="createRow">
              <label>Order Type</label>
              <div className="createInput">
                <select
                  value={orderData.orderType}
                  onChange={handleOrderTypeChange}
                >
                  <option value="Regular Order">Regular Order</option>
                  <option value="Party Catering">Party Catering</option>
                </select>
              </div>
            </div>
            <div className="createRowButtons">
              <button className="createCancel">Cancel</button>
              <button 
                className="createNext" 
                onClick={handleStageUpgrade}
                disabled={!orderData.customer}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stage 2: Order Items */}
      {orderStage === 2 && (
        <div className="createSection">
          <div className="createItemRow">
            <div className="itemName">
              <p>Hookah</p>
            </div>
            <div className="itemQuantity">
              <button onClick={() => handleItemQuantityChange('hookah', orderData.items.hookah - 1)}>
                -
              </button>
              <p>{orderData.items.hookah}</p>
              <button onClick={() => handleItemQuantityChange('hookah', orderData.items.hookah + 1)}>
                +
              </button>
            </div>
          </div>
          <div className="createItemRow">
            <div className="itemName">Chillums</div>
            <div className="itemQuantity">
              <button onClick={() => handleItemQuantityChange('chillums', orderData.items.chillums - 1)}>
                -
              </button>
              <p>{orderData.items.chillums}</p>
              <button onClick={() => handleItemQuantityChange('chillums', orderData.items.chillums + 1)}>
                +
              </button>
            </div>
          </div>
          <div className="createItemRow">
            <div className="itemName">Coals</div>
            <div className="itemQuantity">
              <button onClick={() => handleItemQuantityChange('coals', orderData.items.coals - 1)}>
                -
              </button>
              <p>{orderData.items.coals}</p>
              <button onClick={() => handleItemQuantityChange('coals', orderData.items.coals + 1)}>
                +
              </button>
            </div>
          </div>
          <div className="createRow">
            <label>Flavors</label>
            <div className="createInput">
              <select
                value={orderData.flavor}
                onChange={handleFlavorChange}
              >
                <option value="Mint">Mint</option>
                <option value="Grape">Grape</option>
                <option value="Apple">Apple</option>
                <option value="Strawberry">Strawberry</option>
              </select>
            </div>
          </div>
          <div className="createRowCheck">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={orderData.extras.ice}
                onChange={() => handleExtraChange('ice')}
              />
              <span className="checkbox-custom"></span>
              Ice
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={orderData.extras.cups}
                onChange={() => handleExtraChange('cups')}
              />
              <span className="checkbox-custom"></span>
              Cups
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={orderData.extras.tongs}
                onChange={() => handleExtraChange('tongs')}
              />
              <span className="checkbox-custom"></span>
              Tongs
            </label>
          </div>
          <div className="createRowButtons">
            <button className="createCancel" onClick={handleStageDowngrade}>
              Back
            </button>
            <button className="createNext" onClick={handleStageUpgrade}>
              Next
            </button>
          </div>
        </div>
      )}

      {/* Stage 3: Staff Assignment */}
      {orderStage === 3 && (
        <div className="createSection">
          <div className="createRow">
            <label>Order Prepared By</label>
            <div className="createInput">
              <select
                value={orderData.staff.preparedBy}
                onChange={(e) => handleStaffChange('preparedBy', e)}
              >
                {employees.map((emp) => (
                  <option key={emp.uuid} value={emp.uuid}>
                    {emp.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="createRow">
            <label>Order Delivered By</label>
            <div className="createInput">
              <select
                value={orderData.staff.deliveredBy}
                onChange={(e) => handleStaffChange('deliveredBy', e)}
              >
                {employees.map((emp) => (
                  <option key={emp.uuid} value={emp.uuid}>
                    {emp.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="createRow">
            <label>Order Collected By</label>
            <div className="createInput">
              <select
                value={orderData.staff.collectedBy}
                onChange={(e) => handleStaffChange('collectedBy', e)}
              >
                {employees.map((emp) => (
                  <option key={emp.uuid} value={emp.uuid}>
                    {emp.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="createRowButtons">
            <button className="createCancel" onClick={handleStageDowngrade}>
              Back
            </button>
            <button className="createNext" onClick={handleStageUpgrade}>
              Next
            </button>
          </div>
        </div>
      )}

      {/* Stage 4: Delivery Address */}
      {orderStage === 4 && (
        <div className="createSection">
          <div className="createCard">
            <div className="createRow">
              <label>Plot/Apartment Name</label>
              <div className="createInput">
                <input
                  type="text"
                  placeholder="Plot/Apartment Name"
                  value={orderData.address?.plotApartment || ''}
                  onChange={(e) => handleAddressChange('plotApartment', e)}
                />
              </div>
            </div>
            <div className="createRow">
              <label>Street Address 1</label>
              <div className="createInput">
                <input
                  type="text"
                  placeholder="Street Address 1"
                  value={orderData.address?.streetAddress1 || ''}
                  onChange={(e) => handleAddressChange('streetAddress1', e)}
                />
              </div>
            </div>
            <div className="createRow">
              <label>Street Address 2</label>
              <div className="createInput">
                <input
                  type="text"
                  placeholder="Street Address 2"
                  value={orderData.address?.streetAddress2 || ''}
                  onChange={(e) => handleAddressChange('streetAddress2', e)}
                />
              </div>
            </div>
            <div className="createRow">
              <label>City</label>
              <div className="createInput">
                <input
                  type="text"
                  placeholder="City"
                  value={orderData.address?.city || ''}
                  onChange={(e) => handleAddressChange('city', e)}
                />
              </div>
            </div>
            <div className="createRow">
              <label>Pin</label>
              <div className="createInput">
                <input
                  type="text"
                  placeholder="Pin Code"
                  value={orderData.address?.pin || ''}
                  onChange={(e) => handleAddressChange('pin', e)}
                />
              </div>
            </div>
            <div className="createRowButtons">
              <button className="createCancel" onClick={handleStageDowngrade}>
                Back
              </button>
              <button className="createNext" onClick={handleCreateOrder}>
                Create Order
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CreateOrder;