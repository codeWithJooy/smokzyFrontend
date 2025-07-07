import { orderApi } from "../../api";
import { getHeaders } from "./actionHelper";
import { CodeAnalogy } from "../../components/Toasty/Toasty";
import { updateToast } from "./toastActions";
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

export const getAllOrder = async () => {
  try {
    let headers = getHeaders();
    const response = await orderApi.get("/", headers);
    if (response.data.code === 200) {
      console.log(response.data.data);
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getOrderCount = async () => {
  try {
    let headers = getHeaders();
    const response = await orderApi.get("/count", headers);
    if (response.data.code == 200) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getOrderByParams = async (uuid) => {
  try {
    console.log("Uuid is ", uuid);
    let headers = getHeaders();
    const response = await orderApi.get(`/by-uuid/${uuid}`, headers);

    if (response.data.success) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error in getOrderByParams:", error.message);
    return [];
  }
};

export const startOrder = async (data) => {
  try {
    const headers = getHeaders({});
    const response = await orderApi.post("/startOrder", data, headers);
    if (response.data.code === 200) {
      updateToast({
        code:CodeAnalogy.SUCCESS,
        title:response.data.message,
        message:"",
      })
      return true;
    }else{
      updateToast({
        code:CodeAnalogy.ERROR,
        title:response.data.message,
        message:"",
      })
      return false
    }
  } catch (error) {
    console.log("Error Occurred", error.message);
  }
};

export const updateOrder = async (formData) => {
  try {
    const response = await orderApi.post("/updateOrder", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if(response.data.code===200){
      updateToast({
        code:CodeAnalogy.SUCCESS,
        title:response.data.message,
        message:"",
      })
      return true;
    }else{
      updateToast({
        code:CodeAnalogy.ERROR,
        title:response.data.message,
        message:"",
      })
      return false
    }
  } catch (error) {
    console.log("Error is ", error.messages);
  }
};


