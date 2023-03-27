// 상품 판매 장소 테이블 생성 (typeorm)

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
// class 실행 시, typeourm에 의해 Entity 테이블 생성
export class ProductSaleslocation {
  @PrimaryGeneratedColumn('uuid')
  // 자동 생성 column
  id: string;

  @Column()
  address: string;

  @Column()
  addressDetail: string;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @Column()
  meetingTime: Date;
}

// @Column({ type: 'timestamp' }) : 시간 관련 데이터 타입