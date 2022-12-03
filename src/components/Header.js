import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useAtom } from "jotai";
import { MyRow, Row, SearchStatus } from "./data/Atom";
import { json, useNavigate } from "react-router-dom";
import backGroung from "./backGroung.png";
import SearchIcon from "@mui/icons-material/Search";

const user = localStorage.getItem("loginUser")
  ? JSON.parse(localStorage.getItem("loginUser"))
  : null;

export const Header = () => {
  const navigate = useNavigate();
  const [searchFiled, setSearchFiled] = useAtom(SearchStatus);
  const [myRow, setMyRow] = useAtom(MyRow);
  const [row, setRow] = useAtom(Row);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("loginUser")) {
      setIsLogin(true);
    }
  }, []);

  const onClickSearch = () => {
    const newRow = JSON.parse(
      localStorage.getItem("row") ? localStorage.getItem("row") : []
    ).filter((e) => {
      switch (searchFiled.select) {
        case 1:
          return e.title.includes(searchFiled.input);
        case 2:
          return e.user.includes(searchFiled.input);
        default:
          return true;
      }
    });
    setRow(newRow);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "80px",
          backgroundColor: "black",
          justifyContent: "space-between",
          fontFamily: "NotoSansMedium",
        }}
      >
        <IconButton sx={{ height: "80px", marginLeft: "50px" }}>
          <CameraAltIcon
            onClick={() => {}}
            sx={{ width: "40px", height: "30px", margin: "10px" }}
            color="secondary"
          />
          <Box
            sx={{
              color: "white",
              fontFamily: "NotoSansMedium",
              width: "50px",
              fontSize: "20px",
              height: "30px",
            }}
            onClick={() => {
              setMyRow(false);
              navigate("/");
            }}
          >
            BLOG
          </Box>
        </IconButton>
        <Button
          sx={{
            marginLeft: "130px",
            color: "white",
            fontFamily: "NotoSansMedium",
            height: "34px",
          }}
          onClick={() => {
            setMyRow(false);
            navigate("/");
          }}
        >
          글목록
        </Button>
        <Button
          sx={{ color: "white", fontFamily: "NotoSansMedium", height: "34px" }}
        >
          글쓰기
        </Button>
        <Button
          sx={{ color: "white", fontFamily: "NotoSansMedium", height: "34px" }}
          onClick={() => {
            setMyRow(true);
            navigate("/");
          }}
        >
          내가 쓴 글
        </Button>
        <Select
          sx={{
            width: "110px",
            backgroundColor: "white",
            marginLeft: "200px",
            height: "34px",
            fontFamily: "NotoSansKRMedium",
          }}
          value={searchFiled.select}
          onChange={(e) => {
            setSearchFiled({ ...searchFiled, select: Number(e.target.value) });
          }}
        >
          <MenuItem value={1} sx={{ fontFamily: "NotoSansKRMedium" }}>
            제목
          </MenuItem>
          <MenuItem value={2} sx={{ fontFamily: "NotoSansKRMedium" }}>
            작성자
          </MenuItem>
        </Select>
        <OutlinedInput
          container
          sx={{
            backgroundColor: "white",
            height: "34px",
            marginLeft: "10px",
            align: "right",
            justifyContent: "flex-end",
          }}
          placeholder="내용"
          value={searchFiled.input}
          onChange={(e) => {
            setSearchFiled({ ...searchFiled, input: e.target.value });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onClickSearch();
            }
          }}
        />
        <IconButton sx={{ marginLeft: "3px" }} onClick={onClickSearch}>
          <SearchIcon sx={{ color: "white" }} />
        </IconButton>
        {isLogin ? (
          <>
            <Button
              sx={{ color: "white", marginLeft: "180px" }}
              onClick={() => {
                localStorage.removeItem("loginUser");
                alert("로그아웃 되었습니다.");
                setIsLogin(false);
              }}
            >
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <Button
              sx={{ color: "white", marginLeft: "95px" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </Button>
            <Button
              sx={{ color: "white", marginLeft: "15px" }}
              onClick={() => {
                navigate("/signup");
              }}
            >
              회원가입
            </Button>
          </>
        )}
      </Box>
      <Box>
        <Box
          component="img"
          alt=""
          sx={{
            backgroundImage: `url(${backGroung})`,
            width: "100%",
            border: "0px solid",
            aligh: "center",
            display: "inline-block",
            height: "250px",
          }}
        />
      </Box>
    </>
  );
};
