// app.module.ts
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    BoardModule,
    ProductModule,
    ProductCategoryModule,
    UserModule,
    AutuModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      // graphql로 들어온 req와 res를 API에서 사용할 수 있게 설정
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql', // 데이터 베이스 타입
      host: 'localhost', // local 환경으로 진행
      port: 3306, // mysql은 기본 port는 3306
      username: 'root', // mysql은 기본 user는 root로 지정
      password: '00000000', // 본인의 mysql password 
      database: 'myproject_product', // 연결할 데이터 베이스명
      entities: [
        Board,
        Product,
        ProductSaleslocation,
        ProductCategory,
        User,
        ProductTag,
        // __dirname + '/apis/**/*.entity.*',
      ], // 데이터 베이스와 연결할 entity
      synchronize: true, // entity 테이블을 데이터베이스와 동기화할 것인지
      logging: true, // 콘솔 창에 log를 표시할 것인지
    }),
  ],
})
export class AppModule {}
