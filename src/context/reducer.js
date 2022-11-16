import {
  GET_ALL_USER,
  GET_SINGLE_USER,
  LOGIN_BEGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
} from "./action";

const reducer = (state, action) => {
  if (action.type === GET_ALL_USER) {
    return { ...state, user: action.payload };
  }

  if (action.type === GET_SINGLE_USER) {
    return { ...state, singleUser: action.payload };
  }

  if (action.type === LOGIN_BEGIN) {
    return { ...state, isLoadingForm: true };
  }
  if (action.type === LOGIN_ERROR) {
    return { ...state, isLoadingForm: false, msgLogin: action.payload };
  }
  if (action.type === LOGIN_SUCCESS) {
    return { ...state, isLoadingForm: false };
  }
};

export default reducer;
