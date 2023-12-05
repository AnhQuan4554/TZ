import type { Meta, Story } from '@storybook/react';
import { HistoryQuery, HistoryQueryForm, IHistoryQueryProps } from './HistoryQueryForm';
import { HistoryQueryText, IHistoryQueryTextProps } from './HistoryQueryText';

export default {
  title: 'components/DateRangePickers',
} as Meta<IHistoryQueryProps>;

//========================History Query Form Component===============================
const now = new Date();
const tomorrow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
const historyQuery: HistoryQuery = {
  dateRange: [now.toISOString(), tomorrow.toISOString()],
};
const HistoryQueryFormTemplate: Story<IHistoryQueryProps> = (args) => (
  <HistoryQueryForm {...args} />
);

export const HistoryQueryFormPrimary = HistoryQueryFormTemplate.bind({});
HistoryQueryFormPrimary.args = {
  persistKey: 'dateRange',
  query: historyQuery,
  backgroundColor: '#FCFCFC',
  alignItems: 'start',
};
HistoryQueryFormPrimary.storyName = 'History Query Form ';

//========================History Query Text Component===============================

const HistoryQueryTextTemplate: Story<IHistoryQueryTextProps> = (args) => (
  <HistoryQueryText {...args} />
);

export const HistoryQueryTextPrimary = HistoryQueryTextTemplate.bind({});
HistoryQueryTextPrimary.args = {
  fromDate: new Date(historyQuery.dateRange[0] || ''),
  toDate: new Date(historyQuery.dateRange[1] || ''),
};
HistoryQueryTextPrimary.storyName = 'History Query Text ';
