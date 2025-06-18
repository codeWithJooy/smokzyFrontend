import { combineReducers } from "redux";

import toastReducer from "./toastReducer";

const rootReducer=combineReducers({
    toast:toastReducer
})

export default rootReducer;