import type { Meta, Story } from '@storybook/react';
import { CustomPagination } from './pagination';
import type { ICustomPaginationProps } from './pagination/CustomPagination';

export default {
  title: 'components/Customs',
  component: CustomPagination,
} as Meta<ICustomPaginationProps>;

//========================Custom Pagination===============================
const CustomPaginationTemplate: Story<ICustomPaginationProps> = (args) => (
  <CustomPagination {...args} />
);

export const CustomPaginationPrimary = CustomPaginationTemplate.bind({});
CustomPaginationPrimary.args = {
  page: 0,
  count: 25,
  pageSize: 5,
  pageSizeList: [5, 10, 15],
};
CustomPaginationPrimary.storyName = 'Custom Pagination';
