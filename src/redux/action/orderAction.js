import { orderApi } from "../../api";
import { getHeaders } from "./actionHelper";

export const addOrder = async (orderData) => {
  try {
    let headers = getHeaders();
    const response = await orderApi.post("/", orderData, headers);
    if (response.data.code == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.message);
  }
};

