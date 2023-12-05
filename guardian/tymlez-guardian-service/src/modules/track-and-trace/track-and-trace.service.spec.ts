import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DeviceConfig } from '../../schemas/device-config.schema';
import { ProcessedMrv } from '../../schemas/processed-mrv.schema';
import { TymlezUser } from '../../schemas/user.schema';
import { TrackAndTraceService } from './track-and-trace.service';

describe('TrackAndTraceService', () => {
  let service: TrackAndTraceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrackAndTraceService,
        {
          provide: 'GuardianClientApi',
          useValue: jest.fn(),
        },
        {
          provide: 'VCDocumentLoaderName',
          useValue: jest.fn(),
        },
        {
          provide: getModelToken(DeviceConfig.name, 'tymlez'),
          useValue: {},
        },

        {
          provide: getModelToken(ProcessedMrv.name, 'tymlez'),
          useValue: {},
        },
        {
          provide: getModelToken(TymlezUser.name, 'tymlez'),
          useValue: {},
        },
        {
          provide: 'guardianConnection',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<TrackAndTraceService>(TrackAndTraceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
