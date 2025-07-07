import { combineReducers } from "redux";

import toastReducer from "./toastReducer";
import userReducer from "./userReducer";
import employeeOrderReducer from "./employeeOrderReducer";
import stepReducer from "./stepReducer";


const rootReducer=combineReducers({
    toast:toastReducer,
    USER:userReducer,
    EMPORDER:employeeOrderReducer,
    STEP:stepReducer
})

export default rootReducer;