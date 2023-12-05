import type { FC } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import { StyledNavButton } from '../styled-components';

interface Props {
  type: string;
  dateData: {
    startDateTime: IIsoDate;
    endDateTime: IIsoDate;
    nextStartDate: IIsoDate;
    previousStartDate: IIsoDate;
    endDate: IIsoDate;
    previousStartDateData: IIsoDate[];
    previousEndDateData: IIsoDate[];
  };
  handleChangePage: Function;
  sortBy?: string;
}

export const NavButtonByDate: FC<Props> = ({ type, dateData, handleChangePage, sortBy }) => {
  const {
    startDateTime,
    endDateTime,
    nextStartDate,
    previousStartDate,
    endDate,
    previousStartDateData,
    previousEndDateData,
  } = dateData;
  const prev: boolean = type === 'Previous';

  const startDateTimeMls = new Date(startDateTime || '').getTime();
  const endDateTimeMls = new Date(endDateTime || '').getTime();

  const nextStartDateMls = new Date(nextStartDate || '').getTime();
  const previousStartDateMls = new Date(previousStartDate || '').getTime();
  let disabled = false;
  if (sortBy === 'asc') {
    disabled = prev
      ? previousStartDateMls === startDateTimeMls ||
        previousStartDate === '' ||
        previousStartDateData.length === 0
      : nextStartDateMls === endDateTimeMls || nextStartDate === '' || endDate === '';
  } else {
    disabled = prev
      ? previousStartDate === '' || previousEndDateData.length === 0
      : nextStartDateMls === endDateTimeMls || nextStartDate === '' || endDate === '';
  }
  return (
    <StyledNavButton
      startIcon={prev ? <ArrowBackIos /> : null}
      endIcon={!prev ? <ArrowForwardIos /> : null}
      onClick={() => {
        if (prev) {
          handleChangePage(previousStartDate, endDateTime, 'prev');
        } else {
          handleChangePage(nextStartDate, endDateTime, 'next');
        }
      }}
      disabled={disabled}
    >
      {type}
    </StyledNavButton>
  );
};
