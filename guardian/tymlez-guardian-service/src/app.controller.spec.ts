import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: 'GuardianClientApi',
          useValue: jest.fn(),
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('app controller tests 1', () => {
    it('should return info', () => {
      expect(appController.getInfo()).not.toBeNull();
    });
  });
});
