import React, { useContext, useState, useReducer } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  GET_ALL_USER,
  GET_SINGLE_USER,
  LOGIN_BEGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
} from "./action";
import student from "../model/student";

import { message, Space } from "antd";

// const { ipcRenderer, ipcMain } = window.require("electron");

// const { ipcMain } = require("electron");

const defaultState = {
  user: [],
  userPresent: null,
  singleUser: {
    id: "Loading...",
    name: "Loading...",
    major: "Loading...",
    age: "Loading...",
    address: "Loading...",
    phone: "Loading...",
    email: "Loading...",
  },
  msgLogin: "",
  isLoadingForm: false,
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

      console.log("App context here");
      console.log(std);

      dispatch({ type: GET_SINGLE_USER, payload: std });
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (inputData, loginSuccess) => {
    // ipcMain.on("user:loggin", async (event, inputData) => {
    //   axios
    //     .post("http://localhost:5000/login", {
    //       username: inputData.username,
    //       password: inputData.password,
    //     })
    //     .then((response) => {
    //       if (response.status === 200) {
    //         console.log(response.inputData);
    //       }
    //       // mainWindow.loadURL("http://localhost:3000/");
    //       // return response.inputData;
    //     })
    //     .catch((error) => {
    //       console.log("Electron catch error here");
    //       console.log(error.response.inputData);
    //       event.reply("loginFail", error.response.inputData);
    //       // return error.response.inputData;
    //     });
    // });
    dispatch({ type: LOGIN_BEGIN });

    setTimeout(async () => {
      try {
        // const res = await window.electron.loginFail();
        // const res = window.electron.login(inputData);
        const res = await axios.post("http://localhost:5000/login", inputData);

        const { data } = res;
        console.log(data);

        // window.electron.logginSuccess();

        loginSuccess();

        dispatch({ type: LOGIN_SUCCESS });

        // const { data } = res;

        // const { msg } = data;

        // console.log(msg);
      } catch (error) {
        const { response } = error;

        console.log(response);
        const { data } = response;

        const { msg } = data;

        message.error(msg);

        dispatch({ type: LOGIN_ERROR, payload: msg });
      }
    }, 1500);
  };

  return (
    <AppContext.Provider
      value={{ ...state, getAllStudent, getSingleStudent, login }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
