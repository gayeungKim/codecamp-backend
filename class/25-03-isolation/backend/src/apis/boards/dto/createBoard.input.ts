// DTO: Data Transfer Oject
// 네트워크 간 데이터 전달 방식 정의 객체
import { InputType, Field } from '@nestjs/graphql';
// gql에게 inputtype 명시

@InputType()
export class CreateBoardInput {
  @Field(() => String)
  writer: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  contents: string;
}