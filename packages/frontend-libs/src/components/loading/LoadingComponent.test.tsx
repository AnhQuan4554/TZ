import ReactDOM from 'react-dom';
import Loading from './Loading';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Loading color="#75A640" />, div);
});
