import { GET_ALL_USER, GET_SINGLE_USER } from "./action";

const reducer = (state, action) => {
  if (action.type === GET_ALL_USER) {
    return { ...state, user: action.payload };
  }

  if (action.type === GET_SINGLE_USER) {
    return { ...state, singleUser: action.payload };
  }
};

export default reducer;
