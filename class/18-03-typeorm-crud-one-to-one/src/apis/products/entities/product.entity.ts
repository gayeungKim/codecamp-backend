import { ProductTag } from 'src/apis/productTags/entities/productTags.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productSaleslocation/entities/productSaleslocation.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

// Product에 대한 graphql type 지정을 하지 않았기 때문에
// code-first 기능을 활용하여 entity를 만들어 준것
@Entity()
@ObjectType() // graphql을 위함
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String) // graphql을 위함
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: false }) // 데이터 저장시 초기값 설정
  @Field(() => Boolean)
  isSoldout: boolean;

  // // soft delete를 위한 삭제 여부 표시 컬럼 추가
  // // 초기값은 false, 삭제 요청시 true로 update (api 필요) -> service.ts
  // @Column({ default: false })
  // @Field(() => Boolean)
  // isDeleted: boolean;

  // // 삭제 시기
  // // null 허용
  // @Column({ nullable: true })
  // @Field(() => Date)
  // deleteAt: Date;

  // typeorm 제공 함수
  // 옵션 defalte = datetime
  // 기존 : 데이터 조회시 조건을 주어야 함
  // softdelete : 조건 없이도 삭제되지 않은 데이터만 조회
  @DeleteDateColumn()
  deleteAt: Date;

  @JoinColumn()
  @OneToOne(() => ProductSaleslocation)
  @Field(() => ProductSaleslocation)
  @Field({ nullable: true })
  // 모든 product에 위치가 있는 것이 아니었음 = null 이 있을 가능성
  // 널값을 허용해 위치 데이터가 없는 데이터도 조회할 수 있게끔
  productSaleslocation: ProductSaleslocation;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  @Field(() => [ProductTag]) // graphql 배열 타입
  productTags: ProductTag[]; // typescript 배열 타입
}

// 1 createProduct API 요청
// 2 데이터 등록
// 3 등록된 데이터가 Product type으로 리턴