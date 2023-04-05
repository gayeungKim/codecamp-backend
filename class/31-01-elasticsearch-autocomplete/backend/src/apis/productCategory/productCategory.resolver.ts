import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductCategoryService } from './productCategory.service';

@Resolver()
export class ProductCategoryResolver{
  // 의존성 주입
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  // @Mutation : graphql, return 받을 qraphql의 결과 타입 명시
  //              return type
  @Mutation(() => ProductCategory)
  // category 생성 함수
  createProductCategory(
    // DB 카테고리 등록

    // 클라이언트로 부터 객체를 받아옴
    @Args('name') name: string,
  ) {
    // 받아온 객체를 create (Service 에서 구현) { 객체 구조분해 할당 }
    // resolver의 return을 받아 browser로 전달
    return this.productCategoryService.create({ name });
  }
  // 일반적인 return
  // return { name: "name"} .. 전달 받은 객체 **
  // return "create success" .. 생성 성공 문장
}