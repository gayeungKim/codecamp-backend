import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  // TypeOrmModule.forFeature(메서드) : 엔티티 전달
  // typeorm을 이용한 데이터베이스 연동
  imports: [TypeOrmModule.forFeature([Product])],
  // ProductResolver, ProductService 주입
  providers: [
    ProductResolver, //
    ProductService,
  ],
})
export class ProductModule {}