import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DeviceConfig } from '../../schemas/device-config.schema';
import { TymlezUser } from '../../schemas/user.schema';
import { BootstrapController } from './bootstrap.controller';
import { BootstrapService } from './bootstrap.service';

describe('BootstrapController', () => {
  let controller: BootstrapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BootstrapController],
      providers: [
        BootstrapService,
        {
          provide: getModelToken(DeviceConfig.name, 'tymlez'),
          useValue: {},
        },
        {
          provide: 'GuardianClientApi',
          useValue: jest.fn(),
        },
        {
          provide: getModelToken(TymlezUser.name, 'tymlez'),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BootstrapController>(BootstrapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
