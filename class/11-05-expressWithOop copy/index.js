// 주내용: 폴더 정리
// index.js : endPoint 만

import express from "express";
// import { CashService } from "./mvc/controllers/services/cashService.js";
// import { ProductService } from "./mvc/controllers/services/productService.js";
import { ProductController } from "./mvc/controllers/product.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js";

const app = express();

// 상품 api
const productController = new ProductController();
app.post("/products/buy", productController.buyProduct); // 상품 구매하기
app.post("/products/refund", productController.refundProduct); // 상품 환불하기

// 쿠폰 api
const couponController = new CouponController();
app.post("/coupons/buy", couponController.buyCoupon); // 쿠폰 구매하기

app.listen(3000);
