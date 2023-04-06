// NestJS는 Dependency Injection을 통해 각 Module을 캡슐화하여 서로 의존성을 배재함

// -- Testing module 실습 --
// NestJS에서 제공하는 @nestjs/testing 패키지를 사용하면 종속성만 선언해 모듈을 만들고
// 해당 모듈로 Service, Repository를 가져올 수 있음

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// test 실습할 AppService와 AppController를 연결
// => 서비스 주입으로 API 기능 테스트 진행 가능
describe('AppController', () => {
  // let appService: AppService;
  let appController: AppController;

  beforeEach(async () => {
    // app이라는 TestingModule 생성
    // Testing module은 app.module.ts의 역할을 함
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    // appService = new AppService();
    // get<AppController>(AppService)를 작성해 app에서 AppController를 가져옴
    // appController 변수에 할당하여 Testing module을 연결
    appController = app.get<AppController>(AppService);
  })

  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야 함!', () => {
      // const result = appController.getHello();
      expect(appController.getHello()).toBe('Hello World!');
    })
  })
})

// app.controller.spec.ts와 동일할 것
// NestJS에서 제공하는 @nestjs/testing 패키지를 사용하여 Dependency Injection이 구현됨