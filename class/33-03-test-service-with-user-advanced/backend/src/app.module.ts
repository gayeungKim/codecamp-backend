// app.module.ts
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/boards/boards.module';
import { ProductCategoryModule } from './apis/productCategory/productCategory.module';
import { ProductModule } from './apis/products/product.module';
import { UserModule } from './apis/users/user.module';
import { AutuModule } from './apis/auth/auth.module';
import { Product } from './apis/products/entities/product.entity';
import { ProductSaleslocation } from './apis/productSaleslocation/entities/productSaleslocation.entity';
import { ProductCategory } from './apis/productCategory/entities/productCategory.entity';
import { User } from './apis/users/entities/user.entity';
import { ProductTag } from './apis/productTags/entities/productTags.entity';
import { Board } from './apis/boards/entities/board.entity';
import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module';
import { PointTransaction } from './apis/pointTransaction/entities/pointTransaction.entity';
import { PaymentModule } from './apis/payment/payment.module';
import { Payment } from './apis/payment/entities/payment.entity';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    BoardModule,
    ProductModule,
    ProductCategoryModule,
    UserModule,
    AutuModule,
    PointTransactionModule,
    PaymentModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      // graphql로 들어온 req와 res를 API에서 사용할 수 있게 설정
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql', // 데이터 베이스 타입
      host: 'my-database', // local 환경으로 진행
      port: 3306, // mysql은 기본 port는 3306
      username: 'root', // mysql은 기본 user는 root로 지정
      password: 'root', // 본인의 mysql password 
      database: 'mydocker03', // 연결할 데이터 베이스명
      entities: [
        Board,
        Product,
        ProductSaleslocation,
        ProductCategory,
        User,
        ProductTag,
        PointTransaction,
        Payment,
        // __dirname + '/apis/**/*.entity.*',
      ], // 데이터 베이스와 연결할 entity
      synchronize: true, // entity 테이블을 데이터베이스와 동기화할 것인지
      logging: true, // 콘솔 창에 log를 표시할 것인지
    }),
    // redis를 backend server와 연결
    // <> : register에 typescript
    CacheModule.register<RedisClientOptions>({
      // store: 저장할 위치
      store: redisStore,
      // url: redis 주소
      url: 'redis://my-redis:6379',
      // isGlobal: 모든 api에서 사용가능하게 함
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
