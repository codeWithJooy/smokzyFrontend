// Login.js
import React, { useState } from "react";
import "../../style/auth.css";
import { login } from "../../redux/action/authAction";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history=useHistory()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res=await login(formData)
    if(res){
      if(res.role==='Admin'){
          history.push("/dashboard")
      }else{
        history.push("/employeetask")
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
      <div className="authHeader">
          <h2>Welcome Back To </h2>
          <h2>Smokzy</h2>
        </div>
        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
