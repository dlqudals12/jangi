import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  InputLabel,
  OutlinedInput,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Row } from "./data/Atom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const BoardDetail = () => {
  const urlParams = new URL(window.location.href).searchParams;
  const [row, setRow] = useState(JSON.parse(localStorage.getItem("row")));
  const [addComment, setAddComent] = useState({
    no: Number(urlParams.get("idx")),
    user: localStorage.getItem("loginUser")
      ? JSON.parse(localStorage.getItem("loginUser")).userName
      : "Guest",
    comment: "",
  });
  const [values, setValues] = useState({
    no: "",
    title: "",
    user: "",
    description: "",
  });
  const [comment, setComment] = useState([]);
  const [isAdd, setIsAdd] = useState(false);

  const commentList = localStorage.getItem("comment")
    ? JSON.parse(localStorage.getItem("comment"))
    : [];

  useEffect(() => {
    const rowdetail = row.filter((e) => e.no === Number(urlParams.get("idx")));
    setValues({
      no: rowdetail[0].no,
      title: rowdetail[0].title,
      user: rowdetail[0].user,
      description: rowdetail[0].description,
    });
    setComment(
      commentList[0]
        ? commentList.filter((e) => e.no === Number(urlParams.get("idx")))
        : []
    );
  }, [isAdd]);

  return (
    <>
      <Box sx={{ width: "100%", height: "100%", backgroundColor: "#F4F5F7" }}>
        <Header />
        <Box sx={{ width: "60%", marginLeft: "20%" }}>
          <Card
            sx={{
              marginTop: "50px",
              border: "1px solid #DDDDDD",
              marginBottom: "50px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "NotoSansKRBold",
                color: "black",
                fontSize: "18px",
                margin: "20px 10px 20px 5%",
              }}
            >
              상세내용
            </Typography>
            <Divider />
            <Box sx={{ margin: "5%" }}>
              <InputLabel>제목</InputLabel>
              <OutlinedInput
                sx={{ width: "100%", marginTop: "10px" }}
                readOnly
                value={values.title}
              />

              <InputLabel sx={{ marginTop: "20px" }}>유저</InputLabel>
              <OutlinedInput
                readOnly
                value={values.user}
                sx={{ width: "100%", marginTop: "10px" }}
              />

              <InputLabel sx={{ marginTop: "20px" }}>내용</InputLabel>
              <OutlinedInput
                readOnly
                components={{Input: () => (<p
                  dangerouslySetInnerHTML={{
                    __html: values.description ? values.description : "",
                  }}
                ></p>)}}
                multiline
                minRows={5}
                sx={{ width: "100%", marginTop: "10px" }}
                />
            </Box>
            <Divider />
            <Box
              sx={{
                marginTop: "30px",
                marginLeft: "5%",
                marginRight: "5%",
                marginBottom: "15px",
              }}
            >
              {comment[0] &&
                comment.map((item, index) => (
                  <Card
                    sx={{
                      padding: "10px",
                      marginTop: index === 0 ? "0px" : "10px",
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "NotoSansKRBold", fontSize: "18px" }}
                    >
                      {item.user}
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "NotoSansKRReguler", fontSize: "14px" }}
                    >
                      &nbsp;&nbsp;&nbsp;
                      {item.comment}
                    </Typography>
                  </Card>
                ))}
              <InputLabel sx={{ marginTop: comment[0] ? "15px" : "0px" }}>
                댓글
              </InputLabel>
              <OutlinedInput
                value={addComment.comment}
                onChange={(e) => {
                  setAddComent({ ...addComment, comment: e.target.value });
                }}
                sx={{ marginTop: "10px", width: "100%" }}
                placeholder="Comment"
                multiline
                minRows={3}
                endAdornment={
                  <Button
                    sx={{ border: "1px solid #284ad5" }}
                    onClick={() => {
                      let commentRow = localStorage.getItem("comment")
                        ? JSON.parse(localStorage.getItem("comment"))
                        : [];
                      commentRow.push(addComment);
                      localStorage.setItem(
                        "comment",
                        JSON.stringify(commentRow)
                      );
                      alert("등록되었습니다.");
                      setAddComent({ ...addComment, comment: "" });
                      setIsAdd(!isAdd);
                    }}
                  >
                    등록
                  </Button>
                }
              />
            </Box>
          </Card>
        </Box>
        <Footer />
      </Box>
    </>
  );
};
