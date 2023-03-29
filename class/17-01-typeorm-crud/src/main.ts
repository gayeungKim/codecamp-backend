import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // 모듈 등록
  const app = await NestFactory.create(AppModule);
  // main.ts app.* 최종적으로 실행하는 부분
  // ValidationPipe와 연결
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap(); // 실행하는 핵심 부분

// Pipe : 데이터가 오고가는 흐름에 있어 데이터 검증과 필터링 역할
// price에 음수가 들어가면 error 발생으로 api 요청이 이루어지지 x