import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductCategoryResolver } from './productCategory.resolver';
import { ProductCategoryService } from './productCategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  // 사용하는모듈.특정테이블사용([사용하는 테이블을 배열로 입력])
  // TypeOrmModule.forFeature 엔티티를 전달
  // resolver와 service에서 무엇을 사용하는지 module에서 파악하기 위함
  // 강한 결합을 해결하기 위해 의존성을 주입
  // => module에서 resolver와 service에 주입
  
  providers: [
    ProductCategoryResolver, //
    ProductCategoryService,
  ],
})

export class ProductCategoryModule {}