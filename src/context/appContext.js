import React, { useContext, useState, useReducer } from "react";
import reducer from "./reducer";
import axios from "axios";
import { GET_ALL_USER, GET_SINGLE_USER } from "./action";
import student from "../model/student";

const defaultState = {
  user: [],
  singleUser: null,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  //   const navigate = useNavigate();

  const getAllStudent = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getListUser");

      const { data } = res;
      const { msg, listUser } = data;
      console.log(listUser);

      for (let i = 0; i < listUser.length; i++) {
        listUser[i].key = listUser[i]._id;
        // listUser[i].khoa = 23;
      }

      dispatch({ type: GET_ALL_USER, payload: listUser });
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleStudent = async (idStd) => {
    try {
      const res = await axios.get(`http://localhost:5000/getDetails/${idStd}`);

      const { data } = res;

      const { data: std } = data;

      console.log(std);

      dispatch({ type: GET_SINGLE_USER, payload: std });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider value={{ ...state, getAllStudent, getSingleStudent }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
