// DTO: Data Transfer Object
// 네트워크 간 데이터 전달 방식 정의 객체
// productSaleslocation.input.ts
import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSaleslocation } from '../entities/productSaleslocation.entity';

@InputType()
export class ProductSaleslocationInput extends OmitType(
  ProductSaleslocation,
  ['id'],
  InputType,
) {
  // @Field(() => String)
  // address: string;
  // ...
  // => 위처럼 모두 적어야 하지만, PickType 또는 OmitType을 활용하여 타입 재사용
}

// PickType : 원하는 컬럼만 뽑아서 사용
// OmitType : 원하는 컬럼만 제거해서 사용