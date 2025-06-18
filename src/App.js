import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import SmokeLoader from "./components/SmokeLoader/SmokeLoader";


// Import all your components
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
import AllCustomers from "./pages/Customer/AllCustomers";
import Toasty from "./components/Toasty/Toasty";

const AppContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const prevLocRef = useRef(location);

  useEffect(() => {
    // Show loader only when pathname changes
    if (location.pathname !== prevLocRef.current.pathname) {
      setLoading(true);
      
      // Hide loader after minimum 500ms display
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    
    prevLocRef.current = location;
  }, [location]);

  return (
    <>
      {loading && <SmokeLoader />}
      {!loading && 
            <Switch>
            <Route path="/skeleton" component={Skeleton} />
            <Route path="/create" component={CreateOrder} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/orders" component={AllOrders} />
            <Route path="/orderdetails" component={OrderDetails} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/employees" component={EmployeeManagement} />
            <Route path="/employeetask" component={EmployeeTaskView} />
            <Route path="/analytics" component={AnalyticsDashboard} />
            <Route path="/inventory" component={InventoryPage} />
            <Route path="/addcustomer" component={Customer} />
            <Route path="/allcustomers" component={AllCustomers}/>
          </Switch>}
          <Toasty/>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;