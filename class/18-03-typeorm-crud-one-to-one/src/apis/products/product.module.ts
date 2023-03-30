import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSaleslocation } from '../productSaleslocation/entities/productSaleslocation.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  // TypeOrmModule.forFeature(메서드) : 엔티티 전달
  // typeorm을 이용한 데이터베이스 연동
  // ProductSaleslocation 추가해야만 repository 사용가능
  imports: [TypeOrmModule.forFeature([Product, ProductSaleslocation])],
  // ProductResolver, ProductService 주입
  providers: [
    ProductResolver, //
    ProductService,
  ],
})
export class ProductModule {}