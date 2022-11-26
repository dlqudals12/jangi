/* eslint-disable */

import "./App.css";
import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Index } from "./components/Index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
