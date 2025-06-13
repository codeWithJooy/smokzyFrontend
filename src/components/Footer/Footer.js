import React from "react";
import { useHistory } from "react-router-dom";

const Footer = () => {
  const history = useHistory();
  return (
    <div className="footer">
      <div className="footerUnit" onClick={()=>history.push("/dashboard")}>
        <div className="footerUnitImg">
          <img src="/assets/common/home.png" />
        </div>
        <div className="footerUnitText">
          <p>Home</p>
        </div>
      </div>
      <div className="footerUnit"  onClick={()=>history.push("/orders")}>
        <div className="footerUnitImg">
          <img src="/assets/common/checkout.png" />
        </div>
        <div className="footerUnitText">
          <p>Orders</p>
        </div>
      </div>
      <div className="footerUnit" onClick={()=>history.push("/create")}>
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
  );
};

export default Footer;
