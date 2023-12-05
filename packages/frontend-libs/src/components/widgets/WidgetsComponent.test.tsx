import ReactDOM from 'react-dom'
import type { IWeatherData } from '@tymlez/platform-api-interfaces'
import { MultiMetricBlocks } from './MultiMetricBlock'
import { ProcessSteps } from './ProcessSteps'
import { WeatherWidget } from './WeatherWidget'
import { TotalWidget } from './TotalWidget'

const biocharproduced = require('../../static/char_mill.svg') as string
const charMill = require('../../static/char_mill.svg') as string
const oreDyer = require('../../static/ore_dryer.svg') as string
const electricity = require('../../static/electricity.svg') as string
const footprint = require('../../static/footprint.svg') as string
const flame = require('../../static/flame.svg') as string

test('renders without crashing', () => {
  const div = document.createElement('div')

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

  ReactDOM.render(<MultiMetricBlocks title="Key Metrics" data={multiMetricBlocksData} />, div)
})

test('renders without crashing', () => {
  const div = document.createElement('div')

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

  ReactDOM.render(<ProcessSteps title="Key Metrics" steps={processStepsData} />, div)
})

test('renders without crashing', () => {
  const div = document.createElement('div')
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
  ReactDOM.render(<WeatherWidget data={weatherData} loading={false} color="primary" />, div)
})

test('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(
    <TotalWidget
      title="24HR CO2e PRODUCED"
      last30d={12560.2597}
      last24h={12560.2597}
      isLoading={false}
    />,
    div
  )
})
