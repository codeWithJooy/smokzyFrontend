import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Skeleton from "./pages/Skeleton/Skeleton";
import CreateOrder from "./pages/Orders/CreateOrder";
import Dashboard from "./pages/Dashboard/Dashboard";
import AllOrders from "./pages/Orders/AllOrders";
import OrderDetails from "./pages/Orders/OrderDetails";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import EmployeeManagement from "./pages/Employee/EmployeeManagement";
import EmployeeTaskView from "./pages/Employee/EmployeeTaskView";
import AnalyticsDashboard from "./pages/Analytics/AnalyticsDashboard";
import InventoryPage from "./pages/Inventory/InventoryPage";
import Customer from "./pages/Customer/Customer";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/skeleton" component={Skeleton} />
        <Route path="/create" component={CreateOrder} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/orders" component={AllOrders} />
        <Route path="/orderdetails" component={OrderDetails}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/employees" component={EmployeeManagement}/>
        <Route path="/employeetask" component={EmployeeTaskView}/>
        <Route path="/analytics" component={AnalyticsDashboard} />
        <Route path="/inventory" component={InventoryPage}/>
        <Route path="/addcustomer" component={Customer}/>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
 