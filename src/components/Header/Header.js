import React from "react";
import "./Header.css"
import Dashboard from "../../pages/Dashboard/Dashboard";
const Header = ({title="Dashboard"}) => {
  return (
    <div className="header">
      <div className="hamburger">
        <img src="assets/common/hamburger.png" alt="menu" />
      </div>
      <div className="headerText">
        <p>{title}</p>
      </div>
      <div className="headerNotification">
        <img src="assets/common/bell.png" alt="notifications" />
        <img src="assets/common/settings.png" alt="settings" />
      </div>
    </div>
  );
};

export default Header;
