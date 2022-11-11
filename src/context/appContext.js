import React, { useContext, useState, useReducer } from "react";
import reducer from "./reducer";
import axios from "axios";
import { GET_ALL_USER } from "./action";
import student from "../model/student";
import { useNavigate } from "react-router-dom";

const defaultState = {
  user: [],
};
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  //   const navigate = useNavigate();

  const getAllStudent = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getListUser");

      const {data} = res;
      const {msg, listUser} = data;
      console.log(listUser);
      dispatch({ type: GET_ALL_USER, payload: listUser });
    } catch (err) {
      console.log(err);
    }
  };

    return (<AppContext.Provider value={{...state,getAllStudent}}>
        {children}
        </AppContext.Provider>)
}

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
