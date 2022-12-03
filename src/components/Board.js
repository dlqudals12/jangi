import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  OutlinedInput,
  InputLabel,
  Button,
  Divider,
  FormHelperText,
} from "@mui/material";
import { useAtom } from "jotai";
import { MyRow, Row } from "./data/Atom";
import { useNavigate } from "react-router-dom";

let data = [
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
];

const defaultValidation = {
  titleNull: false,
  userNull: false,
  descriptionNull: false,
};

const nullFunc = (msg) => {
  return msg + " 입력해주세요.";
};

export const Board = () => {
  const navigate = useNavigate();
  const [row, setRow] = useAtom(Row);
  const [open, setOpen] = useState(false);
  const [myRow, setMyRow] = useAtom(MyRow);
  const [delAlert, setDelAlert] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [upd, setUpd] = useState(false);
  const [delItem, setDelItem] = useState();
  const [updIdx, setUpdIdx] = useState();
  const [addVal, setAddVal] = useState({
    no: 0,
    title: "",
    user: localStorage.getItem("loginUser")
      ? JSON.parse(localStorage.getItem("loginUser")).userName
      : "Guest",
    description: "",
  });
  const [validation, setValidation] = useState(defaultValidation);
  const row1 = localStorage.getItem("row");
  const myId = localStorage.getItem("loginUser")
    ? JSON.parse(localStorage.getItem("loginUser")).userName
    : "";

  const onClickCell = (data) => {
    navigate("/detail?idx=" + data);
  };

  const onClickDel = (data) => {
    const delRow = JSON.parse(row1).filter((e) => e.no !== data);
    localStorage.removeItem("row");
    localStorage.setItem("row", JSON.stringify(delRow));
    setRefresh(!refresh);
  };

  useEffect(() => {
    setValidation(defaultValidation);
  }, [open]);

  useEffect(() => {
    if (localStorage.getItem("row")) {
      setRow(JSON.parse(row1));
    } else {
      localStorage.setItem("row", JSON.stringify(data));
      setRow(data);
    }
  }, [refresh]);

  useEffect(() => {
    if (myRow) {
      if (localStorage.getItem("row")) {
        setRow(JSON.parse(row1).filter((e) => e.user === myId));
      } else {
        localStorage.setItem("row", JSON.stringify(data));
        setRow(JSON.parse(row1).filter((e) => e.user !== myId));
      }
    } else {
      setRow(JSON.parse(row1));
    }
  }, [myRow]);

  const onClickRow = (type, idx) => {
    const valid = {
      titleNull: addVal.title === "",
      userNull: addVal.user === "",
      descriptionNull: addVal.description === "",
    };

    setValidation(valid);

    if (!Object.values(valid).includes(true)) {
      if (JSON.parse(row1)) {
        let rowLo = JSON.parse(row1);
        localStorage.removeItem("row");
        if (type === "ADD") {
          rowLo.push({
            no: Number(rowLo[rowLo.length - 1].no) + 1,
            title: addVal.title,
            user: addVal.user,
            description: addVal.description,
          });
          localStorage.removeItem("row");
          localStorage.setItem("row", JSON.stringify(rowLo));
          setRow(rowLo);
        } else {
          const updRow = rowLo.map((item) => {
            return item.no === idx
              ? {
                  no: item.no,
                  title: addVal.title,
                  user: addVal.user,
                  description: addVal.description,
                }
              : item;
          });
          console.log(updRow);
          localStorage.removeItem("row");
          localStorage.setItem("row", JSON.stringify(updRow));
          setRow(updRow);
          setUpd();
        }
        setOpen(false);
        alert(type === "ADD" ? "글이 저장되었습니다." : "글이 수정되었습니다.");
      }
    }
  };

  return (
    <>
      {delAlert && (
        <Dialog
          open={delAlert}
          PaperProps={{
            style: {
              width: "500px",
              overflowX: "hidden",
            },
          }}
        >
          <DialogContent>
            <Box>
              <Typography>해당글을 삭제 하시겠습니까?</Typography>
            </Box>
            <Box sx={{ float: "right", marginTop: "30px" }}>
              <Button
                onClick={() => {
                  onClickDel(delItem);
                  setDelAlert(false);
                  setDelItem();
                }}
              >
                네
              </Button>
              <Button
                onClick={() => {
                  setDelAlert(false);
                  setDelItem();
                }}
              >
                아니요
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
      {open && (
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          PaperProps={{
            style: {
              width: "800px",
              overflowX: "hidden",
            },
          }}
        >
          <DialogTitle sx={{ width: "80%", marginLeft: "5%" }}>
            글작성
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ width: "80%", marginLeft: "5%" }}>
            <InputLabel required sx={{ marginTop: "15px" }}>
              제목
            </InputLabel>
            <OutlinedInput
              value={addVal.title}
              sx={style.diInput}
              onChange={(e) => {
                setAddVal({ ...addVal, title: e.target.value });
              }}
              error={validation.titleNull}
              placeholder="제목"
              onBlur={(e) => {
                if (e.target.value) {
                  setValidation({ ...validation, titleNull: false });
                } else {
                  setValidation({ ...validation, titleNull: true });
                }
              }}
            />
            {validation.titleNull && (
              <FormHelperText sx={{ color: "red" }}>
                {nullFunc("제목을")}
              </FormHelperText>
            )}
            <InputLabel required sx={{ marginTop: "15px" }}>
              작성자명
            </InputLabel>
            <OutlinedInput
              value={addVal.user}
              sx={style.diInput}
              placeholder="User"
              onChange={(e) => {
                setAddVal({ ...addVal, user: e.target.value });
              }}
              readOnly
              error={validation.userNull}
              onBlur={(e) => {
                if (e.target.value) {
                  setValidation({ ...validation, userNull: false });
                } else {
                  setValidation({ ...validation, userNull: true });
                }
              }}
            />
            {validation.userNull && (
              <FormHelperText sx={{ color: "red" }}>
                {nullFunc("작성자명을")}
              </FormHelperText>
            )}
            <InputLabel required sx={{ marginTop: "15px" }}>
              상세
            </InputLabel>
            <OutlinedInput
              value={addVal.description}
              sx={style.diInput}
              placeholder="Description"
              multiline
              error={validation.descriptionNull}
              minRows={5}
              onChange={(e) => {
                setAddVal({ ...addVal, description: e.target.value });
              }}
              onBlur={(e) => {
                if (e.target.value) {
                  setValidation({ ...validation, descriptionNull: false });
                } else {
                  setValidation({ ...validation, descriptionNull: true });
                }
              }}
            />
            {validation.descriptionNull && (
              <FormHelperText sx={{ color: "red" }}>
                {nullFunc("내용을")}
              </FormHelperText>
            )}
          </DialogContent>
          <Divider sx={{ marginTop: "15px" }} />
          <Box
            sx={{
              marginLeft: "25%",
              width: "50%",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <Button
              sx={{
                height: "40px",
                width: "60px",
                border: "1px solid #284AD5",
                marginLeft: "15%",
              }}
              onClick={() => {
                setOpen(false);
              }}
            >
              취소
            </Button>
            <Button
              sx={{
                height: "40px",
                width: "60px",
                backgroundColor: "#284AD5",
                color: "white",
                float: "right",
                marginRight: "15%",
              }}
              onClick={() => {
                if (upd) {
                  onClickRow("UPD", updIdx);
                } else {
                  onClickRow("ADD");
                }
              }}
            >
              등록
            </Button>
          </Box>
        </Dialog>
      )}

      <Typography
        sx={{
          marginTop: "30px",
          alignItems: "center",
          fontFamily: "NotoSansKRBold",
          fontSize: "20px",
          width: "66px",
          marginLeft: "45%",
        }}
      >
        글목록
      </Typography>
      <Box
        sx={{
          width: "85%",
          marginLeft: "7.5%",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            marginTop: "50px",
            borderRadius: "10px",
          }}
        >
          <Table aria-label="simple table">
            <TableHead sx={{ border: "1px solid #8C8C8C" }}>
              <TableCell align="center" sx={{ border: "1px solid #8C8C8C" }}>
                No.
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid #8C8C8C" }}>
                Title
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid #8C8C8C" }}>
                User
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid #8C8C8C" }}>
                Button
              </TableCell>
            </TableHead>
            <TableBody>
              {row && row[0] !== null
                ? row.map((item, index) => (
                    <TableRow sx={{ border: "1px solid #DDDDDD" }} key={index}>
                      <TableCell
                        sx={{ border: "1px solid #DDDDDD" }}
                        align="center"
                        onClick={() => {
                          onClickCell(item.no);
                        }}
                      >
                        {item.no}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #DDDDDD" }}
                        align="left"
                        onClick={() => {
                          onClickCell(item.no);
                        }}
                      >
                        {item.title}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #DDDDDD", width: "20%" }}
                        align="center"
                        onClick={() => {
                          onClickCell(item.no);
                        }}
                      >
                        {item.user}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #DDDDDD", width: "20%" }}
                        align="center"
                      >
                        <Box>
                          <Button
                            sx={{
                              height: "30px",
                              width: "40px",
                              border: "1px solid #284AD5",
                            }}
                            onClick={() => {
                              setDelItem(item.no);
                              setDelAlert(true);
                            }}
                          >
                            삭제
                          </Button>
                          <Button
                            sx={{
                              height: "30px",
                              width: "40px",
                              backgroundColor: "#284AD5",
                              color: "white",
                              float: "right",
                              marginRight: "15%",
                              ":hover": {
                                backgroundColor: "black",
                              },
                            }}
                            onClick={() => {
                              setAddVal({
                                no: item.no,
                                title: item.title,
                                user: item.user,
                                description: item.description,
                              });
                              setOpen(true);
                              setUpd(true);
                              setUpdIdx(item.no);
                            }}
                          >
                            수정
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          sx={{
            width: "100px",
            height: "50px",
            border: "1px solid #284AD5",
            marginTop: "20px",
            marginBottom: "50px",
            marginLeft: "91%",
          }}
          onClick={() => {
            setOpen(true);
            setAddVal({
              no: 0,
              title: "",
              user: localStorage.getItem("loginUser")
                ? JSON.parse(localStorage.getItem("loginUser")).userName
                : "Guest",
              description: "",
            });
          }}
        >
          등록
        </Button>
      </Box>
    </>
  );
};

const style = {
  diInput: {
    width: "100%",
    marginTop: "10px",
  },
};
