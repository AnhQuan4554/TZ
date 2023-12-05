import type { Meta, Story } from '@storybook/react'
import { DateRangeForm, IDateRangeFormProps } from './DateRangeForm'
import { IRadioFormProps, RadioForm } from './RadioForm'
import { ISelectFormProps, SelectForm } from './SelectForm'

export default {
  title: 'components/QueryForm',
  // component: DateRangeForm,
} as Meta<IDateRangeFormProps>

//========================Date Range Form===============================
const DateRangeFormTemplate: Story<IDateRangeFormProps> = (args) => <DateRangeForm {...args} />

const now = new Date()
const tomorrow = new Date(now.getTime() + 86400000)
export const DateRangeFormPrimary = DateRangeFormTemplate.bind({})
DateRangeFormPrimary.args = {
  from: now,
  to: tomorrow,
}
DateRangeFormPrimary.storyName = 'Date Range Form'

//========================Date Range Form===============================
const RadioFormTemplate: Story<IRadioFormProps> = (args) => <RadioForm {...args} />

export const RadioFormPrimary = RadioFormTemplate.bind({})
RadioFormPrimary.args = {
  title: 'Status Sent',
  options: [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Active',
      value: 'active',
    },
    {
      label: 'Deactive',
      value: 'deactive',
    },
  ],
  value: 'all',
}
RadioFormPrimary.storyName = 'Radio Form'

//========================Select Form===============================
const SelectFormTemplate: Story<ISelectFormProps> = (args) => <SelectForm {...args} />

export const SelectFormPrimary = SelectFormTemplate.bind({})
SelectFormPrimary.args = {
  title: 'Filter by metric name',
  options: [
    {
      name: 'Active',
      value: 'active',
    },
    {
      name: 'Deactive',
      value: 'deactive',
    },
  ],
  value: 'all',
}
SelectFormPrimary.storyName = 'Select Form'
