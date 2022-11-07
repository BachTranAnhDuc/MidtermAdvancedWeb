import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Login } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<ShareLayout></ShareLayout>}>
          <Route index element={<Landing></Landing>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route
            path="/register/verify-email"
            element={<VerifyEmail></VerifyEmail>}
          ></Route>
          <Route path="/login" element={<Login></Login>}></Route>

          <Route path="*" element={<Error></Error>}></Route>
        </Route>
        <Route path="/new-login" element={<NewLogin></NewLogin>}></Route>
        <Route
          path="/new-register"
          element={<NewRegister></NewRegister>}
        ></Route> */}

        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/" element={<Home></Home>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
