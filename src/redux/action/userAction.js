import { userApi } from "../../api";
import { getHeaders } from "./actionHelper";

export const addUser = async (formData) => {
  try {
    let header = getHeaders();
    const response = await userApi.post("/add", formData, header);
    if (response.data.code == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getUsers = async () => {
  try {
    let header = getHeaders();
    const response = await userApi.get("/", header);
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      return response.data.data;
    }
  } catch (error) {
    console.log(error.message);
  }
};
