import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  // 생성자로 Product 엔티티를 비니지스 로직에 의존성 주입
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // findOne : typeorm 메서드
  // 해당 테이블에서 매개변수로 받은 데이터를 기준(productId)으로
  // 로우를 1개 받아옴
  async findOne({ productId }) {
    //                                            받아오고자 하는 데이터의 조건
    return await this.productRepository.findOne({ where: { id: productId } });
  }

  async findAll() {
    // 데이터 목록을 모두 가져오는 것이기 때문에 find 사용
    return await this.productRepository.find();
  }

  async create({ createProductInput }) {
    const result = await this.productRepository.save({
      ...createProductInput, // 스프레드연산자 사용

      // 하나하나 직접 나열하는 방식
      // name: createProductInput.name,
      // description: createProductInput.description,
      // price: createProductInput.price,
    });
    // resolve로 전달
    return result;
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
    };

    return await this.productRepository.save(newProduct);
  }

  // 상품이 판매가능한 상태인지 확인하는 로직
  async checkSoldout({ productId }) {
    // 판매가 가능해야 수정이 가능한 상태
    // 판매 가능한 상태인지 확인하기 위해 데이터 확인
    const product = await this.productRepository.findOne({
      where: { id: productId },
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