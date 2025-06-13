import { customerApi } from "../../api";
import { getHeaders } from "./actionHelper";

export const addNewCustomer = async (data) => {
  try {
    let headers = getHeaders();
    const response = await customerApi.post("/add", data, headers);
    if (response.data.code === 200) {
      return true;
    } else return false;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllCustomers = async () => {
  try {
    let header=getHeaders();
    const response=await customerApi.get("/",header);
    if(response.data.code===200){
      return response.data.data
    }else{
      return []
    }
  } catch (error) {
    console.log(error);
  }
};
