import { Test, TestingModule } from '@nestjs/testing';
import { PinoLogger } from 'nestjs-pino';
import { GuardianLogsService } from './guardian-logs.service';

describe('GuardianLogsService', () => {
  let service: GuardianLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuardianLogsService,
        {
          provide: PinoLogger,
          useValue: {
            info: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
            setContext: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GuardianLogsService>(GuardianLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
