import React, { useState, useEffect } from "react";
import "../../style/Employees/TaskView.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { getUsers } from "../../redux/action/userAction";
import { getOrderByParams, startOrder } from "../../redux/action/orderAction";
import { useSelector } from "react-redux";
import { formatItems } from "../../Helper/FormatItems";
import { formatAddress } from "../../Helper/FormatAddress";
import { employeeOrder } from "../../redux/action/employeeOrderAction";
import { useHistory } from "react-router-dom";

const EmployeeTaskView = () => {
  const user = useSelector((state) => state.USER);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [forceUpdate, setForceUpdate] = useState(true);

  useEffect(() => {
    if (!forceUpdate) return;
    (async () => {
      const order = await getOrderByParams(user.uuid);
      setOrders(order);
      setFilteredOrders(order);
      setForceUpdate(false);
    })();
  }, [forceUpdate]);

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) => order.taskType.toLowerCase() === activeFilter.toLowerCase()
      );
      setFilteredOrders(filtered);
    }
  }, [activeFilter, orders]);

  const totalOrder = orders.length;
  const pending = orders.filter(
    (order) => order.status.toLowerCase() === "pending"
  ).length;
  const completed = totalOrder - pending;

  return (
    <div className="main">
      <Header title="My Tasks" />
      <div className="taskContainer">
        <div className="taskHeader">
          <div className="taskFilters">
            {["all", "prepare", "delivery", "collect"].map((filter) => (
              <button
                key={filter}
                className={`filterButton ${
                  activeFilter === filter ? "active" : ""
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="taskStats">
          <div className="statCard">
            <h3>Total Tasks</h3>
            <p>{totalOrder}</p>
          </div>
          <div className="statCard">
            <h3>Pending Tasks</h3>
            <p>{pending}</p>
          </div>
          <div className="statCard">
            <h3>Completed Tasks</h3>
            <p>{completed}</p>
          </div>
        </div>

        <div className="taskList">
          {filteredOrders &&
            filteredOrders?.map((task) => <EmployeeTaskCard task={task} setForceUpdate={setForceUpdate}/>)}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmployeeTaskView;

const EmployeeTaskCard = ({ task,setForceUpdate }) => {
  const history = useHistory();
  const user = useSelector((state) => state.USER);
  const orderEdit = async (order) => {
    if(task.taskStatus==="Pending"){
      let data=await startOrder({orderId:order._id,step:task.taskType,staffId:user.uuid})
      if(data){
        setForceUpdate(true)
      }
    }
    // await employeeOrder(order);
    // history.push("/editorder");
  };

  const completeOrder=async(order)=>{
    await employeeOrder(order,task.taskType);
    history.push("/editorder");
  }

  return (
    <div className={`taskCard ${task.taskType.toLowerCase()}`} key={task.id}>
      <div className="taskMeta">
        <div className="taskOrder">
          <p className="taskOrderMain">Order #{task.orderNumber}</p>
        </div>
        <div className="taskOrder">
          <span>{task.orderNumber.split("-")[0]}</span>
        </div>
        <div className="taskOrder">
          <span className="taskType">{task.taskType}</span>
        </div>
      </div>

      <div className="taskDetails">
        <p>
          <strong>Customer:</strong> {task.customer.name}
        </p>
        <p>
          <strong>Items:</strong> {formatItems(task.items, task.flavor)}
        </p>
        {task.address && (
          <p>
            <strong>Address:</strong> {formatAddress(task.address)}
          </p>
        )}
      </div>

      <div className="taskFooter">
        <span className={`statusBadge ${task.status}`}>
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
        <div className="taskActions">
          <button className="taskButton start" onClick={() => orderEdit(task)}>
            {task.taskStatus === "Started" && (
              <>
                <img src="assets/dashboard/hourglass.png" />
                <p>Started</p>
              </>
            )}
            {task.taskStatus === "Completed" && (
              <>
                <img src="assets/dashboard/checked.png" />
                <p>Completed</p>
              </>
            )}
            {task.taskStatus === "Pending" && (
              <>
                <p>Start Task</p>
              </>
            )}
          </button>
          {task.taskStatus==="Started" && <button className="taskButton complete" onClick={()=> completeOrder(task)}>Complete</button>}
        </div>
      </div>
    </div>
  );
};
