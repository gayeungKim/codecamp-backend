import { Test, TestingModule } from '@nestjs/testing';
import { MyserviceService } from './myservice.service';

describe('MyserviceService', () => {
  let service: MyserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyserviceService],
    }).compile();

    service = module.get<MyserviceService>(MyserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
