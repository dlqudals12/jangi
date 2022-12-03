import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Typography,
  OutlinedInput,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";

const defaultValidation = {
  nullId: false,
  id: false,
  nullPassword: false,
  password: false,
  nullUser: false,
};

const validMsg = (msg) => {
  return {
    null: msg + " 입력해 주세요.",
    matches: msg + " 형식에 맞지 않습니다.",
  };
};

const idV = new RegExp(/^[a-zA-Z0-9]{5,20}$/);
const passwordV = new RegExp(
  /(?=.*\d{1,16})(?=.*[~`!@#$%\^&*()-+=]{1,16})(?=.*[a-zA-Z]{2,16}).{8,16}$/
);

export const Signup = () => {
  const [userLogin, setUserLogin] = useState({
    id: "",
    password: "",
    userName: "",
  });
  const [validation, setValidation] = useState(defaultValidation);
  const [userCheck, setUseCheck] = useState(false);
  const navigate = useNavigate();
  const allUsers = localStorage.getItem("userAll")
    ? JSON.parse(localStorage.getItem("userAll"))
    : [];

  useEffect(() => {
    if (localStorage.getItem("loginUser")) {
      navigate("/");
    }
  });

  const onClickSignup = () => {
    const validSet = {
      nullId: userLogin.id === "",
      id: !idV.test(userLogin.id),
      nullPassword: userLogin.password === "",
      password: !passwordV.test(userLogin.password),
      nullUser: userLogin.userName === "",
    };
    setValidation(validSet);
    if (!Object.values(validSet).includes(true)) {
      const oneUsers = allUsers.filter((e) => e.id === userLogin.id);
      if (userCheck) {
        if (oneUsers[0]) {
          alert("중복된 ID");
        } else {
          let arr = JSON.parse(localStorage.getItem("userAll"));
          arr.push(userLogin);
          localStorage.setItem("userAll", JSON.stringify(arr));
          alert("회원가입이 완료되었습니다.");
          navigate("/login");
        }
      } else {
        alert("중복채크를 진행해주세요.");
      }
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", height: "100%", backgroundColor: "#F4F5F7" }}>
        <Header />
        <Box sx={{ margin: "50px 0px 50px 0px" }}>
          <Card sx={{ width: "40%", marginLeft: "30%" }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ padding: "30px" }}>로그인</Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                alignContent: "center",
                width: "50%",
                marginLeft: "25%",
                marginBottom: "30px",
                marginTop: "30px",
              }}
            >
              <Box>
                <InputLabel sx={{}}>아이디</InputLabel>
                <OutlinedInput
                  sx={{ marginTop: "5px", width: "100%", height: "50px" }}
                  value={userLogin.id}
                  onChange={(e) => {
                    setUserLogin({ ...userLogin, id: e.target.value });
                  }}
                  onBlur={(e) => {
                    setValidation({
                      ...validation,
                      nullId: e.target.value === "",
                      id: !idV.test(e.target.value),
                    });
                  }}
                  endAdornment={
                    <Button
                      sx={{ width: "110px" }}
                      onClick={() => {
                        const oneUsers = allUsers.filter(
                          (e) => e.id === userLogin.id
                        );
                        if (oneUsers[0]) {
                          alert("중복된 아이디가 존재합나다.");
                          setUseCheck(false);
                        } else {
                          alert("중복 체크 되었습니다.");
                          setUseCheck(true);
                        }
                      }}
                    >
                      중복확인
                    </Button>
                  }
                  error={validation.nullId || validation.id}
                />
                {validation.nullId && (
                  <>
                    <FormHelperText sx={{ color: "red" }}>
                      {validMsg("아이디를").null}
                    </FormHelperText>
                  </>
                )}
                {validation.id && !validation.nullId ? (
                  <>
                    <FormHelperText sx={{ color: "red" }}>
                      {validMsg("아이디").matches}
                    </FormHelperText>
                  </>
                ) : (
                  <></>
                )}
                <InputLabel sx={{ marginTop: "15px" }}>비밀번호</InputLabel>
                <OutlinedInput
                  sx={{ marginTop: "5px", width: "100%", height: "50px" }}
                  value={userLogin.password}
                  type="password"
                  onChange={(e) => {
                    setUserLogin({ ...userLogin, password: e.target.value });
                  }}
                  onBlur={(e) => {
                    setValidation({
                      ...validation,
                      nullPassword: e.target.value === "",
                      password: !passwordV.test(e.target.value),
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onClickSignup();
                    }
                  }}
                  error={validation.nullPassword || validation.password}
                />
              </Box>
              {validation.nullPassword && (
                <>
                  <FormHelperText sx={{ color: "red" }}>
                    {validMsg("비밀번호를").null}
                  </FormHelperText>
                </>
              )}
              {validation.password && !validation.nullPassword ? (
                <>
                  <FormHelperText sx={{ color: "red" }}>
                    {validMsg("비밀번호").matches}
                  </FormHelperText>
                </>
              ) : (
                <></>
              )}
              <InputLabel sx={{ marginTop: "20px" }}>사용자명</InputLabel>
              <OutlinedInput
                sx={{ marginTop: "5px", width: "100%", height: "50px" }}
                value={userLogin.userName}
                onChange={(e) => {
                  setUserLogin({ ...userLogin, userName: e.target.value });
                }}
                error={validation.nullUser}
                onBlur={(e) => {
                  setValidation({
                    ...validation,
                    nullUser: e.target.value === "",
                  });
                }}
              />
              {validation.nullUser && (
                <>
                  <FormHelperText sx={{ color: "red" }}>
                    {validMsg("유저명을").null}
                  </FormHelperText>
                </>
              )}
            </Box>
            <Divider />
            <Box
              sx={{
                alignContent: "center",
                width: "50%",
                marginLeft: "25%",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              <Button
                sx={{
                  width: "100%",
                  border: "1px solid #284AD5",
                  color: "white",
                  backgroundColor: "#284AD5",
                  fontFamily: "NotoSansKRMedium",
                  ":hover": {
                    backgroundColor: "",
                  },
                }}
                onClick={onClickSignup}
              >
                회원가입
              </Button>
            </Box>
          </Card>
        </Box>
        <Footer />
      </Box>
    </>
  );
};
