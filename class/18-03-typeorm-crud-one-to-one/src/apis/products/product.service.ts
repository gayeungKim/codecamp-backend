import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productSaleslocation/entities/productSaleslocation.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  // 생성자로 Product 엔티티를 비니지스 로직에 의존성 주입
  constructor(
    // constructor 내부에 repository 타입 product를 의존성 주입
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    // constructor 내부에 repository 타입 productSaleslocation 의존성 주입
    // -> module.ts에도 ProductSaleslocation 엔티티 파일ㅇ르 주입시켜야 함
    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,
  ) {}

  // findOne : typeorm 메서드
  // 해당 테이블에서 매개변수로 받은 데이터를 기준(productId)으로
  // 로우를 1개 받아옴
  async findOne({ productId }) {
    return await this.productRepository.findOne({
      // 받아오고자 하는 데이터의 조건
      where: { id: productId },
      // relations : 데이터 조회시 연관된 다른 테이블의 데이터 찾아옴
      // 1:1 관계를 정의했기 때문에
      relations: ['productSaleslocation'],
    });
  }

  async findAll() {
    // 데이터 목록을 모두 가져오는 것이기 때문에 find 사용
    // 1:1 관계를 정의했기 때문에
    return await this.productRepository.find({
      relations: ['productSaleslocation'],
    });
  }

  // 클라이언트에서 createProductAPI 요청시
  // 1 상품 거래 위치 테이블에 데이터 등록
  // 2 등록한 상품 거래 위치 테이블의 id로 상품 테이블에 데이터 등록
  async create({ createProductInput }) {
    // 1 상품만 등록하는 경우( 위치 x )
    // const result = await this.productRepository.save({
    //   // ...createProductInput : 구조분해 할당 + rest 파라미터(...product) 를 이용해 분리
    //   // 상품 테이블에 createProductInput의 productSaleslocation을 제외한 product만 저장
    //   ...createProductInput, // 스프레드연산자 사용

    //   // 하나하나 직접 나열하는 방식
    //   // name: createProductInput.name,
    //   // description: createProductInput.description,
    //   // price: createProductInput.price,
    // });
    // console.log(result);
    // // resolve로 전달
    // // return result;

    // 2 상품과 상품 거래 위치를 같이 등록하는 경우
    const { productSaleslocation, ...product } = createProductInput;
    // result: 생성한 데이터
    // result 대신 {id:result.id} 작성
    // -> return시 result 안에 있는 productSaleslocation의 id만 반환됨
    const result = await this.productSaleslocationRepository.save({
      // 스프레드 연산자를 사용해 저장
      // ...createProductInput.productSaleslocation
      ...productSaleslocation,
    });

    // result2 = product 데이터 + productSaleslocation 데이터가 할당된 result
    const result2 = await this.productRepository.save({
      ...product,
      productSaleslocation: result, // result를 그대로 넣음
      // productSaleslocation: {
      // id: result.id
      // }, // id 만 넣음

      // result를 그대로 넣는 이유
      // ProductSaleslocation 데이터 전체를 프론트에서 받아 사용하기 위함
      // id만 저장한다면? 프론트가 id만 받아 사용하게 됨
    });
    // 등록된 상품 객체를 result2 변수에 담아 브라우저로 다시 전달히기 위해
    // 함수가 실행되는 resolver로 return
    return result2;
  }

  async update({ productId, updateProductInput }) {
    // 수정할 데이터를 찾아옴
    // return 받는 값에 수정한 컬럼을 포함한 다른 컬럼이 있다면
    // findone이 먼저 실행되어야 함
    const myproduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    const newProduct = {
      ...myproduct,
      id: productId,
      ...updateProductInput,
    }; // ..?

    return await this.productRepository.save(newProduct);
  }

  // 상품이 판매가능한 상태인지 확인하는 로직
  async checkSoldout({ productId }) {
    // 판매가 가능해야 수정이 가능한 상태
    // 판매 가능한 상태인지 확인하기 위해 데이터 확인
    const product = await this.productRepository.findOne({
      where: { id: productId /*, isDeleted: false */ },
    });

    // 만약에 판매가 되었다면
    if (product.isSoldout)
      // 에러메세지 전달 (판매 불가능, 수정 불가능)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');

    // if (product.isSoldout) {
    //   // threow new HttpException(에러메세지,에러상태) 
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     // nestjs 제공 에러 코드
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }

  async delete({ productId }) {
    // 1 물리삭제
    // 삭제할 데이터를 찾아옴
    // 전달받은 Id에 일치하는 product 삭제
    // const result = await this.productRepository.delete({ id: productId });
    // 삭제 결과는 객체로 올 것, result 변수에 담아서 이상 없는지 확인
    // => affected 사용
    // 삭제 완료 -> true , 삭제 미완료 -> false
    // return result.affected ? true : false;

    // 2 논리삭제
    // .update : 수정된 객체 자체를 받아오는 것이 아니라
    // affected와 row를 사용해 수정된 정보를 받아옴
    // 차이
    // .save : 저장되는 객체 자체를 받아옴
    //   const updateInfo = await this.productRepository.update(
    //     { id: productId },
    //     { isDeleted: true },
    //   );
    //   updateInfo.affected;
    //   // updateInfo.row;
    //   // await this.productRepository.update({ id: productId }, { isDeleted: true });
    //   // await this.productRepository.save({ id: productId }, { isDeleted: true });
    //
    // .. +) 삭제 날짜
    // null -> product 존재 상태
    // notnull -> 삭제 상태
    // await this.productRepository.update(
    //   { id: productId },
    //   { deleteAt: new Date() },
    // );
    //
    // .. softRemove 함수 사용 ( 단일 행 삭제 )
    // 코드 간결성
    // await this.productRepository.softRemove({ id: productId });
    //
    // .. softDelete 함수 사용 ( id 외 다른 컬럼 이용 가능, 여러개의 행 삭제제 )
    const result = await this.productRepository.softDelete({ id: productId });
    // affected 값 = 삭제된 행 개수
    // return 이 없으면 오류뜰거임
    return result.affected ? true : false;
  }

  // 물리 삭제 : product.delete 와 같이 데이터를 완전히 삭제하는 것,
  //         데이터를 복구해야 하는 경우도 있기 때문에 주의
  // 논리 삭제 : soft delete, 삭제 여부를 나타내는 속성을 추가하는 것
  //     - soft delete, soft remove: 논리 삭제를 제공하는 typeorm 함수
  // 논리 삭제 구현 -> product.entity.ts
}
// 비니지스 로직에서 데이터를 저장하는 방법
// 1 하나씩 나열해서 저장
// 2 스프레드 문법으로 객체를 펼쳐 저장 ( 코드 간결의 장점 )

// 에러코드
// 200 ~ : 성공 상태 코드
// 400 ~ : 프론트 요청 오류
// 500 ~ : 백엔드 서버 오류

// 위 예측 가능한 에러와 달리 예측 불가능한 에러 처리
// try ~ catch : 어디서 에러가 발생했는지 확인

// try {
// 오류 발생 확인, 오류 없으면 try문 안의 로직 실행
// } catch(error) {
//   // sentry.io
// 오류 발생시 실행 로직
//   throw error // 프론트로 에러 반환
// } finally {
// 오류와 관계없이 무조건 실행 로직
// }

// exception-filter

// delete
// 1 물리 삭제
// 2 논리 삭제 - 삭제 상태 컬럼
// 3 논리 삭제 - 삭제 시간 컬럼
// 4 typeorm - soft remove : 로우 한개 삭제
// 5 typeorm - soft delete : 로우 여러개 삭제