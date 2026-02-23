import { Test, TestingModule } from '@nestjs/testing';
import { OperaService } from './opera.service';

describe('OperaService', () => {
  let service: OperaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperaService],
    }).compile();

    service = module.get<OperaService>(OperaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
