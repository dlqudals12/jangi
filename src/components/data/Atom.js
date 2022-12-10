import React from "react";
import { atom } from "jotai";
import { Box, Button } from "@mui/material";

export const SearchStatus = atom({
  select: 1,
  input: "",
});

export const MyRow = atom(false);

export const Row = atom([]);
