// board.entity.ts

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType() // 객체 형태 grahql 타입으로 변경
export class Board {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int) // graphql field 임을 명시, 타입 지정
  number: number; // typeScript

  @Column()
  @Field(() => String)
  writer: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;
}