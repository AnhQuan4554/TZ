import type { FC } from 'react';
import { Grid } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Loading } from '@tymlez/frontend-libs';
import {
  useRECData,
  useRECPreValue,
} from '../../../hooks/useSummaryRealtimeData';
import {
  StyledDateTodayP,
  StyledGeneratedTodayGrid,
  StyledIconDateRange,
  StyledInfoP,
  StyledLast7DayGrid,
  StyledResultAndInfoGrid,
  StyledResultP,
  StyledTitleRecP,
  StyledResultText,
  Item,
} from '../../common/styles/commonStyles';

interface Props {
  dataTestId?: string;
}
export const RECComponent: FC<Props> = ({ dataTestId }) => {
  const { data, isLoading } = useRECData();
  const { data: preValue, isLoading: preLoading } = useRECPreValue();

  return (
    <Grid item xs={12} md={4} data-test-id={dataTestId}>
      <Item>
        <StyledTitleRecP data-test-id={`${dataTestId}-header`}>
          REC Generation
        </StyledTitleRecP>
        <Grid sx={{ display: 'flex' }} data-test-id={`${dataTestId}-today`}>
          <DateRangeIcon />
          <StyledDateTodayP data-test-id={`${dataTestId}-today-header`}>
            Today
          </StyledDateTodayP>
        </Grid>

        <StyledResultAndInfoGrid sx={{ display: 'flex' }}>
          <img
            data-test-id={`${dataTestId}-today-logo`}
            alt="logo_icon"
            src="logo/license.svg"
          />

          <StyledGeneratedTodayGrid>
            {isLoading ? (
              <Loading dataTestId={`${dataTestId}-today-loading`} />
            ) : (
              <StyledResultText data-test-id={`${dataTestId}-today-value`}>
                {data}
              </StyledResultText>
            )}
            <StyledGeneratedTodayGrid
              data-test-id={`${dataTestId}-today-label`}
            >
              RECs generated today
            </StyledGeneratedTodayGrid>
          </StyledGeneratedTodayGrid>
        </StyledResultAndInfoGrid>

        <StyledLast7DayGrid data-test-id={`${dataTestId}-last-week`}>
          <StyledIconDateRange />
          <StyledDateTodayP data-test-id={`${dataTestId}-last-week-header`}>
            Last 7 days
          </StyledDateTodayP>
        </StyledLast7DayGrid>

        <Grid sx={{ display: 'flex' }}>
          <img
            data-test-id={`${dataTestId}-last-week-logo`}
            alt="logo_icon"
            src="logo/license.svg"
          />
          <StyledTitleRecP>
            {preLoading ? (
              <Loading dataTestId={`${dataTestId}-last-week-loading`} />
            ) : (
              <StyledResultP data-test-id={`${dataTestId}-last-week-value`}>
                {preValue}
              </StyledResultP>
            )}
            <StyledInfoP data-test-id={`${dataTestId}-last-week-label`}>
              Total RECs generated
            </StyledInfoP>
          </StyledTitleRecP>
        </Grid>
      </Item>
    </Grid>
  );
};
