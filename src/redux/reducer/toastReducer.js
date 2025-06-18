import { UPDATE_TOAST, REVOKE_TOAST } from "../actionTypes/toastTypes";

const initialize = {
  visible: false,
  code: "",
  title: "Abhi",
  message: "Welcome To Smokzy",
};

const toastReducer = (state = initialize, action) => {
  const payload = action.payload;

  switch (action.type) {
    case UPDATE_TOAST:
      return {
        visible: true,
        code: payload.code,
        title: payload.title,
        message: payload.message,
      };
    case REVOKE_TOAST:
      return {
        visible: false,
        code: "",
        title: "",
        message: "",
      };
    default:
      return state;
  }
};

export default toastReducer;