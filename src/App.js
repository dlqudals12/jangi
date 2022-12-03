/* eslint-disable */

import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Index } from "./components/Index";
import { BoardDetail } from "./components/BoardDetail";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";

const account = [
  { id: "lbm1212", password: "rkskek12!", userName: "가" },
  { id: "wkdrldnd12", password: "rkskek123!", userName: "나" },
  { id: "dlqudals12", password: "rkskek1234!", userName: "다" },
  { id: "ldsdn12", password: "rkskek21!", userName: "라" },
  { id: "nnnood21", password: "rkskek213!", userName: "마" },
];

function App() {
  useEffect(() => {
    if (!localStorage.getItem("userAll")) {
      localStorage.setItem("userAll", JSON.stringify(account));
    }
  });
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Index />} />
          <Route path={"/detail"} element={<BoardDetail />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
