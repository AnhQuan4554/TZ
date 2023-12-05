import ReactDOM from 'react-dom';
import { SearchInput } from './SearchInput';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <SearchInput
      placeholder="Search"
      value=''
      onChange={(value) => {
        console.log(value);
      }}
    />,
    div
  );
});
