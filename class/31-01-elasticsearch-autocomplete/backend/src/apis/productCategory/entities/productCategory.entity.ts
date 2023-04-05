// productCategory.entity.ts

import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ unique: true })
  // 옵션( unique ) 추가
  @Field(() => String)
  name: string;
}

// @ObjectType, @Field
// graphql에게 무슨 타입인지 명시, (스키마 자동 생성, code-first 방식)