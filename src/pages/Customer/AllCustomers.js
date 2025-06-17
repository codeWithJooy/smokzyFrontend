// AllCustomers.js
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../style/global.css";
import "../../style/Orders/AllOrders.css";
import "../../style/Customers/allcustomers.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { getAllCustomers } from "../../redux/action/customerAction";


// Mock data - replace with actual API 
const mockCustomers = [
  {
    _id: "684ee383a96383dd7b580043",
    name: "Hemant Jain",
    number: "7980651358",
    email: "hems@gmail.com",
    address: {
      plotApartment: "Flat 4B,4th Floor",
      streetAddress1: "Naktala Road",
      streetAddress2: "",
      city: "Kolkata",
      pin: "700047"
    },
    createdAt: "2025-06-15T15:15:15.035+00:00",
    __v: 0
  },
  // Add more mock customers as needed
];

const AllCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useHistory();

  useEffect(() => {
   (async()=>{
    const cusRes=await getAllCustomers();
    if(cusRes){
      setCustomers(cusRes);
    }
   })()
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.number.includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="main">
      <Header title="All Customers" />
      
      <div className="customers-container">
      <div className="managementHeader">
          <div className="controls">
            <input
              type="text"
              placeholder="Search customers..."
              className="searchInput"
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}

            />
            <button className="addButton" onClick={() => navigate.push("/addcustomer")}>
              <img src="/assets/common/add.png" alt="Add Customer" />
            </button>
          </div>
        </div>

        <div className="customers-grid">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map(customer => (
              <div key={customer._id} className="customer-card">
                <div className="customer-card-header">
                  <h3>{customer.name}</h3>
                  <span className="customer-id">ID: {customer._id.substring(0, 8)}...</span>
                </div>
                
                <div className="customer-details">
                  <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{customer.number}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{customer.email}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">
                      {customer.address.plotApartment}, {customer.address.streetAddress1}
                      {customer.address.streetAddress2 && `, ${customer.address.streetAddress2}`}
                      <br/>
                      {customer.address.city} - {customer.address.pin}
                    </span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Member Since:</span>
                    <span className="detail-value">{formatDate(customer.createdAt)}</span>
                  </div>
                </div>
                
                <div className="customer-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => navigate.push(`/customers/edit/${customer._id}`)}
                  >
                    Edit
                  </button>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-customers">
              {searchTerm ? 'No customers match your search' : 'No customers found'}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllCustomers;