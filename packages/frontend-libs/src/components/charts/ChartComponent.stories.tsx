import type { Meta, Story } from '@storybook/react'
import CarbonPieChart, { ICarbonPieChartProps } from './CarbonPieChart'
import type { IOverviewGenerationProps } from './OverviewGeneration'
import OverviewGeneration from './OverviewGeneration'
import type { IStaticTimelineProps } from './StaticTimeline'
import StaticTimeline from './StaticTimeline'
import type { Series } from './StaticTimelineChart'

export default {
  title: 'components/Chart',
  component: CarbonPieChart,
} as Meta<ICarbonPieChartProps>

const generated24 = 100000
const series = [{ data: [0, 60, 20, 55, 15, 42, 10, 50, 0] }]

//========================Carbon Pie Chart===============================
const CarbonPieChartTemplate: Story<ICarbonPieChartProps> = (args) => <CarbonPieChart {...args} />

export const CarbonPieChartPrimary = CarbonPieChartTemplate.bind({})
CarbonPieChartPrimary.args = {
  produced: 50,
  saved: 50,
  isLoading: false,
}
CarbonPieChartPrimary.storyName = 'Carbon Pie Chart'

//======================Overview Generation Chart============================
const OverviewGenerationTemplate: Story<IOverviewGenerationProps> = (args) => (
  <OverviewGeneration {...args} />
)

export const OverviewGenerationPrimary = OverviewGenerationTemplate.bind({})
OverviewGenerationPrimary.args = {
  data: generated24,
  series,
}
OverviewGenerationPrimary.storyName = 'Overview Generation Chart'

