import type { Meta, Story } from '@storybook/react';
import Loading, { ILoadingProps } from './Loading';
import { LoadingSquare, ILoadingSquareProps } from './LoadingSquare';

export default {
  title: 'components/Loading',
  // component: Loading,
  // args: {
} as Meta;

//========================Circle Loading===============================
const LoadingTemplate: Story<ILoadingProps> = (args) => <Loading {...args} />;

export const LoadingPrimary = LoadingTemplate.bind({});
LoadingPrimary.args = {
  color: '#75A640',
  style: {},
};
LoadingPrimary.storyName = 'Loading';

//========================Square Loading===============================
const LoadingSquareTemplace: Story<ILoadingSquareProps> = (args) => <LoadingSquare {...args} />;

export const LoadingSquareScreen = LoadingSquareTemplace.bind({});
LoadingSquareScreen.args = {
  title: 'Loading from blockchain...',
};
LoadingSquareScreen.storyName = 'Loading Square';
