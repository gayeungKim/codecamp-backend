// 상품 테이블 생성 (typeorm)

import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductSaleslocation } from 'src/apis/productSaleslocation/entities/productSaleslocation.entity';
import { ProductTags } from 'src/apis/productTags/entities/productTags.entity';
import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { User } from 'src/apis/users/entities/user.entity';

@Entity()
// class 실행 시, typeourm에 의해 Entity 테이블 생성
export class Product {
  @PrimaryGeneratedColumn('uuid')
  // 자동 생성 column
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  isSoldout: boolean;

  @JoinColumn()
  @OneToOne(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  //   @JoinColumn() 
  // Many 부분에 해당하는 테이블(Product 테이블)에서는 생략가능
  @ManyToOne(() => ProductCategory)
  // N : 1 관계
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  user: User;

  // **
  @JoinTable()
  // N : M 관계
  // 중간 테이블이 자동 생성 됨으로, 기준이 되는 테이블 한쪽에만 JoinTable() 작성
  @ManyToMany(() => ProductTags, (productTags) => productTags.products)
  productTags: ProductTags[];
}

// soledAt : Date
// 상품이 팔렸을 경우 데이터가 채워짐 -> 비었다면 false 상태
// type을 Date로 둔다면 (팔렸는지 안팔렸는지 + 언제 팔렸는지)

// 두 테이블의 관계
// OneToOne : 테이블 한쪽에만 쓰거나 양쪽 다 씀, JoinColum 명시 필수
// ManyToOne : N : 1 관계를 나타냄, Many에 해당하는 테이블에서는 JoinColum 생략가능
// JoinColum : 두 테이블을 join하는 경우, 한 테이블만 씀
// => Product 테이블과 ProductSaleslocation 테이블이 Join 됨
// ProductSalelocation -> 1 : 1 Entity 관계 구현
// ProductCategory -> 1 : N Entity 관계 구현
// User -> M : N Entity 관계 구현

// **
// N : M 연결은 두 테이블 사이 N_M 테이블이 존재 (테이블 연결 시 자동 생성)