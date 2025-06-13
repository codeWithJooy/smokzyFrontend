import React from "react";

const Footer=()=>{
    return(
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
            <p>Orders</p>
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
    )
}

export default Footer;