import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 모듈 등록
  await app.listen(3000);
}
bootstrap(); // 실행하는 핵심 부분
