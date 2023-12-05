import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import Head from 'next/head';
import { HistoryQuery, useSiteContext } from '@tymlez/frontend-libs';
import { getLastNDaysRange } from '@tymlez/common-libs';
import { useTokens } from 'src/hooks/useTokensData';
import { useCookies } from 'react-cookie';
import { TokenGrid } from './TokenGrid';
import { TrustChainSiteBanner } from './TrustChainSiteBanner';
import { BoxDotted } from '../border-dotted/BoxDotted';
import { TokenFilter } from './TokenFilter';
import { LoadMoreTokensAction } from './LoadMoreTokensAction';
import { StyledMainGrid } from './styled-components';

export const CoverPage: NextPage = () => {
  const urlParams = new URLSearchParams(window.location.search || '');
  const defaultRaAccountId = urlParams.get('accountId') || undefined;
  const defaultTokenClassId = urlParams.get('type') || undefined;

  const { currentSite } = useSiteContext();

  const defaultDateRange = getLastNDaysRange(currentSite?.timezone || '', 1);
  const datePickerCookiePersistKey = 'trustChainDateRange';
  const [cookies] = useCookies([datePickerCookiePersistKey]);
  const [cookieFrom, cookieTo] = cookies[datePickerCookiePersistKey] || [];
  const defaultHistoryQuery: HistoryQuery = {
    dateRange:
      cookieFrom && cookieTo
        ? [cookieFrom, cookieTo]
        : [defaultDateRange.from, defaultDateRange.to],
  };

  const {
    tokenClasses,
    selectedTokenClassId,
    setSelectedTokenClassId,
    rootAuthorityAccountIds,
    selectedRaAccountId,
    setSelectedRaAccountId,
    tokens,
    hasMoreTokens,
    loadMoreTokens,
    isLoading,
    historyQuery,
    setHistoryQuery,
    sortBy,
    setSortBy,
  } = useTokens(
    defaultRaAccountId,
    defaultTokenClassId,
    defaultHistoryQuery,
    'asc',
  );

  const updateBrowserUrl = (
    tokenClassId: string | undefined,
    raAccountId: string | undefined,
  ) => {
    window.history.pushState(
      {},
      '',
      `/trustchain?type=${tokenClassId || ''}&accountId=${raAccountId || ''}`,
    );
  };

  const handleSelectedRaAccountIdChange = (raAccountId: string) => {
    setSelectedRaAccountId(raAccountId);
    updateBrowserUrl(selectedTokenClassId, raAccountId);
  };

  const handleSelectedTokenClassIdChange = (
    tokenClassId: string | undefined,
  ) => {
    setSelectedTokenClassId(tokenClassId);
    updateBrowserUrl(tokenClassId, selectedRaAccountId);
  };

  const handleHistoryQueryChange = (query: HistoryQuery) => {
    setHistoryQuery(query);
  };

  const handleSortByChange = (sort: 'asc' | 'desc') => {
    setSortBy(sort);
  };

  const loadBtn = useRef<any>();
  useEffect(() => {
    if (tokens.length > 10) {
      loadBtn.current?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return (
    <>
      <Head>
        <title>Trust chain</title>
      </Head>

      <Grid sx={{ width: '100%' }}>
        <TrustChainSiteBanner />
        <StyledMainGrid>
          <TokenFilter
            cookiePersistKey={datePickerCookiePersistKey}
            historyQuery={historyQuery}
            onHistoryQueryChange={handleHistoryQueryChange}
            sortBy={sortBy}
            onSortByChange={handleSortByChange}
            raAccountIds={rootAuthorityAccountIds}
            selectedRaAccountId={selectedRaAccountId}
            onSelectedRaAccountIdChange={handleSelectedRaAccountIdChange}
            tokenClasses={tokenClasses}
            selectedTokenClassId={selectedTokenClassId}
            onSelectedTokenClassIdChange={handleSelectedTokenClassIdChange}
          />

          <BoxDotted />
          {tokens.length > 0 && (
            <TokenGrid
              raAccountId={selectedRaAccountId}
              dataTestId="trustchain-list-product"
              tokens={tokens}
            />
          )}
          <LoadMoreTokensAction
            isLoading={isLoading}
            disabled={!hasMoreTokens}
            loadedTokenCount={tokens.length}
            onLoadMore={() => loadMoreTokens()}
          />
        </StyledMainGrid>
      </Grid>
    </>
  );
};
