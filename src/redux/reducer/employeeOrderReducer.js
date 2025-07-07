import { EMPLOYEE_ORDER } from "../actionTypes/employeeOrderTypes";

const initialize = {
  order: {},
};

const employeeOrderReducer = (state = initialize, action) => {
  switch (action.type) {
    case EMPLOYEE_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    default:
      return state;
  }
};


export default employeeOrderReducer;