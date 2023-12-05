import type { Meta, Story } from '@storybook/react';
import { SliderComponent, ISliderProps } from './SliderComponent';

const oreDyer = require('../../static/ore_dryer.svg') as string;
const electricity = require('../../static/electricity.svg') as string;
const footprint = require('../../static/footprint.svg') as string;

export default {
  title: 'components/Slider',
} as Meta<ISliderProps>;

const steps = [
  {
    icon: oreDyer,
    label: 'Cacbon',
    total: 601.04,
    unit: 'kg',
    value: 90,
    preValue: 10,
    lineChart: {
      color: '#6cc261',
      series: [{ data: [0, 60, 20, 55, 15, 42, 10, 50, 0] }],
      height: 70,
    },
  },
  {
    icon: electricity,
    label: 'Water Pumped',
    total: 601.04,
    unit: 'kg',
    value: 90,
    preValue: 10,
    lineChart: {
      color: '#6cc261',
      series: [{ data: [0, 60, 20, 55, 15, 42, 10, 50, 0] }],
      height: 70,
    },
  },
  {
    icon: footprint,
    label: 'Energy Generation',
    total: 601.04,
    unit: 'kg',
    value: 90,
    preValue: 10,
    lineChart: {
      color: '#6cc261',
      series: [{ data: [0, 60, 20, 55, 15, 42, 10, 50, 0] }],
      height: 70,
    },
  },
];

//========================Search===============================
const SliderTemplate: Story<ISliderProps> = (args) => <SliderComponent {...args} />;

export const SliderComponentTemplate = SliderTemplate.bind({});
SliderComponentTemplate.args = {
  steps,
};
SliderComponentTemplate.storyName = 'Slide';
