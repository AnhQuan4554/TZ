import { Test, TestingModule } from '@nestjs/testing';
import { BullManagementService } from './bull-management.service';

describe('BullManagementService', () => {
  let service: BullManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BullManagementService],
    }).compile();

    service = module.get<BullManagementService>(BullManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
