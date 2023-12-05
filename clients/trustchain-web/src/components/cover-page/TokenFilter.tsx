import React, { FC } from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Radio,
  Select,
  Typography,
} from '@mui/material';
import { HistoryQuery, HistoryQueryForm } from '@tymlez/frontend-libs';
import {
  StyledBootstrapInputBase,
  StyledChooseFilterGrid,
  StyledFilterDateText,
  StyledFormGroupGrid,
  StyledFormGroupTypesGrid,
  StyledHistoryQueryFormGrid,
  StyledShortByText,
  StyledWidthFullFormControl,
} from './styled-components';

interface TokenFilterProps {
  cookiePersistKey: string;
  historyQuery: HistoryQuery;
  onHistoryQueryChange: (h: HistoryQuery) => void;
  sortBy: 'asc' | 'desc';
  onSortByChange: (sort: 'asc' | 'desc') => void;
  raAccountIds: string[];
  selectedRaAccountId: string | undefined;
  onSelectedRaAccountIdChange: (id: string) => void;
  tokenClasses: { tokenId: string; symbol: string }[];
  selectedTokenClassId: string | undefined;
  onSelectedTokenClassIdChange: (id: string | undefined) => void;
}

export const TokenFilter: FC<TokenFilterProps> = ({
  cookiePersistKey,
  historyQuery,
  onHistoryQueryChange,
  sortBy,
  onSortByChange,
  raAccountIds,
  selectedRaAccountId,
  onSelectedRaAccountIdChange,
  tokenClasses,
  selectedTokenClassId,
  onSelectedTokenClassIdChange,
}) => {
  const handleRaAccountIdSelected = (event: { target: { value: string } }) => {
    const newRaAccountId = event.target.value;
    onSelectedRaAccountIdChange(newRaAccountId);
  };

  const handleTokenClassSelected = (event: { target: { value: string } }) => {
    const newTokenClassId = event.target.value;
    onSelectedTokenClassIdChange(newTokenClassId);
  };

  const handleTokenClassFilterToggle = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const turnningOffFilter = !event.target.checked;
    let newTokenClassId = selectedTokenClassId;
    if (turnningOffFilter) {
      newTokenClassId = undefined;
    }

    if (
      !turnningOffFilter &&
      newTokenClassId === undefined &&
      tokenClasses.length > 0
    ) {
      newTokenClassId = tokenClasses[0]?.tokenId;
    }
    onSelectedTokenClassIdChange(newTokenClassId);
  };

  const handleChangeCheckSort = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onSortByChange(
      event.target.value?.toLowerCase() === 'asc' ? 'asc' : 'desc',
    );
  };

  return (
    <StyledHistoryQueryFormGrid container spacing={2}>
      <StyledFormGroupGrid item xs={12} sm={12} md={12} lg={6}>
        <Grid container>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <StyledFilterDateText>Filter by date range</StyledFilterDateText>
            <HistoryQueryForm
              dataTestId="trustchain-history-query"
              persistKey={cookiePersistKey}
              query={historyQuery}
              onUpdateQuery={onHistoryQueryChange}
              backgroundColor="#FCFCFC"
              alignItems="start"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <FormGroup sx={{ display: 'contents' }}>
              <StyledFilterDateText>Filter by Account</StyledFilterDateText>
              <StyledWidthFullFormControl>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={selectedRaAccountId || ''}
                  onChange={handleRaAccountIdSelected}
                  input={<StyledBootstrapInputBase />}
                >
                  {raAccountIds &&
                    raAccountIds.map((item: any) => (
                      <MenuItem value={item} key={item}>
                        {item}
                      </MenuItem>
                    ))}
                </Select>
              </StyledWidthFullFormControl>
            </FormGroup>
          </Grid>
        </Grid>
      </StyledFormGroupGrid>
      <Grid item xs={12} sm={6} md={6} lg={2}>
        <StyledFormGroupTypesGrid>
          <FormGroup sx={{ display: 'contents' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedTokenClassId !== undefined}
                  onChange={handleTokenClassFilterToggle}
                />
              }
              label={
                <Typography
                  sx={{
                    color: selectedTokenClassId ? '#000000' : '#989898',
                    fontSize: '13px',
                    fontWeight: selectedTokenClassId ? '600' : '400',
                  }}
                >
                  Filter by type
                </Typography>
              }
            />
          </FormGroup>

          <StyledWidthFullFormControl
            variant="standard"
            disabled={selectedTokenClassId === undefined}
          >
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={selectedTokenClassId || ''}
              onChange={handleTokenClassSelected}
              input={<StyledBootstrapInputBase />}
            >
              <MenuItem value="null">
                <em>Choose token type</em>
              </MenuItem>

              {tokenClasses &&
                tokenClasses.map((item: any) => (
                  <MenuItem value={item.tokenId} key={item.tokenId}>
                    {item.symbol}
                  </MenuItem>
                ))}
            </Select>
          </StyledWidthFullFormControl>
        </StyledFormGroupTypesGrid>
      </Grid>
      <StyledChooseFilterGrid item xs={12} sm={6} md={6} lg={4}>
        <Grid item xs={12}>
          <StyledShortByText>Sort By</StyledShortByText>
          <Grid item xs={12}>
            <FormGroup sx={{ display: 'contents' }}>
              <Grid container>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Radio
                        value="asc"
                        checked={sortBy === 'asc'}
                        onChange={handleChangeCheckSort}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          color: sortBy === 'asc' ? '#92D050' : '#989898',
                          fontSize: '16px',
                          fontWeight: sortBy === 'asc' ? '600' : '500',
                        }}
                      >
                        Date ascending
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Radio
                        value="desc"
                        checked={sortBy === 'desc'}
                        onChange={handleChangeCheckSort}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          color: sortBy === 'desc' ? '#92D050' : '#989898',
                          fontSize: '16px',
                          fontWeight: sortBy === 'desc' ? '600' : '500',
                        }}
                      >
                        Date descending
                      </Typography>
                    }
                  />
                </Grid>
              </Grid>
            </FormGroup>
          </Grid>
        </Grid>
      </StyledChooseFilterGrid>
    </StyledHistoryQueryFormGrid>
  );
};
