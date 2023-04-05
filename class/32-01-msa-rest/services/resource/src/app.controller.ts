import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller() // 데코레이터, 필수 // 컨트롤러역할하는 클래스
export class AppController {
  // appService (nestjs가 의존성 주입, dependency insection)
  // 제어를 nestjs가 함 = inversion control
  constructor(private readonly appService: AppService) {
    // 2 module에서 주입한 AppService(return type) 들어옴
    // this.appService = appService; // 3-1 app.service에서 가져온 기능 사용 가능
    // private readonly(안에서만 사용 가능, 수정은 x)로 받아오면 위 코드 생략 가능
  }
  // // @Get('주소')
  // @Get('/aaa') // 데코레이터 = 함수
  // getHello(): string {
  //   // string: 함수의 return type
  //   return this.appService.getHello();
  // }

  // cmd: 호출 당할 함수
  @MessagePattern({ cmd: 'bbb' })
  fetchBoards() {
    return 'fetchBoards 게시글 조회 성공';
  }
}
