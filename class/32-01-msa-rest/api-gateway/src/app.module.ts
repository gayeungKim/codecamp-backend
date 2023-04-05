// index.js 설정 파일
// dependecy 주입
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  // 모듈역할하는 클래스
  imports: [
    // ClientsModule: 각 서비스의 정보들을 작성하여 연결이 될 수 있도록 등록
    ClientsModule.register([
      // 객체 하나하나가 서비스
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { host: 'auth-service', port: 3001 },
      },
      {
        name: 'RESOURCE_SERVICE',
        transport: Transport.TCP,
        options: { host: 'resource-service', port: 3002 },
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService], // 1 AppService 주입
})
export class AppModule {}
