import React,{useEffect,useState} from "react";
import "../../style/global.css";
import "../../style/dashboard.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useHistory } from "react-router-dom";
import { getOrderCount } from "../../redux/action/orderAction";


const Dashboard = () => {
  const history=useHistory();

  const [count,setCount]=useState({})
  useEffect(()=>{
   (async()=>{
    const countRes=await getOrderCount();
    setCount(countRes);
   })()
  },[])

  return (
    <div className="main">
      <Header title={"Dashboard"}/>
      <div className="dashboardSection">
        <div className="statsContainer">
          <div className="statCard">
            <div className="statIcon">
              <img src="assets/dashboard/pending.png" />
            </div>
            <div className="statText">
              <p>{count.pending}</p>
            </div>
            <div className="statHeader">Pending Orders</div>
          </div>
          <div className="statCard">
            <div className="statIcon">
              <img src="assets/dashboard/progress.png" />
            </div>
            <div className="statText">
              <p>{count.processing}</p>
            </div>
            <div className="statHeader">In Progress Orders</div>
          </div>
          <div className="statCard">
            <div className="statIcon">
              <img src="assets/dashboard/completed.png" />
            </div>
            <div className="statText">
              <p>{count.completed}</p>
            </div>
            <div className="statHeader">Completed Orders</div>
          </div>
        </div>

        <div className="quickActions">
          <div className="quickHeader">
            <p>Quick Actions</p>
          </div>
          <div className="actionButton" onClick={()=>history.push("/create")}>
            <div className="actionImage">
              <img src="assets/dashboard/completed.png" />
            </div>
            <div className="actionText">
              <p>New Order</p>
            </div>
          </div>
          <div className="actionButton" onClick={()=>history.push("/orders")}>
            <div className="actionImage">
              <img src="assets/dashboard/completed.png" />
            </div>
            <div className="actionText">
              <p>All Orders</p>
            </div>
          </div>
          <div className="actionButton" onClick={()=>history.push("/employees")}>
            <div className="actionImage">
              <img src="assets/dashboard/completed.png" />
            </div>
            <div className="actionText">
              <p>Users</p>
            </div>
          </div>
          <div className="actionButton" onClick={()=>history.push("/allcustomers")}>
            <div className="actionImage">
              <img src="assets/dashboard/completed.png" />
            </div>
            <div className="actionText">
              <p>Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Same footer as Create Order */}
      <Footer/>
    </div>
  );
};

export default Dashboard;
