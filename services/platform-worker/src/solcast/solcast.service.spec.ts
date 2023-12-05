import { Test, TestingModule } from '@nestjs/testing';
import { SolcastService } from './solcast.service';

describe('GuardianLogsService', () => {
  let service: SolcastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolcastService],
    }).compile();

    service = module.get<SolcastService>(SolcastService);
  });

  it('fillMissingIntervalData() should fill the missing gap', () => {
    const data: any = [
      {
        pv_estimate: 5,
        period_end: '2022-07-09T15:25:00.0000000Z',
        period: 'PT5M',
      },
      {
        pv_estimate: 7,
        period_end: '2022-07-09T15:15:00.0000000Z',
        period: 'PT5M',
      },
    ];
    const result = service.fillMissingIntervalData(data, 300);
    expect(result.length).toEqual(3);
    expect(result).toMatchSnapshot();
  });

  it('fillMissingIntervalData() should fill multiple gap', () => {
    const data: any = [
      {
        pv_estimate: 5,
        period_end: '2022-07-09T15:25:00.0000000Z',
        period: 'PT5M',
      },
      {
        pv_estimate: 7,
        period_end: '2022-07-09T15:10:00.0000000Z',
        period: 'PT5M',
      },
    ];
    const result = service.fillMissingIntervalData(data, 300);
    expect(result.length).toEqual(4);
    expect(result).toMatchSnapshot();
  });

  it('fillMissingIntervalData() should not change anything if no gap', () => {
    const data: any = [
      {
        pv_estimate: 5,
        period_end: '2022-07-09T15:25:00.0000000Z',
        period: 'PT5M',
      },
      {
        pv_estimate: 7,
        period_end: '2022-07-09T15:20:00.0000000Z',
        period: 'PT5M',
      },
    ];
    const result = service.fillMissingIntervalData(data, 300);
    expect(result.length).toEqual(2);
    expect(result).toMatchSnapshot();
  });
});
