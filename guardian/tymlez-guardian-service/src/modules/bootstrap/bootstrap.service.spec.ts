import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DeviceConfig } from '../../schemas/device-config.schema';
import { TymlezUser } from '../../schemas/user.schema';
import { BootstrapService } from './bootstrap.service';

describe('BootstrapService', () => {
  let service: BootstrapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BootstrapService,
        {
          provide: 'GuardianClientApi',
          useValue: jest.fn(),
        },
        {
          provide: getModelToken(DeviceConfig.name, 'tymlez'),
          useValue: {},
        },
        {
          provide: getModelToken(TymlezUser.name, 'tymlez'),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<BootstrapService>(BootstrapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
