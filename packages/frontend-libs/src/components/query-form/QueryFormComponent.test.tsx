import ReactDOM from 'react-dom'
import { DateRangeForm } from './DateRangeForm'
import { RadioForm } from './RadioForm'
import { SelectForm } from './SelectForm'

test('renders without crashing', () => {
  const div = document.createElement('div')
  const now = new Date()
  const tomorrow = new Date(now.getTime() + 86400000)
  ReactDOM.render(
    <DateRangeForm
      from={now}
      to={tomorrow}
      onUpdateFrom={(value) => {
        console.log(value)
      }}
      onUpdateTo={(value) => {
        console.log(value)
      }}
    />,
    div
  )
})

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <RadioForm
      title="Status Sent"
      options={[
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
      ]}
      value="all"
      onUpdate={(value: any) => {
        console.log(value)
      }}
    />,
    div
  )
})

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <SelectForm
      title="Filter by metric name"
      options={[
        {
          name: 'All',
          value: 'all',
        },
        {
          name: 'Active',
          value: 'active',
        },
        {
          name: 'Deactive',
          value: 'deactive',
        },
      ]}
      value="all"
      onUpdate={(value: any) => {
        console.log(value)
      }}
    />,
    div
  )
})
