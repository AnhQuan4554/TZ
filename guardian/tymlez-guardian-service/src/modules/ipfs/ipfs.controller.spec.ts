import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { TymlezUser } from '../../schemas/user.schema';
import { IpfsController } from './ipfs.controller';
import { IpfsService } from './ipfs.service';

describe('IpfsController', () => {
  let controller: IpfsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IpfsController],
      providers: [
        IpfsService,
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

    controller = module.get<IpfsController>(IpfsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
