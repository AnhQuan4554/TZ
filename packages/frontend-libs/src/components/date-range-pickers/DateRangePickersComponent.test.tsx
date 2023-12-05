import ReactDOM from 'react-dom';
import { HistoryQuery, HistoryQueryForm } from './HistoryQueryForm';
import { HistoryQueryText } from './HistoryQueryText';

test('renders without crashing', () => {
  const div = document.createElement('div');

  const now = new Date();
  const tomorrow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const historyQuery: HistoryQuery = {
    dateRange: [now.toISOString(), tomorrow.toISOString()],
  };

  ReactDOM.render(
    <HistoryQueryForm
      persistKey="dateRange"
      query={historyQuery}
      onUpdateQuery={(value) => {
        console.log(value);
      }}
      backgroundColor="#FCFCFC"
      alignItems="start"
    />,
    div
  );
});

test('renders without crashing', () => {
  const div = document.createElement('div');

  const now = new Date();
  const tomorrow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const historyQuery: HistoryQuery = {
    dateRange: [now.toISOString(), tomorrow.toISOString()],
  };

  ReactDOM.render(
    <HistoryQueryText
      fromDate={new Date(historyQuery.dateRange[0] || '')}
      toDate={new Date(historyQuery.dateRange[1] || '')}
    />,
    div
  );
});
