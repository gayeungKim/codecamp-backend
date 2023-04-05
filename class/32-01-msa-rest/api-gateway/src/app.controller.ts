import { Controller, Get, Inject } from '@nestjs/common';
// import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller() // 데코레이터, 필수 // 컨트롤러역할하는 클래스
export class AppController {
  // appService (nestjs가 의존성 주입, dependency insection)
  // 제어를 nestjs가 함 = inversion control
  constructor(
    // private readonly appService: AppService
    @Inject('AUTH_SERVICE')
    private readonly clientAuthService: ClientProxy,

    @Inject('RESOURCE_SERVICE')
    private readonly clientResourceService: ClientProxy
    ) {
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

  // api가 요청되면 auth service로 트래픽을 넘겨줄 것
  @Get('/auth/login')
  login(){
    // auth service와의 연결정보
    // cmd: 호출할 함수
    return this.clientAuthService.send({ cmd: 'aaa' }, { name: '짱구' });

  }

  @Get('/Board')
  fetchBoards(){
    return this.clientResourceService.send({ cmd: 'bbb' }, { age: 13 });
  }
}

// api는 api-gateway의 controller에만 요청할 것
// login api 요청시 auth의 controller의 로직으로
// fetchboard api 요청시 resource 로직으로