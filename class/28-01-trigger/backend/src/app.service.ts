import { Injectable } from '@nestjs/common';

@Injectable() // 데코레이터
export class AppService {
  getHello(): string {
    // string: 함수의 return type
    // 3-1 this.appService 에 있는 기능
    return 'Hello World!';
  }
}
