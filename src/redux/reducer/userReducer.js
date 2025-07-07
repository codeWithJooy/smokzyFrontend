import { USER_LOGIN,USER_SIGNUP } from "../actionTypes/userTypes";

const initialize={
    uuid:"",
    fullName:"",
    email:"",
    role:"",
}

const userReducer=(state=initialize,action)=>{
   switch(action.type){
    case USER_LOGIN:
        return{
            ...state,
            uuid:action.payload.id,
            fullName:action.payload.fullName,
            email:action.payload.email,
            role:action.payload.role
        }
        case USER_SIGNUP:
        return{
            ...state,
            uuid:action.payload.id,
            fullName:action.payload.fullName,
            email:action.payload.email,
            role:action.payload.role
        }
        default:
            return state
   }
}

export default userReducer;