// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// describe('AppController', () => {
//   // 기능을 테스트할 AppService와 AppController 주입을 위해 변수 선언
//   let appService: AppService;
//   let appController: AppController;

//   beforeEach(() => {
//     // 테스트 전에 AppService와 AppController 연결
//     // 서비스 주입으로 API 기능 테스트를 진행할 수 있을 것
//     appService = new AppService();
//     appController = new AppController(appService);
//   });

//   describe('getHello', () => {
//     it('이 테스트의 검증 결과는 hello world를 리턴해야함', () => {
//       const result = appController.getHello();
//       expect(result).toBe('Hello World!');
//     })
//   });
// })