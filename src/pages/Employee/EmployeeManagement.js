// src/pages/Employees/Management.js
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../../style/Employees/Management.css";
import Footer from "../../components/Footer/Footer";

import { addUser, getUsers } from "../../redux/action/userAction";
import { getOrderByParams } from "../../redux/action/orderAction";

const EmployeeManagement = () => {
  const user = useSelector((state) => state.USER);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "Employee",
    status: "active",
  });
  const [employees, setEmployees] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(true);

  const filteredEmployees = employees?.filter((emp) => {
    const matchesSearch =
      emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.phone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      roleFilter === "all" || emp.role.toLowerCase() === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const res = await addUser(newEmployee);
    if (res) {
      console.log("User Added");
    }
    setShowAddModal(false);
    setForceUpdate(true);
  };

  useEffect(() => {
    if (!forceUpdate) return;
    (async () => {
      const [data, order] = await Promise.allSettled([
        getUsers(),
        getOrderByParams(user.uuid)
      ]);
      setEmployees(data);
      setForceUpdate(false);
    })();
  }, [forceUpdate]);

  return (
    <div className={`main ${showAddModal ? "blur-background" : ""}`}>
      <div className="header">
        <div className="hamburger">
          <img src="assets/common/hamburger.png" alt="menu" />
        </div>
        <div className="headerText">
          <p>Employee Management</p>
        </div>
        <div className="headerNotification">
          <img src="assets/common/bell.png" alt="notifications" />
          <img src="assets/common/settings.png" alt="settings" />
        </div>
      </div>
      <div className="managementContainer">
        <div className="managementHeader">
          <div className="controls">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="searchInput"
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="filterSelect"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
            <button className="addButton" onClick={() => setShowAddModal(true)}>
              <img src="/assets/common/add.png" alt="Add Employee" />
            </button>
          </div>
        </div>

        <div className="employeeGrid">
          {filteredEmployees?.map((employee) => (
            <div className="employeeCard" key={employee.id}>
              <div className="cardHeader">
                <h3>{employee.fullName}</h3>
                <span className={`roleBadge ${employee.role.toLowerCase()}`}>
                  {employee.role}
                </span>
              </div>
              <div className="cardBody">
                <p>Phone: {employee.phone}</p>
                <p>Tasks Assigned: {employee.tasks}</p>
                <div className={`statusBadge ${employee.status}`}>
                  {employee.status.charAt(0).toUpperCase() +
                    employee.status.slice(1)}
                </div>
              </div>
              <div className="cardActions">
                <button className="editButton">
                  <img src="/assets/common/edit.png" alt="Edit" />
                </button>
                <button className="deleteButton">
                  <img src="/assets/common/delete.png" alt="Delete" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {showAddModal && (
          <div className="addModal">
            <div className="modalContent">
              <h3>Add New Employee</h3>
              <form onSubmit={handleAddEmployee}>
                <div className="formGroup">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={newEmployee.fullName}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        fullName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="formGroup">
                  <label>Email</label>
                  <input
                    type="email"
                    value={newEmployee.email}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="formGroup">
                  <label>Phone</label>
                  <input
                    type="number"
                    value={newEmployee.phone}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="formGroup">
                  <label>Password</label>
                  <input
                    type="password"
                    value={newEmployee.password}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="formGroup">
                  <label>Role</label>
                  <select
                    value={newEmployee.role}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, role: e.target.value })
                    }
                  >
                    <option value="Employee">Employee</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div className="formGroup">
                  <label>Status</label>
                  <select
                    value={newEmployee.status}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, status: e.target.value })
                    }
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="modalActions">
                  <button type="button" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit">Add Employee</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EmployeeManagement;
