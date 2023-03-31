// try ~ catch 를 모든 함수에 작성하면 코드가 길어짐
// ExceptionFilter(NestJS) 사용으로 모든 함수의 에러 관리 가능

import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

// http exception 발생시 자동 처리
// 아래 내용이 에러 관련이라 명시
@Catch(HttpException)
// implements : class 에서 타입 정의
// ExceptionFilter : 인터페이스, catch 함수가 반드시 존재해야 하는 타입
//                  ( catch 작성을 안하면 에러가 발생할 것 )
export class HttpExceptionFilter implements ExceptionFilter {
  // 데코레이터가 없으면 class

  catch(exception: HttpException) {
    //             에러가 발생한 상태코드
    const status = exception.getStatus();
    //             상태코드 메세지
    const message = exception.message;

    console.log('=============');
    console.log('에러 발생');
    console.log('예외내용: ', message);
    console.log('예외코드: ', status);
    console.log('=============');
  }
}

// 위 작성한 파일을 main.ts 에서 조립해야 함 -> main.ts
