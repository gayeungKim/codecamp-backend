import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // AppModule을 create이 아닌 createMicroservice로 등록
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    // 어떤 서비스인지, 어떻게 연결할건지
    {
      // 네트워크 전송계층
      transport: Transport.TCP,
      options: {
        // 호스트명
        host: 'auth-service',
        // 포트
        port: 3001,
      }

    }
  )
  await app.listen();
}
bootstrap(); // 실행하는 핵심 부분
