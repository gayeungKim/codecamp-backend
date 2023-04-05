// index.js 설정 파일
// dependecy 주입
import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  // 모듈역할하는 클래스
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    })
  ],
  // controllers: [AppController],
  providers: [AppService, AppResolver], // 1 AppService 주입
})
export class AppModule {}
// yarn add @nestjs/apollo
// yarn add @nestjs/graphql
// yarn add apollo-server-express
// yarn add graphql
