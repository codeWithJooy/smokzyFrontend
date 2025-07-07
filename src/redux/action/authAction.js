import { authApi } from "../../api";
import { CodeAnalogy } from "../../components/Toasty/Toasty";
import { USER_LOGIN } from "../actionTypes/userTypes";
import { dispatchAction, getHeaders } from "./actionHelper";
import { updateToast } from "./toastActions";

export const signup = async (formData) => {
  try {
    let headers = getHeaders();
    const response = await authApi.post("/signup", formData, headers);
    if (response.data.code == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (formData) => {
  try {
    let headers = getHeaders();
    const response = await authApi.post("/login", formData, headers);
    if (response.data.code == 200) {
      dispatchAction(USER_LOGIN,response.data.data)
      updateToast({
        code:CodeAnalogy.SUCCESS,
        title:"Login Successfull",
        message:"Welcome to Smokzy",
      })
      return response.data.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.message);
  }
};
