// 미들웨어 함수
// 아래 코드의 문제 : new를 많이 함

import { CashService } from "./services/cashService.js";
import { ProductService } from "./services/productService.js";

// function aa() {}
// function aaa = () => {}
// 함수
// const mydate = new Date()
// mydate.getFullYear()
//       .메소드 (: 객체가 붙은 함수 )

export class ProductController {
  buyProduct = (req, res) => {
    // 1 가진 돈 검증하는 코드
    const cashService = new CashService();
    // 강하게 결합됨 tight coupling
    // 기능이 바뀌었을 경우 코드를 수정해야함, 의존성이 있음
    // 수정하지 않고도 변경하는 법 -> loose coupling 느슨한 결합
    const hasMoney = cashService.checkValue(); // t f return

    // 2 판매여부 검증하는 코드
    const productService = new ProductService();
    const isSoldout = productService.checkSoldout(); // t f return

    // 3 상품 구매하는 코드
    if (hasMoney && !isSoldout) {
      res.send("상품 구매 완료");
    }
  };

  refundProduct = (req, res) => {
    // 1 판매여부 검증하는 코드
    const productService = new ProductService();
    const isSoldout = productService.checkSoldout(); // t f return

    if (isSoldout) {
      res.send("상품 환불 완료");
    }
  };
}
