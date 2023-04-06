import { AppController } from './app.controller';
import { AppService } from './app.service';

// test 실습할 AppService와 AppController를 연결
// => 서비스 주입으로 API 기능 테스트 진행 가능
describe('AppController', () => {
  let appService: AppService;
  let appController: AppController;

  beforeEach(() => {
    appService = new AppService();
    appController = new AppController(appService);
  })

  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야 함!', () => {
      const result = appController.getHello();
      expect(result).toBe('Hello World!');
    })
  })
})