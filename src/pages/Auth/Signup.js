// Signup.js
import React, { useState } from "react";
import "../../style/auth.css";
import { signup } from "../../redux/action/authAction";
import {useHistory} from "react-router-dom"


const Signup = () => {
  const history=useHistory()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone:"",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    let res=await signup(formData);
    if(res){
      history.push("/dashboard")
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="authHeader">
          <h2>Welcome To Smokzy</h2>
          <h2>Create Account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="auth-row">
            <label>Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
            />
          </div>

          <div className="auth-row">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="auth-row">
            <label>Phone</label>
            <input
              type="number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />

          </div>
          <div className="auth-row">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <div className="auth-row">
            <label>Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
