import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 모듈 등록
  // 3000번 port로 기본 Nest 앱을 생성
  await app.listen(3000);
}
bootstrap(); // 실행하는 핵심 부분

// rest-api 파일 설정과는 다르게 graphql-api는 각각
// 독립적으로 움직이기 때문에 각 서비서의 포트번호만 변경