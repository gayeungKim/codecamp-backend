import express from "express";
import { CashService } from "./cash.js";
import { ProductService } from "./product.js";

// 정의할 것 돈 처리 class, 상품 처리 class
// 아래 코드의 문제: new 가 많다. api 가 늘어날 가능성이 있다
const app = express();

app.post("/products/buy", (req, res) => {
  // 1 가진 돈 검증하는 코드
  const cashService = new CashService();
  const hasMoney = cashService.checkValue();
  //t or f return= cash.js의 CashService 코드 실행
  // 2 판매여부 검증하는 코드
  const productService = new ProductService();
  const isSoldout = productService.checkSoldout();
  //t or f return = product.js의 ProductService() 코드 실행
  // line 10-18 : 추상화 과정 (퍼사드패턴과 흡사)

  // 3 상품 구매하는 코드
  if (hasMoney && !isSoldout) {
    res.send("상품구매 완료");
  }
});

// 상품 환불하기
app.post("/products/refund", (req, res) => {
  // 1 판매여부 검증하는 코드
  const productService = new ProductService();
  const isSoldout = productService.checkSoldout(); // t f return

  if (isSoldout) {
    res.send("상품환불 완료");
  }
});

app.listen(3000);
