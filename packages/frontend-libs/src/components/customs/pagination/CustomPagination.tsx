import type { FC } from 'react';
import { Grid, MenuItem, Pagination } from '@mui/material';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import { NavButton } from './NavButton';
import { NavButtonByDate } from './NavButtonByDate';
import {
  StyledFooterBodyGrid,
  StyledFooterGrid,
  StyledItemPerPageTypography,
  StyledPageSelection,
} from '../styled-components';
import { useBreakpoint } from '../../../hooks/media/useBreakpointsQuery';
import { JustifySpaceBetweenGrid } from '../../common/styled-components';

export interface ICustomPaginationProps {
  page?: number;
  count?: number;
  pageSize?: number;
  pageSizeList?: number[];
  handleChangePage: Function;
  handleChangePageSize?: (value: any) => void;
  customFooter?: any;
  showPageNumber?: boolean;
  pagingType?: string;
  dateData?: {
    startDateTime: IIsoDate;
    endDateTime: IIsoDate;
    nextStartDate: IIsoDate;
    previousStartDate: IIsoDate;
    endDate: IIsoDate;
    previousStartDateData: IIsoDate[];
    previousEndDateData: IIsoDate[];
  };
  dataTestId?: string;
  sortBy?: string;
}

export const CustomPagination: FC<ICustomPaginationProps> = ({
  page,
  count,
  pageSize,
  pageSizeList,
  handleChangePage,
  handleChangePageSize,
  customFooter,
  showPageNumber = true,
  pagingType,
  dateData,
  dataTestId,
  sortBy,
}) => {
  const numberOfPage: number = Math.ceil((count || 1) / (pageSize || 1));

  const isSmallScreen = useBreakpoint('sm', 'down');

  return (
    <Grid container data-test-id={dataTestId}>
      <JustifySpaceBetweenGrid item xs={12}>
        {pagingType && pagingType === 'date' && dateData ? (
          <NavButtonByDate
            type="Previous"
            dateData={dateData}
            handleChangePage={handleChangePage}
            sortBy={sortBy}
          />
        ) : (
          <NavButton
            type="Previous"
            page={page || 0}
            numberOfPage={numberOfPage}
            handleChangePage={handleChangePage}
          />
        )}

        {showPageNumber && !isSmallScreen && (
          <Pagination
            count={numberOfPage}
            shape="rounded"
            page={(page || 0) + 1}
            size="large"
            onChange={(_e, pageNumber) => handleChangePage(pageNumber - 1)}
            hidePrevButton
            hideNextButton
          />
        )}
        {pagingType && pagingType === 'date' && dateData ? (
          <NavButtonByDate
            type="Next"
            dateData={dateData}
            handleChangePage={handleChangePage}
            sortBy={sortBy}
          />
        ) : (
          <NavButton
            type="Next"
            page={page || 0}
            numberOfPage={numberOfPage}
            handleChangePage={handleChangePage}
          />
        )}
      </JustifySpaceBetweenGrid>
      <StyledFooterGrid container>
        {!isSmallScreen && customFooter ? (
          <StyledFooterBodyGrid item xs={6}>
            {customFooter}
          </StyledFooterBodyGrid>
        ) : (
          <Grid item xs={6} />
        )}

        {pageSizeList && handleChangePageSize && (
          <Grid
            item
            xs={customFooter ? 6 : 12}
            sx={{
              display: { xs: 'unset', sm: 'flex' },
              textAlign: { xs: 'right', sm: 'unset' },
              justifyContent: 'flex-end',
              mb: 2,
            }}
          >
            <StyledItemPerPageTypography>Item per page</StyledItemPerPageTypography>
            <StyledPageSelection
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pageSize}
              onChange={(event) => handleChangePageSize(event.target.value)}
            >
              {pageSizeList.map((pSize) => {
                return (
                  <MenuItem key={pSize} value={pSize}>
                    {pSize}
                  </MenuItem>
                );
              })}
            </StyledPageSelection>
          </Grid>
        )}
      </StyledFooterGrid>
      {isSmallScreen && customFooter && (
        <StyledFooterBodyGrid sx={{ mt: 2 }}>{customFooter}</StyledFooterBodyGrid>
      )}
    </Grid>
  );
};
