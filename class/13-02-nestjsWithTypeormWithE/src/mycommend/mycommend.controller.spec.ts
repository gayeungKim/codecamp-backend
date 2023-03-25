import { Test, TestingModule } from '@nestjs/testing';
import { MycommendController } from './mycommend.controller';

describe('MycommendController', () => {
  let controller: MycommendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MycommendController],
    }).compile();

    controller = module.get<MycommendController>(MycommendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
