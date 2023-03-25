//const express = "express";
// http://localhost:3000/
import express from "express";

const app = express();
const port = 3001;

// Get 요청이 들어왔을 때
app.get("/", (req, res) => {
  console.log(req);
  res.send("Hello World! 헬로우 월드"); // 응답 보내기
});

app.listen(port, () => {
  // 접속을 기다림, 프로그램 종료 x
  console.log(`Example app listening on port ${port}`);
});
