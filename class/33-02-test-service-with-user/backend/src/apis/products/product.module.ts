import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from '../productCategory/entities/productCategory.entity';
import { ProductSaleslocation } from '../productSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from '../productTags/entities/productTags.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { ProductSubscriber } from './entities/product.subscriber';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  // TypeOrmModule.forFeature(메서드) : 엔티티 전달
  // typeorm을 이용한 데이터베이스 연동
  // ProductSaleslocation 추가해야만 repository 사용가능
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductSaleslocation,
      ProductCategory,
      ProductTag,
    ]),
    // elasticsearch를 backend server와 연결하기 위해
    // ElasticsearchModule 장착
    // node: elasticsearch의 주소(docker의 elasticsearch와
    // 연결되기 때문에 네임리졸루션 사용)
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
  ],
  // ProductResolver, ProductService 주입
  providers: [
    ProductResolver, //
    ProductService,
    ProductSubscriber
  ],
})
export class ProductModule {}