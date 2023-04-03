import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/graphql/filter/http-exception.filter';

async function bootstrap() {
  // 모듈 등록
  const app = await NestFactory.create(AppModule);

  // -----**********************************************-----
  const cors = require('cors');
  const corsOptions = {
    origin: '*', // 출처 허용 옵션
    credential: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
  }
  // -----**********************************************-----
  // 10 ~ 14
  // cors 오류 (요청 port와 응답 port가 다를 때 발생)
  // yarn add cors
  // https://velog.io/@723poil/Node.js-CORS-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0
  app.use(cors(corsOptions))
  // main.ts app.* 최종적으로 실행하는 부분
  // ValidationPipe와 연결
  app.useGlobalPipes(new ValidationPipe());
  // http-exception.filter.ts 에서 작성한 예외 처리 등록
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap(); // 실행하는 핵심 부분

// Pipe : 데이터가 오고가는 흐름에 있어 데이터 검증과 필터링 역할
// price에 음수가 들어가면 error 발생으로 api 요청이 이루어지지 x

// 실제 서비스 배포시 에러가 저장될 DB를 이용해
// 어떤 에러가 얼마나 발생했는지 판단
// -> 어떤 문제가 서버에 발생했는지 확인 가능