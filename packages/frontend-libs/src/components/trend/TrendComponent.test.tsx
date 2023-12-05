import ReactDOM from 'react-dom'
import { TrendIcon } from './TrendIcon'
import { TrendPercent } from './TrendPercent'

test('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(<TrendPercent value={90} preValue={50} />, div)
})

test('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(<TrendIcon showTrend percentageChange={50} />, div)
})
