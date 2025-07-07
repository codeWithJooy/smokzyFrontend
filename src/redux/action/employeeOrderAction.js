import { EMPLOYEE_ORDER } from "../actionTypes/employeeOrderTypes";
import { STEP_ADDED } from "../actionTypes/stepType";
import { dispatchAction } from "./actionHelper";

export const employeeOrder=(order,step)=>{
    try{
        dispatchAction(EMPLOYEE_ORDER,order)
        dispatchAction(STEP_ADDED,step)
    }catch(error){
        console.log(error.message)
    }
}