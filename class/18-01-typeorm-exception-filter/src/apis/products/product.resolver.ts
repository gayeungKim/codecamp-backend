// resolver -> 라우트 핸들링
// // import { Query } from '@nestjs/common';
// // Query import 시 /common 에서 된 것인지 확인
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  // 데이터를 개별로 받아오기 위한 로직
  // @Query 데이터 조회시 사용, 반환값 product 명시 (=> product entity 객체 반환)
  @Query(() => Product)
  // "데이터 조회 (Product)"
  fetchProduct(
    @Args('productId') productId: string, //
  ) {
    // findOne: service 로직에서 productID 개별로 받아옴
    return this.productService.findOne({ productId });
  }

  // 데이터 목록을 조회하기 위한 로직
  // @Query 를 사용해서 반환값을 [Product]로 적용해
  // 배열 안에 객체 타입으로 지정
  @Query(() => [Product])
  // "데이터 조회 (Product)"
  fetchProducts() {
    // findAll: service 로직에서 해당 테이블 데이터 전체 조회
    return this.productService.findAll();
  }

  // @Mutation의 반환 결과를 Product 타입으로 지정
  // 작성한 내용을 그대로 프론트로 전달
  @Mutation(() => Product)
  async createProduct(
    // 객체로 전달받은 데이터를 createProductInput을 통해 유효성 검사
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    // productService 의존성 주입으로 create 함수 사용 가능
    // service로 받은 객체를 return을 통해 브라우저로 전달
    return await this.productService.create({ createProductInput });
  }

  // 수정된 상품을 return 받음
  @Mutation(() => Product)
  async updateProduct(
    // 수정한 상품의 id를 받아 해당 product 수정
    //    ' 수정조건'
    @Args('productId') productId: string,
    // 수정내용을 받아와 수정함
    //    '     수정대상     '
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // isSoldout 확인
    await this.productService.checkSoldout({ productId });

    // 0이라면 update 실행
    return this.productService.update({ productId, updateProductInput });
  }
}