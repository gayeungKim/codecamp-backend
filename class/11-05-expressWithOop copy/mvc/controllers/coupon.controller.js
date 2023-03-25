// 미들웨어 함수

import { CashService } from "./services/cashService.js";

export class CouponController {
  buyCoupon = (req, res) => {
    // 1 가진 돈 검증하는 코드
    const cashService = new CashService();
    const hasMoney = cashService.checkValue(); // t f return

    // 2 쿠폰 구매하는 코드
    if (hasMoney && !isSoldout) {
      res.send("쿠폰 구매 완료");
    }
  };
}
