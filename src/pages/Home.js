import React from "react";

import { Box, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <Box sx={{ color: "red" }}>
      <Button variant="contained" onClick={() => handleLogout()}>
        Logout
      </Button>
    </Box>
  );
};

export default Home;
