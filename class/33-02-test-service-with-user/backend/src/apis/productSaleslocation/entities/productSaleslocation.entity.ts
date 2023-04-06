// productSaleslocation.entity.ts

import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType() // graphql type 추가
export class ProductSaleslocation {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  addressDetail: string;

  @Column()
  @Field(() => Float)
  lat: number;

  @Column()
  // Float 소수점이 들어가는 숫자
  @Field(() => Float)
  lng: number;

  @Column()
  // Date 날짜 타입 지정
  @Field(() => Date)
  meetingTime: Date;
}