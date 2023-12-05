import ReactDOM from 'react-dom'
import { CustomPagination } from './pagination'

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <CustomPagination
      page={0}
      count={25}
      pageSize={5}
      pageSizeList={[5, 10, 15]}
      handleChangePage={(value: any) => {
        console.log(value)
      }}
      handleChangePageSize={(value) => {
        console.log(value)
      }}
    />,
    div
  )
})
