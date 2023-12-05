import { DateRange, StaticDateRangePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import type { DateRangePickerDayProps } from '@mui/x-date-pickers-pro/DateRangePickerDay';
import { FC, useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { formatUTCTime } from '@tymlez/common-libs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import type { HistoryQuery } from '../../date-range-pickers/HistoryQueryForm';
import {
  StyledApplyButton,
  StyledCustomStyledCalendarGrid,
  customStyle,
  StyledDateBodyTextGrid,
  DateRangePickerDay,
  StyledDateTextStyleGrid,
  StyledFromDateTextBox,
  StyledToDateTextBox,
} from '../styled-components';
import { useBreakpoint } from '../../../hooks/media/useBreakpointsQuery';

interface Props {
  query: HistoryQuery;
  setDateRange: (dateRange: DateRange<Date>) => void;
  setChecked: (checked: boolean) => void;
}

export const CustomCalendar: FC<Props> = (props) => {
  const { query, setDateRange, setChecked }: any = props;
  const [dateRange, setNewDateRange]: any = useState(query.dateRange);
  let newToDate = new Date(dateRange[1]);
  const toDateMls = newToDate.getTime() - 86340000;
  newToDate = new Date(toDateMls);

  const staticDateRange: any = [new Date(dateRange[0]), newToDate];
  const dateRangeQuery: any = [new Date(dateRange[0]), new Date(dateRange[1])];

  const formDate = new Date(staticDateRange[0]);
  const toDate = new Date(staticDateRange[1]);

  const classes = customStyle();
  const isSmallScreen = useBreakpoint('sm', 'down');

  const renderWeekPickerDay = (
    _day: Date,
    dateRangePickerDayProps: DateRangePickerDayProps<Date>
  ) => {
    return <DateRangePickerDay {...dateRangePickerDayProps} />;
  };

  const handleAplly = () => {
    setDateRange(dateRangeQuery);
    setChecked();
  };

  return (
    <StyledCustomStyledCalendarGrid
      sx={{
        width: {
          xs: 280,
          sm: 'fit-content',
        },
        '& .MuiPickerStaticWrapper-content': {
          minWidth: 'unset',
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDateRangePicker
          displayStaticWrapperAs={!isSmallScreen ? 'desktop' : 'mobile'}
          // shouldDisableDate={handleDisableDay}
          renderDay={renderWeekPickerDay}
          showDaysOutsideCurrentMonth
          value={staticDateRange}
          onChange={(newDateRange: any) => {
            let getToDate = new Date(newDateRange[1] || newDateRange[0]);
            const getToDateMls = getToDate.getTime() + 86340000;
            getToDate = new Date(getToDateMls);
            const from = formatUTCTime(newDateRange[0]);
            const to = formatUTCTime(getToDate);

            setNewDateRange([from, to]);
          }}
          // eslint-disable-next-line react/jsx-no-useless-fragment
          renderInput={() => <></>}
          className={classes.staticDateRangePicker}
        />
      </LocalizationProvider>
      <StyledDateTextStyleGrid
        sx={{
          display: {
            xs: 'block',
            sm: 'flex',
          },
        }}
      >
        <StyledDateBodyTextGrid
          sx={{
            justifyContent: {
              xs: 'unset ',
              sm: 'space-between',
            },
            mb: {
              xs: 1,
              sm: 0,
            },
          }}
        >
          <StyledFromDateTextBox>
            {formDate.getDate()}/{formDate.getMonth() + 1}/{formDate.getFullYear()}
          </StyledFromDateTextBox>
          <ArrowForwardIcon />
          <StyledToDateTextBox>
            {toDate.getDate()}/{toDate.getMonth() + 1}/{toDate.getFullYear()}
          </StyledToDateTextBox>
        </StyledDateBodyTextGrid>
        <StyledApplyButton onClick={handleAplly}>Apply</StyledApplyButton>
      </StyledDateTextStyleGrid>
    </StyledCustomStyledCalendarGrid>
  );
};
