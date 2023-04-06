// NestJS는 Dependency Injection을 통해 각 Module을 캡슐화하여 서로 의존성을 배재함
// 따라서 NestJS의 Test 환경을 조성할 경우 의존성을 주입하지 않고
// 의존성 자체를 Mocking 해야 함. 즉, Unit Test를 하기 위해 실제 코드가
// 실행되는 환경과 같은 환경을 조성

// -- Testing module 실습 --
// NestJS에서 제공하는 @nestjs/testing 패키지를 사용하면 종속성만 선언해 모듈을 만들고
// 해당 모듈로 Service, Repository를 가져올 수 있음

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// class를 사용하여 AppService와 동일한 환경 구축
class MockAppService {
  getHello() {
    return 'Hello World!';
  }
}

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    // app이라는 TestingModule 생성
    // Testing module은 app.module.ts의 역할을 함
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useClass: MockAppService, // 나만의 AppService 주입
        },
      ],
    }).compile();

    // get<AppController>(AppService)를 작성해 app에서 AppController를 가져옴
    // appController 변수에 할당하여 Testing module을 연결
    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야 함!', () => {
      // const result = appController.getHello();
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
})

// app.controller.spec.ts와 동일할 것
// NestJS에서 제공하는 @nestjs/testing 패키지를 사용하여 Dependency Injection이 구현됨
