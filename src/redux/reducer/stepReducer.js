import { STEP_ADDED } from "../actionTypes/stepType";

const initialize = {
  step: null,
};

const stepReducer = (state = initialize, action) => {
  switch (action.type) {
    case STEP_ADDED:
      return {
        ...state,
        step: action.payload,
      };
    default:
      return state;
  }
};

export default stepReducer;
