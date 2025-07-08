import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";
import Dashboard from "../../pages/Dashboard/Dashboard";
import { sidebarData } from "../../data/sidebar";
const Header = ({ title = "Dashboard" }) => {
  const [sidebar, setSidebar] = useState(false);
  const history=useHistory()

  return (
    <div className="header">
      <div className="hamburger" onClick={() => setSidebar(true)}>
        <img src="assets/common/hamburger.png" alt="menu" />
      </div>
      <div className="headerText">
        <p>{title}</p>
      </div>
      <div className="headerNotification">
        <img src="assets/common/bell.png" alt="notifications" />
        <img src="assets/common/settings.png" alt="settings" />
      </div>
      {sidebar && (
        <div className="sidebarSection">
          <img
            src="assets/sidebar/cross.png"
            className="sidebarClose"
            onClick={() => setSidebar(false)}
            alt="cross bar"
          />
          <div className="userSection">
            <div className="userImage">
              <img src="assets/sidebar/account.png" />
            </div>
            <div className="userDetails">
              <div className="userName">
                <p>Abhishek Hazra</p>
              </div>
              <div className="userNumber">
                <p>7980651358</p>
              </div>
            </div>
          </div>
          <div className="sidebarLink">
            {sidebarData &&
              sidebarData.map((val) => (
                <div className="sidebarLinkSection" onClick={()=>history.push(val.link)}>
                  <div className="linkImage">
                    <img src={val.img} />
                  </div>
                  <div className="linkText">
                    <p>{val.text}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
