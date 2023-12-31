import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DeviceConfig } from '../../schemas/device-config.schema';
import { ProcessedMrv } from '../../schemas/processed-mrv.schema';
import { TymlezUser } from '../../schemas/user.schema';
import { TrackAndTraceController } from './track-and-trace.controller';
import { TrackAndTraceService } from './track-and-trace.service';

describe('TrackAndTraceController', () => {
  let controller: TrackAndTraceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrackAndTraceController],
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

    controller = module.get<TrackAndTraceController>(TrackAndTraceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
