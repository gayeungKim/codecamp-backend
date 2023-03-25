// index.js 설정 파일
// dependecy 주입
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardModule } from './apis/boards/boards.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  // 모듈역할하는 클래스
  imports: [
    BoardModule,
    // forRoot() 메서드는 옵션 객체를 인수로 받을 수 있음
    // 옵션은 ApolloServer 생성자(constructor)에 전달됨
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      // 작성한 파일 경로로 SchemaFile이 자동으로 만들고 실행
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService], // 1 AppService 주입
})
export class AppModule {}
