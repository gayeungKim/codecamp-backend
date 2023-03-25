// 미들웨어 함수

export class ProductController {
  constructor(moneyService, productService) {
    this.moneyService = moneyService;
    this.productService = productService;
  } // 생성자, 부모 class

  buyProduct = (req, res) => {
    // 1. 가진돈 검증하는 코드(10줄 => 2줄)
    // const cashService = new CashService() // 강한 결합, 수정이 필요
    const hasMoney = this.moneyService.checkValue(); // 약한 결합, 유동성 있게 사용 가능

    // 2. 판매여부 검증하는 코드(10줄 => 2줄)
    // const productService = new ProductService()
    const isSoldout = this.productService.checkSoldout();

    // 3. 상품 구매하는 코드
    if (hasMoney && !isSoldout) {
      res.send("상품 구매 완료!!");
    }
  };

  refundProduct = (req, res) => {
    // 1. 판매여부 검증하는 코드(10줄 => 2줄)
    // const productService = new ProductService()
    const isSoldout = this.productService.checkSoldout();

    // 2. 상품 환불하는 코드
    if (isSoldout) {
      res.send("상품 환불 완료!!");
    }
  };
}
