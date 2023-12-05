import type { Meta, Story } from '@storybook/react'
import type { IWeatherData } from '@tymlez/platform-api-interfaces'
import { IMultiMetricBlocksProps, MultiMetricBlocks } from './MultiMetricBlock'
import { IProcessStepsProps, ProcessSteps } from './ProcessSteps'
import { IWeatherWidgetProps, WeatherWidget } from './WeatherWidget'
import { ITotalWidgetProps, TotalWidget } from './TotalWidget'

const biocharproduced = require('../../static/char_mill.svg') as string
const charMill = require('../../static/char_mill.svg') as string
const oreDyer = require('../../static/ore_dryer.svg') as string
const electricity = require('../../static/electricity.svg') as string
const footprint = require('../../static/footprint.svg') as string
const flame = require('../../static/flame.svg') as string

export default {
  title: 'components/Widgets',
} as Meta<IMultiMetricBlocksProps>

//========================Multi Metric Blocks Component===============================
const multiMetricBlocksData = [
  {
    title: 'Biochar In',
    icon: biocharproduced,
    name: 'biochar',
    label: 'Biochar In',
    type: 'input',
    value: 0,
    uom: 't',
  },
  {
    title: 'Iron Ore In',
    icon: biocharproduced,
    name: 'ironore',
    label: 'Iron Ore In',
    type: 'input',
    value: 0,
    uom: 't',
  },
  {
    title: 'Energy consumption',
    icon: biocharproduced,
    name: 'energy',
    label: 'Energy consumption',
    type: 'input',
    value: 0,
    uom: 'MWh',
  },
  {
    title: 'CO2eq Emissions',
    icon: biocharproduced,
    name: 'emission',
    label: 'CO2eq Emissions',
    type: 'output',
    value: 0,
    uom: 't',
  },
  {
    title: 'CO2eq Abated',
    icon: biocharproduced,
    name: 'abatement',
    label: 'CO2eq Abated',
    type: 'output',
    value: 0,
    uom: 't',
  },
  {
    title: 'Net CO2eq',
    icon: biocharproduced,
    name: 'net',
    label: 'Net CO2eq',
    type: 'output',
    value: 0,
    uom: 't',
  },
  {
    title: 'Pig Iron Produced',
    icon: biocharproduced,
    name: 'pigIron',
    label: 'Pig Iron Produced',
    type: 'output',
    value: 0,
    uom: 't',
  },
]

const MultiMetricBlocksTemplate: Story<IMultiMetricBlocksProps> = (args) => (
  <MultiMetricBlocks {...args} />
)

export const MultiMetricBlocksPrimary = MultiMetricBlocksTemplate.bind({})
MultiMetricBlocksPrimary.args = {
  title: 'Key Metrics',
  data: multiMetricBlocksData,
}
MultiMetricBlocksPrimary.storyName = 'Multi Metric Blocks'

//========================Process Step Component===============================

const processStepsData = [
  {
    title: 'Char Mill',
    icon: charMill,
    lines: [
      {
        label: 'Energy consumption',
        keys: ['hismelt-charmill-input-electricity'],
        uom: 't',
        value: 0,
        icon: electricity,
      },
      {
        label: 'Carbon emission',
        keys: [],
        uom: 'kg',
        value: 0,
        icon: footprint,
      },
      {
        label: 'SRV Offgas In',
        keys: ['hismelt-charmill-input-srv_offgas'],
        uom: 'Nm3',
        value: 0,
        icon: flame,
      },
    ],
    group: 'Pig Iron Production',
  },
  {
    title: 'Ore Dryer',
    icon: oreDyer,
    lines: [
      {
        label: 'Energy consumption',
        keys: ['hismelt-oredryer-input-electricity'],
        uom: 'MWh',
        value: 0,
        icon: electricity,
      },
      {
        label: 'Carbon emission',
        keys: [],
        uom: 'kg',
        value: 0,
        icon: footprint,
      },
      {
        label: 'OGC Offgas In',
        keys: ['hismelt-oredryer-input-ogc_offgas'],
        uom: 'Nm3',
        value: 0,
        icon: flame,
      },
    ],
    group: 'Pig Iron Production',
  },
]

const ProcessStepTemplate: Story<IProcessStepsProps> = (args) => <ProcessSteps {...args} />

export const ProcessStepPrimary = ProcessStepTemplate.bind({})
ProcessStepPrimary.args = {
  title: 'Key Metrics',
  steps: processStepsData,
}
ProcessStepPrimary.storyName = 'Process Steps'

//========================Weather Widget Component===============================
const weatherData: IWeatherData = {
  weather: [
    {
      id: 804,
      main: 'Clouds',
      description: 'overcast clouds',
      icon: '04n',
    },
  ],
  main: {
    temp: 18.78,
    feels_like: 19.12,
    temp_min: 18.32,
    temp_max: 18.89,
    pressure: 1020,
    humidity: 92,
    sea_level: 1020,
    grnd_level: 1019,
  },
  name: 'Southport',
}

const WeatherWidgetTemplate: Story<IWeatherWidgetProps> = (args) => <WeatherWidget {...args} />

export const WeatherWidgetPrimary = WeatherWidgetTemplate.bind({})
WeatherWidgetPrimary.args = {
  data: weatherData,
  loading: false,
  color: 'primary',
}
WeatherWidgetPrimary.storyName = 'Weather Widget'

//========================Total Widget Component===============================

const TotalWidgetTemplate: Story<ITotalWidgetProps> = (args) => <TotalWidget {...args} />

export const TotalWidgetPrimary = TotalWidgetTemplate.bind({})
TotalWidgetPrimary.args = {
  title: '24HR CO2e PRODUCED',
  last30d: 12560.2597,
  last24h: 12560.2597,
  isLoading: false,
}
TotalWidgetPrimary.storyName = 'Total Widget'
