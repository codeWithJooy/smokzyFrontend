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

export const getAllOrder=async()=>{
  try{
    let headers=getHeaders();
    const response=await orderApi.get("/",headers);
    if(response.data.code===200){
      console.log(response.data.data)
      return response.data.data;
    }else{
      return [];
    }
  }catch(error){
    console.log(error.message)
  }
}