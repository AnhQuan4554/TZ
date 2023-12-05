import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import type { MuiPickersAdapter } from '@mui/x-date-pickers/internals';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const CustomDateAdapter: new (
  ...args: any
) => MuiPickersAdapter<unknown> = (props: { options: any }) => {
  const { options } = props;
  const adapter = new AdapterDateFns(options);
  const constructUpperObject = (text: any) => ({ toUpperCase: () => text });
  const constructDayObject = (day: any) => ({
    charAt: () => constructUpperObject(day),
  });

  return {
    ...adapter,

    getWeekdays() {
      // Feel free to replace this with your custom value
      const customWeekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      // const customWeekdays = adapter.getWeekdays();

      return customWeekdays.map((day) => constructDayObject(day));
    },
  };
};
