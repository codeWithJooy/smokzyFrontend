import axios from "axios";
const val = "https://smokzybackend.onrender.com";
const devApis = {
  AUTH_API: "http://localhost:5000/api/auth",
  USER_API: "http://localhost:5000/api/user",
  CUSTOMER_API: "http://localhost:5000/api/customer",
  ORDER_API: "http://localhost:5000/api/order",
};
const prodApis = {
  AUTH_API: `${val}/api/auth`,
  USER_API: `${val}/api/user`,
  CUSTOMER_API: `${val}/api/customer`,
  ORDER_API: `${val}/api/order`,
};

const getApiUrls = () => {
  const environment = process.env.REACT_APP_ENV;
  console.log(environment);
  switch (environment) {
    case "dev":
      return devApis;
    case "prod":
      return prodApis;
    default:
      return devApis;
  }
};

export const APIS = getApiUrls();

export const authApi = axios.create({
  baseURL: APIS.AUTH_API,
});

export const userApi = axios.create({
  baseURL: APIS.USER_API,
});

export const customerApi = axios.create({
  baseURL: APIS.CUSTOMER_API,
});

export const orderApi = axios.create({
  baseURL: APIS.ORDER_API,
});
