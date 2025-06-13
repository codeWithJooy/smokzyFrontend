import React from "react";
import "./Skeleton.css";
const Skeleton = () => {
  return (
    <div className="main">
      <div className="container">
        <div className="sidebar"></div>
        <div className="header">
          <div className="hamburger">
            <img src="assets/common/hamburger.png" />
          </div>
          <div className="headerText">
            <p>Dashboard</p>
          </div>
          <div className="headerNotification">
            <img src="assets/common/bell.png" />
            <img src="assets/common/settings.png" />
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footerUnit">
          <div className="footerUnitImg">
            <img src="/assets/common/home.png" />
          </div>
          <div className="footerUnitText">
            <p>Home</p>
          </div>
        </div>
        <div className="footerUnit">
          <div className="footerUnitImg">
            <img src="/assets/common/checkout.png" />
          </div>
          <div className="footerUnitText">
            <p>Home</p>
          </div>
        </div>
        <div className="footerUnit">
          <div className="footerUnitImg">
            <img src="/assets/common/add.png" />
          </div>
          <div className="footerUnitText">
            <p>New</p>
          </div>
        </div>
        <div className="footerUnit">
          <div className="footerUnitImg">
            <img src="/assets/common/inventory.png" />
          </div>
          <div className="footerUnitText">
            <p>Inventory</p>
          </div>
        </div>
        <div className="footerUnit">
          <div className="footerUnitImg">
            <img src="/assets/common/user.png" />
          </div>
          <div className="footerUnitText">
            <p>Account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
