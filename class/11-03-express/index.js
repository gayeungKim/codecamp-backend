// 사전 작업 : express 설치, server listening port:3000 열기
// !! class 가 왜 효율적이며 왜 사용하는가?
/* 
  아래 app.post(구매)와 app.post(환불)에는 1, 2번이 동일한 기능을 요구한다
  이때 이것을 class로 묶어내면 코드 중복을 피하고 관리를 간단히 할 수 있음
*/
import express from "express";

const app = express();

// 상품 구매하기
app.post("/products/buy", (req, res) => {
  // 미들웨어함수
  // 1 가진 돈 검증하는 코드
  //
  //
  //
  //
  // 2 판매여부 검증하는 코드
  //
  //
  //
  //
  // 3 상품 구매하는 코드
  //if (돈있음 && !판매완료) {
  //  res.send("상품구매 완료");
  //}
});

// 상품 환불하기
app.post("/products/refund", (req, res) => {
  // 1 판매여부 검증하는 코드
  //
  //
  //
  //
  // 2 상품 환불하는 코드
  //if(돈있음 && !판매완료){
  //  res.send("상품환불 완료");
  //}
});

app.listen(3000);
