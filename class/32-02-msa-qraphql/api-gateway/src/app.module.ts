// index.js 설정 파일
// dependecy 주입
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloGatewayDriver } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';

@Module({
  // 모듈역할하는 클래스
  // 조립한 클라이언트 정보를 작성하여 gateway로 접속할 시
  // 연결해준 모든 서비스들의 api와 통신할 수 있도록 작성할 것
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'auth', url: 'http://auth-service:3001/graphql' },
            { name: 'resource', url: 'http://resource-service:3002/graphql' },
          ],
        }),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService], // 1 AppService 주입
})
export class AppModule {}
