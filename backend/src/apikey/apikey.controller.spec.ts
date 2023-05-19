import { Test, TestingModule } from '@nestjs/testing';
import { ApikeyController } from './apikey.controller';
import { ApikeyService } from './apikey.service';

describe('ApikeyController', () => {
  let controller: ApikeyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApikeyController],
      providers: [ApikeyService],
    }).compile();

    controller = module.get<ApikeyController>(ApikeyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