//===========================Static Timeline Chart============================
const chartSeriesData: Array<Series> = [
  {
    name: 'CO2e Abated',
    color: '#D3ECB9',
    data: [
      {
        x: '2022-09-29T17:00:00.000Z',
        y: -218078.3333,
      },
      {
        x: '2022-09-29T18:00:00.000Z',
        y: -225198.3333,
      },
      {
        x: '2022-09-29T19:00:00.000Z',
        y: -223998.3333,
      },
      {
        x: '2022-09-29T20:00:00.000Z',
        y: -222433.3333,
      },
      {
        x: '2022-09-29T21:00:00.000Z',
        y: -225206.6667,
      },
      {
        x: '2022-09-29T22:00:00.000Z',
        y: -222635,
      },
      {
        x: '2022-09-29T23:00:00.000Z',
        y: -220936.6667,
      },
      {
        x: '2022-09-30T00:00:00.000Z',
        y: -217091.6667,
      },
      {
        x: '2022-09-30T01:00:00.000Z',
        y: -218221.6667,
      },
      {
        x: '2022-09-30T02:00:00.000Z',
        y: -225731.6667,
      },
      {
        x: '2022-09-30T03:00:00.000Z',
        y: -225313.3333,
      },
      {
        x: '2022-09-30T04:00:00.000Z',
        y: -224250,
      },
      {
        x: '2022-09-30T05:00:00.000Z',
        y: -225546.6667,
      },
      {
        x: '2022-09-30T06:00:00.000Z',
        y: -222055,
      },
      {
        x: '2022-09-30T07:00:00.000Z',
        y: -226343.3333,
      },
      {
        x: '2022-09-30T08:00:00.000Z',
        y: -220353.3333,
      },
      {
        x: '2022-09-30T09:00:00.000Z',
        y: -221261.6667,
      },
      {
        x: '2022-09-30T10:00:00.000Z',
        y: -212670,
      },
      {
        x: '2022-09-30T11:00:00.000Z',
        y: -215176.6667,
      },
      {
        x: '2022-09-30T12:00:00.000Z',
        y: -227243.3333,
      },
      {
        x: '2022-09-30T13:00:00.000Z',
        y: -227270,
      },
      {
        x: '2022-09-30T14:00:00.000Z',
        y: -224145,
      },
      {
        x: '2022-09-30T15:00:00.000Z',
        y: -222340,
      },
      {
        x: '2022-09-30T16:00:00.000Z',
        y: -226150,
      },
      {
        x: '2022-09-30T17:00:00.000Z',
        y: -19963.3333,
      },
    ],
  },
  {
    name: 'Carbon Produced',
    color: '#92D050',
    data: [
      {
        x: '2022-09-29T17:00:00.000Z',
        y: 235873.1715,
      },
      {
        x: '2022-09-29T18:00:00.000Z',
        y: 234399.4049,
      },
      {
        x: '2022-09-29T19:00:00.000Z',
        y: 229599.0209,
      },
      {
        x: '2022-09-29T20:00:00.000Z',
        y: 228686.4711,
      },
      {
        x: '2022-09-29T21:00:00.000Z',
        y: 228893.1022,
      },
      {
        x: '2022-09-29T22:00:00.000Z',
        y: 235190.305,
      },
      {
        x: '2022-09-29T23:00:00.000Z',
        y: 228528.2376,
      },
      {
        x: '2022-09-30T00:00:00.000Z',
        y: 231787.6421,
      },
      {
        x: '2022-09-30T01:00:00.000Z',
        y: 231516.4085,
      },
      {
        x: '2022-09-30T02:00:00.000Z',
        y: 230576.0061,
      },
      {
        x: '2022-09-30T03:00:00.000Z',
        y: 231923.2559,
      },
      {
        x: '2022-09-30T04:00:00.000Z',
        y: 228380.2367,
      },
      {
        x: '2022-09-30T05:00:00.000Z',
        y: 234387.7522,
      },
      {
        x: '2022-09-30T06:00:00.000Z',
        y: 232270.66,
      },
      {
        x: '2022-09-30T07:00:00.000Z',
        y: 231841.1974,
      },
      {
        x: '2022-09-30T08:00:00.000Z',
        y: 230801.7448,
      },
      {
        x: '2022-09-30T09:00:00.000Z',
        y: 235506.2446,
      },
      {
        x: '2022-09-30T10:00:00.000Z',
        y: 227252.0447,
      },
      {
        x: '2022-09-30T11:00:00.000Z',
        y: 232734.68,
      },
      {
        x: '2022-09-30T12:00:00.000Z',
        y: 231122.1629,
      },
      {
        x: '2022-09-30T13:00:00.000Z',
        y: 229498.4098,
      },
      {
        x: '2022-09-30T14:00:00.000Z',
        y: 231862.9584,
      },
      {
        x: '2022-09-30T15:00:00.000Z',
        y: 232241.2122,
      },
      {
        x: '2022-09-30T16:00:00.000Z',
        y: 228454.3965,
      },
      {
        x: '2022-09-30T17:00:00.000Z',
        y: 20335.9079,
      },
    ],
  },
  {
    name: 'Net Carbon',
    color: '#3A5320',
    data: [
      {
        x: '2022-09-29T17:00:00.000Z',
        y: 17794.8382,
      },
      {
        x: '2022-09-29T18:00:00.000Z',
        y: 9201.071599999996,
      },
      {
        x: '2022-09-29T19:00:00.000Z',
        y: 5600.687600000005,
      },
      {
        x: '2022-09-29T20:00:00.000Z',
        y: 6253.137799999997,
      },
      {
        x: '2022-09-29T21:00:00.000Z',
        y: 3686.4354999999923,
      },
      {
        x: '2022-09-29T22:00:00.000Z',
        y: 12555.304999999993,
      },
      {
        x: '2022-09-29T23:00:00.000Z',
        y: 7591.5708999999915,
      },
      {
        x: '2022-09-30T00:00:00.000Z',
        y: 14695.975399999996,
      },
      {
        x: '2022-09-30T01:00:00.000Z',
        y: 13294.741799999989,
      },
      {
        x: '2022-09-30T02:00:00.000Z',
        y: 4844.339399999997,
      },
      {
        x: '2022-09-30T03:00:00.000Z',
        y: 6609.922599999991,
      },
      {
        x: '2022-09-30T04:00:00.000Z',
        y: 4130.236700000009,
      },
      {
        x: '2022-09-30T05:00:00.000Z',
        y: 8841.085499999986,
      },
      {
        x: '2022-09-30T06:00:00.000Z',
        y: 10215.660000000003,
      },
      {
        x: '2022-09-30T07:00:00.000Z',
        y: 5497.864100000006,
      },
      {
        x: '2022-09-30T08:00:00.000Z',
        y: 10448.411499999987,
      },
      {
        x: '2022-09-30T09:00:00.000Z',
        y: 14244.577900000004,
      },
      {
        x: '2022-09-30T10:00:00.000Z',
        y: 14582.044699999999,
      },
      {
        x: '2022-09-30T11:00:00.000Z',
        y: 17558.01329999999,
      },
      {
        x: '2022-09-30T12:00:00.000Z',
        y: 3878.8295999999973,
      },
      {
        x: '2022-09-30T13:00:00.000Z',
        y: 2228.409799999994,
      },
      {
        x: '2022-09-30T14:00:00.000Z',
        y: 7717.958400000003,
      },
      {
        x: '2022-09-30T15:00:00.000Z',
        y: 9901.212200000009,
      },
      {
        x: '2022-09-30T16:00:00.000Z',
        y: 2304.3965000000026,
      },
      {
        x: '2022-09-30T17:00:00.000Z',
        y: 372.5745999999999,
      },
    ],
  },
]

const StaticTimelineTemplate: Story<IStaticTimelineProps> = (args) => <StaticTimeline {...args} />

export const StaticTimelinePrimary = StaticTimelineTemplate.bind({})
StaticTimelinePrimary.args = {
  series: chartSeriesData,
  selectChartType: false,
  yTitle: 'Co2eq (kg)',
  height: '393',
  title: 'Carbon Emissions',
  chartType: 'bar',
  uom: 'kg',
  subTitle: 'Daily Updates',
}
StaticTimelinePrimary.storyName = 'Static Timeline Chart'
