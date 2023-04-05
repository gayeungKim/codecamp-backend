// import { Injectable } from '@nestjs/common';

import { ProductCategory } from './entities/productCategory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCategoryService {
  constructor(
    // repository를 사용하기 위한 것 (테이블명), (테이블과 비지니스 로직 연결)
    @InjectRepository(ProductCategory) //               DB<table>
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}
  // private으로 생성자 선언시 인스턴스 생성이 불가능(외부 접근 x)
  // 사용한 클래스 내부에서만 수정
  // readonly를 통해 생성자 선언시 초기값이 변동 x
  // private + readonly => 클래스 내부에서도 수정이 되지 않는다

  async create({ name }) {
    //            await 데이터가 입력될 때 까지 대기    .save = inserto into
    const result = await this.productCategoryRepository.save({
      //
      name,
      // property shorthand ( k = value )
    });
    console.log(result);

    // .create 데이터 등록
    // .save   데이터 등록 + 등록한 데이터 확인
    // 브라우저에게 result를 return 하기 위해
    // service -> resolver -> blowser
    return result;
  }



}


