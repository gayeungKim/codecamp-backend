// 상품 카테고리 테이블 생성 (typeorm)

import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
// class 실행 시, typeourm에 의해 Entity 테이블 생성
export class ProductTags {
  @PrimaryGeneratedColumn('uuid')
  // 자동 생성 column
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Product, (products) => products.productTags)
  products: Product[];
}