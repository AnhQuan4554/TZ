import type { Meta, Story } from '@storybook/react';
import { SearchInput, ISearchProps } from './SearchInput';

export default {
  title: 'components/Search',
} as Meta<ISearchProps>;

//========================Search===============================
const SearchTemplate: Story<ISearchProps> = (args) => <SearchInput {...args} />;

export const SearchInputComponent = SearchTemplate.bind({});
SearchInputComponent.args = {
  placeholder: 'Search',
  value: '',
  customStyle: { borderRadius: '5px' },
  onChange: (value) => {
    console.log(value);
  },
};
SearchInputComponent.storyName = 'Search';
