import { Test, TestingModule } from '@nestjs/testing';
import { BullManagementController } from './bull-management.controller';

describe('BullManagementController', () => {
  let controller: BullManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BullManagementController],
    }).compile();

    controller = module.get<BullManagementController>(BullManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
