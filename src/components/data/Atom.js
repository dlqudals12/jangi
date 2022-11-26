import React from "react";
import { atom } from "jotai";
import { Box, Button } from "@mui/material";

export const SearchStatus = atom({
  select: 1,
  input: "",
});

export const MyRow = atom(false);

export const Row = atom([
  { no: 1, title: "장기웅", user: "장기웅", description: "", button: true },
  { no: 2, title: "맛있는거", user: "맛있는거", description: "", button: true },
  { no: 3, title: "사라", user: "사라", description: "", button: true },
  { no: 4, title: "진짜로", user: "진짜로", description: "", button: true },
  { no: 5, title: "고마운줄", user: "고마운줄", description: "", button: true },
  {
    no: 6,
    title: "알면 소고기",
    user: "알면 소고기",
    description: "",
    button: true,
  },
]);
