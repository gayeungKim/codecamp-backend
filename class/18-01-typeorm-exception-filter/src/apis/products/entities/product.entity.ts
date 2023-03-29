import { ProductTag } from 'src/apis/productTags/entities/productTags.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productSaleslocation/entities/productSaleslocation.entity';
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

  @JoinColumn()
  @OneToOne(() => ProductSaleslocation)
  @Field(() => ProductSaleslocation)
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