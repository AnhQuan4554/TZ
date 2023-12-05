import ReactDOM from 'react-dom';
import { TLogo } from './TLogo';
import { TymlezLogo } from './TymlezLogo';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TymlezLogo style={{ height: 150, width: 150 }} />, div);
});

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TLogo />, div);
});
