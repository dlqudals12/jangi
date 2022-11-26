import React from "react";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import CampaignIcon from "@mui/icons-material/Campaign";
import CastConnectedIcon from "@mui/icons-material/CastConnected";
import { useAtom } from "jotai";
import { MyRow, SearchStatus } from "./data/Atom";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const [searchFiled, setSearchFiled] = useAtom(SearchStatus);
  const [myRow, setMyRow] = useAtom(MyRow);

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
          <MenuItem value={3} sx={{ fontFamily: "NotoSansKRMedium" }}>
            작성내용
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
        />

        <IconButton sx={{ marginLeft: "50px" }}>
          <AutoAwesomeMotionIcon color="secondary" />
        </IconButton>
        <IconButton sx={{ marginLeft: "10px" }}>
          <BrokenImageIcon color="secondary" />
        </IconButton>
        <IconButton sx={{ marginLeft: "10px" }}>
          <CampaignIcon color="secondary" />
        </IconButton>
        <IconButton sx={{ marginLeft: "10px" }}>
          <CastConnectedIcon color="secondary" />
        </IconButton>
      </Box>
    </>
  );
};
