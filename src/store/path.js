import { combineReducers } from "@reduxjs/toolkit";

const SUBMIT_PATH = "SUBMIT_PATH";

export const submitPath = (path) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SUBMIT_PATH, payload: path });
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {
  paths: [],
};

const pathReducer = function (state = initialState, action) {
  switch (action.type) {
    case SUBMIT_PATH: {
      return {
        ...state,
        paths: [...state.paths, action.payload],
      };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  path: pathReducer,
});

export default rootReducer;
