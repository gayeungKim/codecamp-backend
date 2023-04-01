// DTO: Data Transfer Object
// 네트워크 간 데이터 전달 방식 정의 객체
import { /*Field,*/ InputType, /* Int,*/ PartialType } from '@nestjs/graphql';
// import { Min } from 'class-validator';
import { CreateProductInput } from './createProduct.input';

@InputType()
// create와 구조가 동일하기 때문에 참조해서 사용가능
// create 구조 변동 시 update를 수정할 필요 x
// extends : create 상속 받음
// PrtialType : 모든 컬럼을 선택사항으로 변경 = nullable: true
// PickType : 특정 컬럼만 사용
// PickType(CreateProductInput, ["name","price"])
// OmitType : 특정 컬럼 제외 사용
// OmitType(CreateProductInput, ["description"])
// TypeScript 에서도 위를 제공 (Utility Types)
export class UpdateProductInput extends PartialType(CreateProductInput) {}

// 아래와 같이 작성 시 create가 달리지면 update도 수정해야 함
// @InputType()
// export class UpdateProductInput {
//   // nullable : 모든 데이터를 수정하지 않을 수도  있기 때문에 옵션 추가
//   @Field(() => String, { nullable: true})
//   name: string;

//   @Field(() => String, { nullable: true})
//   description: string;

//   @Min(0)
//   @Field(() => Int, { nullable: true})
//   price: number;
// }