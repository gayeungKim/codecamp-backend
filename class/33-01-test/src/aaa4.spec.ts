// -- Mocking 실습 --
// Mocking은 단위 테스트 작성시 해당 코드가 의존하는 부분을 mock(가짜)로 대체하는 것
// 일반적으로 테스트하려는 코드가 의존하는 부분을 직접 생성하기가 부담스러운 경우 사용

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 실제 db 대신에 mock로 test
class MockAppService {
  getHello() {
    return 'Hello World!';
  }
}

describe('AppController', () => {
  // 기능을 테스트할 AppService와 AppController 주입을 위해 변수 선언
  // let appService: AppService;
  let appController: AppController;

  beforeEach(async () => {
    // TestingModule은 app.module.ts의 역할
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useClass: MockAppService, // 나만의 AppService 주입
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController)

    // 테스트 전에 AppService와 AppController 연결
    // 서비스 주입으로 API 기능 테스트를 진행할 수 있을 것
    // appService = new AppService();
    // appController = new AppController(appService);
  });

  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함!!', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

// NestJS는 Dependency Injection을 통해 각 Module을 캡슐화하여 서로
// 의존성을 배재하는 특징이 있음