import type { DateRange } from '@mui/x-date-pickers-pro';
import { FC, useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import { LicenseInfo } from '@mui/x-license-pro';
import { useCookies } from 'react-cookie';
import { CustomCalendar } from '../customs/date-range-picker/CustomCalendar';
import {
  StyledCalendarGrid,
  StyledDatePickerBox,
  StyledHistoryQueryFormRoot,
  StyledPickerPeriodText,
  StyledPickerTimeText,
} from './styled-components';
import { useBreakpoint } from '../../hooks/media/useBreakpointsQuery';

LicenseInfo.setLicenseKey(
  'c04a656bebdf77826e21f743745cf663Tz00NDc0NyxFPTE2ODU1MjY4OTA2NTQsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI='
);

export type HistoryQuery = {
  dateRange: DateRange<IIsoDate>;
};

export interface IHistoryQueryProps {
  query: HistoryQuery;
  onUpdateQuery: (query: HistoryQuery) => void;
  backgroundColor?: string;
  alignItems?: string;
  persistKey?: string;
  dataTestId?: string;
  customStyle?: any;
}

const IconStyleButton = styled(IconButton)<IconButtonProps>({
  color: '#323232',
  width: 'fit-content',
});

export const HistoryQueryForm: FC<IHistoryQueryProps> = ({
  query,
  onUpdateQuery,
  persistKey,
  backgroundColor,
  alignItems,
  dataTestId,
  customStyle,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCookie] = useCookies([persistKey || 'picker']);

  const [checked, setCheck] = useState(false);

  const setDateRange = useCallback(
    (dateRange) => {
      if (persistKey) {
        setCookie(persistKey, dateRange, { expires: 0 as any, path: '/' });
      }
      onUpdateQuery({ dateRange });
    },
    [onUpdateQuery, setCookie, persistKey]
  );

  const isSmallScreen = useBreakpoint('sm', 'down');

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const formDate = new Date(query.dateRange[0] || '');
  let toDate = new Date(query.dateRange[1] || '');
  const toDateMls = toDate.getTime() - 86340000;
  toDate = new Date(toDateMls);

  return (
    <StyledHistoryQueryFormRoot
      sx={{
        alignItems: alignItems || 'center',
        position: { xs: 'unset !important', sm: 'absolute !important' },
        ml: { xs: 'unset !important', sm: 'auto !important' },
        ...customStyle,
      }}
      data-test-id={dataTestId}
    >
      <StyledDatePickerBox
        onClick={() => {
          setCheck(!checked);
        }}
        sx={{
          backgroundColor: backgroundColor || '#F4F5F7',
        }}
      >
        {!isSmallScreen && <StyledPickerPeriodText>Period: </StyledPickerPeriodText>}
        <StyledPickerTimeText>
          {monthNames[formDate.getMonth()].substring(0, 3)} {formDate.getDate()},
          {formDate.getFullYear()} - {monthNames[toDate.getMonth()].substring(0, 3)}{' '}
          {toDate.getDate()},{toDate.getFullYear()}
        </StyledPickerTimeText>
        <IconStyleButton size="small">
          <ArrowDropDownIcon />
        </IconStyleButton>
      </StyledDatePickerBox>
      <StyledCalendarGrid>
        {checked && (
          <CustomCalendar query={query} setDateRange={setDateRange} setChecked={setCheck} />
        )}
      </StyledCalendarGrid>
    </StyledHistoryQueryFormRoot>
  );
};
