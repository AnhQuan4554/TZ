import type { Meta, Story } from '@storybook/react';
import { ITrendIconProps, TrendIcon } from './TrendIcon';
import { ITrendProps, TrendPercent } from './TrendPercent';

export default {
  title: 'components/Trend',
} as Meta<ITrendProps>;

//========================Trend Component===============================

const TrendTemplate: Story<ITrendProps> = (args) => <TrendPercent {...args} />;

export const TrendPrimary = TrendTemplate.bind({});
TrendPrimary.args = {
  value: 90,
  preValue: 50,
};
TrendPrimary.storyName = 'Trend';

//========================Trend Icon Component===============================

const TrendIconTemplate: Story<ITrendIconProps> = (args) => <TrendIcon {...args} />;

export const TrendIconPrimary = TrendIconTemplate.bind({});
TrendIconPrimary.args = {
  showTrend: true,
  percentageChange: 50,
};
TrendPrimary.storyName = 'Trend Icon';
