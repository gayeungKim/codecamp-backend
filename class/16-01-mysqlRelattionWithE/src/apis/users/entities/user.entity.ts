// 상품 카테고리 테이블 생성 (typeorm)

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
// class 실행 시, typeourm에 의해 Entity 테이블 생성
export class User {
  @PrimaryGeneratedColumn('uuid')
  // 자동 생성 column
  id: string;

  @Column()
  email: string;
  
  @Column()
  password: string;
  
}