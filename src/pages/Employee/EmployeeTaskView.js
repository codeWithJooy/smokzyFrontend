import React, { useState } from "react";
import "../../style/Employees/TaskView.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const EmployeeTaskView = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Sample tasks
  const [tasks] = useState([
    {
      id: "TASK001",
      orderId: "ORD123",
      type: "Delivery",
      customer: "Rahul Verma",
      items: ["2 Hookah Pots", "Mint Flavor"],
      address: "123 Business Street, Mumbai",
      due: "2023-08-20 18:00",
      status: "pending",
    },
    {
      id: "TASK002",
      orderId: "ORD124",
      type: "Preparation",
      customer: "Rahul Verma",
      items: ["2 Hookah Pots", "Mint Flavor"],
      address: "123 Business Street, Mumbai",
      due: "2023-08-20 18:00",
      status: "pending",
    },
    {
      id: "TASK001",
      orderId: "ORD123",
      type: "Collection",
      customer: "Rahul Verma",
      items: ["2 Hookah Pots", "Mint Flavor"],
      address: "123 Business Street, Mumbai",
      due: "2023-08-20 18:00",
      status: "pending",
    },
  ]);

  const filteredTasks = tasks.filter(
    (task) => activeFilter === "all" || task.type.toLowerCase() === activeFilter
  );

  return (
    <div className="main">
     <Header title="My Tasks"/>
      <div className="taskContainer">
        <div className="taskHeader">
          <div className="taskFilters">
            {["all", "preparation", "delivery", "collection"].map((filter) => (
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
            <p>5</p>
          </div>
          <div className="statCard">
            <h3>Pending Tasks</h3>
            <p>3</p>
          </div>
          <div className="statCard">
            <h3>Completed Tasks</h3>
            <p>2</p>
          </div>
        </div>

        <div className="taskList">
          {filteredTasks.map((task) => (
            <div
              className={`taskCard ${task.type.toLowerCase()}`}
              key={task.id}
            >
              <div className="taskMeta">
                <div className="taskOrder">
                  <p className="taskOrderMain">Order #{task.orderId}</p>
                </div>
                <div className="taskOrder">
                  <span>{new Date(task.due).toLocaleString()}</span>
                </div>
                <div className="taskOrder">
                  <span className="taskType">{task.type}</span>
                </div>
              </div>

              <div className="taskDetails">
                <p>
                  <strong>Customer:</strong> {task.customer}
                </p>
                <p>
                  <strong>Items:</strong> {task.items.join(", ")}
                </p>
                {task.address && (
                  <p>
                    <strong>Address:</strong> {task.address}
                  </p>
                )}
              </div>

              <div className="taskFooter">
                <span className={`statusBadge ${task.status}`}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
                <div className="taskActions">
                  <button className="taskButton start">Start Task</button>
                  <button className="taskButton complete">Complete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default EmployeeTaskView;
