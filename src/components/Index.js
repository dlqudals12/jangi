import React from "react";
import { Box } from "@mui/material";
import { Header } from "./Header";
import { Board } from "./Board";
import { Footer } from "./Footer";

export const Index = () => {
  return (
    <>
      <Box sx={{ width: "100%", height: "100%", backgroundColor: "#F4F5F7" }}>
        <Header />
        <Board />
        <Footer />
      </Box>
    </>
  );
};
