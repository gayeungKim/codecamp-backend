// index.js 설정 파일
// dependecy 주입
import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  // 모듈역할하는 클래스
  imports: [
    // Nest에서 GraphQL을 마이크로서비스로 분리하기 위해 Federation 사용
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
  ],
  // controllers: [AppController],
  providers: [AppService, AppResolver], // 1 AppService 주입
})
export class AppModule {}
