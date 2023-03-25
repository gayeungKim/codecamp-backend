// http://localhost:3000/
import express from "express";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import { options } from "./swagger/config.js";
import {
  checkValidationEmail,
  getWelcomTemplate,
  sendTemplateToEmail,
} from "./email.js";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";
import mongoose from "mongoose";
import { Board } from "./models/board.model.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

// 게시물 목록 조회
app.get("/boards", async (req, res) => {
  // 미들웨어 함수
  // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
  // const result = [
  //   { number: 1, writer: "작성자1", title: "제목1", contents: "내용1" },
  //   { number: 2, writer: "작성자2", title: "제목2", contents: "내용2" },
  //   { number: 3, writer: "작성자3", title: "제목3", contents: "내용3" },
  // ];
  const result = await Board.find();

  // 2. 꺼내온 결과 응답 주기
  res.send(result); // 응답 보내기
});

app.post("/boards", async (req, res) => {
  // endPoint가 같다 = restfull
  console.log(req.body); // 프론트에서 요청시 전달한 데이터 확인

  // 1. 데이터 등록 로직 => DB접속 후 데이터 저장
  const board = new Board({
    writer: req.body.writer,
    title: req.body.title,
    contents: req.body.contents,
  });
  // 객체로 받아오고
  await board.save();
  // db에 저장

  // 2. 저장 결과 응답 주기
  res.send("게시물 등록에 성공하였습니다."); // 응답시 메세지
});

app.post("/tockens/phone", (req, res) => {
  // req.body 객체의 myphone의 값을 myphone이라는 변수에 담기
  const myphone = req.body.myphone;

  // 1. 휴대폰번호 자릿수 맞는지 확인
  const isValid = checkValidationPhone(myphone);
  if (isValid) {
    // 2. 핸드폰 토큰 6자리 만들기
    const mytoken = getToken();

    // 3. 핸드폰 번호에 토큰 전송하기
    sendTokenToSMS(myphone, mytoken);
    res.send("인증완료");
  }
});

app.post("/users", (req, res) => {
  const user = req.body.myuser;
  // 1 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkValidationEmail(user.email);

  if (isValid) {
    // 2 가입 환영 템플릿 만들기
    const mytemplate = getWelcomTemplate(user);

    // 3 이메일에 가입환영 템플릿 전송하기
    sendTemplateToEmail(user.email, mytemplate);
    res.send("가입완료");
  }
});

app.post("/getNumber", (req, res) => {
  const mynumber = req.body.number; // 전화번호 넘겨받음

  res.send("번호를 받았습니다.");
  // console.log(number);
  console.log(mynumber);
});

// 몽고DB 접속!!
mongoose.connect("mongodb://my-database:27017/mydocker03");

// Backend API 서버 오픈!
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
