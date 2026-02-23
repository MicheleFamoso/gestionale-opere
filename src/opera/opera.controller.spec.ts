import { Test, TestingModule } from '@nestjs/testing';
import { OperaController } from './opera.controller';
import { OperaService } from './opera.service';

describe('OperaController', () => {
  let controller: OperaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperaController],
      providers: [OperaService],
    }).compile();

    controller = module.get<OperaController>(OperaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
