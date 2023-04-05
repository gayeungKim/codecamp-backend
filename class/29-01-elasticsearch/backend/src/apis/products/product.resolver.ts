// 오류해결
// 아래 임폴트를 해제함
// fetchProduct(s)의 return 형식 변경

// resolver -> 라우트 핸들링
// // import { Query } from '@nestjs/common';
// // Query import 시 /common 에서 된 것인지 확인
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { ProductCategory } from '../productCategory/entities/productCategory.entity';
// import { ProductSaleslocation } from '../productSaleslocation/entities/productSaleslocation.entity';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    // @nestjs/elasticsearch에서 제공하는 ElasticsearchService 주입
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  // 데이터를 개별로 받아오기 위한 로직
  // @Query 데이터 조회시 사용, 반환값 product 명시 (=> product entity 객체 반환)
  // @Query(() => [Product, ProductSaleslocation, ProductCategory])
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
  // @Query(() => [Product, ProductSaleslocation, ProductCategory])
  @Query(() => [Product])
  // "데이터 조회 (Product)"
  async fetchProducts() {

    // 엘라스틱서치에서 조회하기 연습!
    // findAll: service 로직에서 해당 테이블 데이터 전체 조회
    // this.elasticsearchService.search를 이용해 상품 조회
    const result = await this.elasticsearchService.search({
      // 조회할 테이블명
      index: 'myproduct',
      // 검색 조건을 QueryDSL로 기입
      query: {
        // match_all: {[조건]}
        // 조건에 해당하는 데이터 검색 (조건이 없다면 all)
        match_all: {},
      },
    });
    // JSON.stringify(): 객체 형태로 되어있는 정보를 보기 위해
    // js 값이나 객체를 JSON 문자열로 변환
    console.log(JSON.stringify(result, null, ' '));
    // 엘라스틱 조회를 위해 임시로 return 주석처리
    // return this.productService.findAll();

  }

  // @Mutation의 반환 결과를 Product 타입으로 지정
  // 작성한 내용을 그대로 프론트로 전달
  @Mutation(() => Product)
  async createProduct(
    // 객체로 전달받은 데이터를 createProductInput을 통해 유효성 검사
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    // --------------------------------
    // 엘라스틱서치에 등록하기 연습(연습이후 삭제할것)
    // this.elasticsearchService.create를 이용해 상품 등록
    // elasticsearch는 NoSQL이기 때문에 document로 저장됨
    // this.elasticsearchService.create({
    //   // 게시물 고유값 부여
    //   id: 'myid',
    //   // 등록할 테이블 명
    //   // NoSQL에서 document를 담고 있는 collection(=table) 역할
    //   index: 'myproduct',
    //   // 등록할 내용 (스키마 개념이 없어 형태가 자유로움)
    //   document: {
    //     // name: "짱구",
    //     // age: 13,
    //     // school: "다람쥐"
    //     ...createProductInput,
    //   },
    // });


    // productService 의존성 주입으로 create 함수 사용 가능
    // service로 받은 객체를 return을 통해 브라우저로 전달
    // 엘라스틱서치 실습을 위해 임시로 주석처리
    return await this.productService.create({ createProductInput });
  }

  // 수정된 상품을 return 받음
  // 수정 결과를 통해 어떤 부분이 수정되었는지 전달 가능
  // return 값이 Product
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

  // 삭제 결과를 통해 어떤 부분이 수정되었는지 전달 가능
  // 이미 삭제되었기 때문에 Product를 return 받을 수 x
  // 논리 값으로 상품이 있는지 확인 => return Boolean
  // .. 혹은 String으로 "삭제완료" 등의 return ..
  @Mutation(() => Boolean)
  deleteProduct(
    // productId : 삭제조건
    @Args('productId') productId: string, //
  ) {
    // productId를 받아 service에 delete 함수로 넘겨줌
    // .. service 로직에서 delete 가 이루어질 것 ..
    return this.productService.delete({ productId });
  }
}

// Elasticsearch 용어
// 데이터베이스 => 인덱스
// 테이블 => 타입
// 열 => 도큐먼트(엘라스틱서치의 데이터가 저장되는 최소단위)
//                여러개의 도큐먼트는 하나의 타입
//                다시 여러 개의 타입은 하나의 인덱스로 구성
// 행 => 필드
// 스키마 => 매핑