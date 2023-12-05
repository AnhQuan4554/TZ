import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PlatformService } from '../platform/platform.service';
import { StorageService } from '../storage/storage.service';
import { IngestionService } from './ingestion.service';
import { PlatformProvider } from '../platform/platform.provider';

describe('IngestionService', () => {
  let service: IngestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        IngestionService,
        StorageService,
        PlatformProvider,
        PlatformService,
      ],
    }).compile();

    service = module.get<IngestionService>(IngestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
