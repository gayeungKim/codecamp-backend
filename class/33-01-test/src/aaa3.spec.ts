// // -- Testing module 실습 --
// // 각 Module을 캡슐화 하여 서로 의존성을 배재함

// import { Test, TestingModule } from '@nestjs/testing';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// describe('AppController', () => {
//   // 기능을 테스트할 AppService와 AppController 주입을 위해 변수 선언
//   // let appService: AppService;
//   let appController: AppController;

//   beforeEach(async () => {
//     // TestingModule은 app.module.ts의 역할
//     const appModule: TestingModule = await Test.createTestingModule({
//       controllers: [AppController],
//       providers: [AppService]
//     }).compile();

//     appController = appModule.get<AppController>(AppController)

//     // 테스트 전에 AppService와 AppController 연결
//     // 서비스 주입으로 API 기능 테스트를 진행할 수 있을 것
//     // appService = new AppService();
//     // appController = new AppController(appService);
//   });

//   describe('getHello', () => {
//     it('이 테스트의 검증 결과는 hello world를 리턴해야함', () => {
//       expect(appController.getHello()).toBe('Hello World!');
//     })
//   });
// })

// // NestJS는 Dependency Injection을 통해 각 Module을 캡슐화하여 서로
// // 의존성을 배재하는 특징이 있음