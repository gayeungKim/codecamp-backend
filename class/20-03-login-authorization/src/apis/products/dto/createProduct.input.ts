// DTO: Data Transfer Object
// 네트워크 간 데이터 전달 방식 정의 객체
import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductSaleslocationInput } from 'src/apis/productSaleslocation/dto/ProductSaleslocation.input';
// import { OneToOne } from 'typeorm';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => ProductSaleslocationInput)
  productSaleslocation: ProductSaleslocationInput;

  @Field(() => String)
  productCategoryId: string;

  // 태그는 상품당 여러개 생성 될 수 있으므로 배열로 받음
  // 데이터를 받아올 때 다음과 같이 받을 수 있음
  // ["#와", "#배가", "#너무", "#부르다"]
  @Field(() => [String])
  productTags: string[];
}

// 1 : 1 관계

//  entity : ObjectType으로 return시 사용되는 타입
// 현재 파일은 프론트에서 데이터를 어떻게 받아올 것인지에 대한 InputType