import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';
import { getLastNDaysRange } from '@tymlez/common-libs';
import {
  HistoryQuery,
  useSiteContext,
  TitleHeader,
} from '@tymlez/frontend-libs';
import { Summary } from './summary/Summary';
import { pickerPersistKey } from '../constants';

export const OverviewSite = () => {
  const router = useRouter();
  const { pathname } = router;
  const { currentSite } = useSiteContext();
  const [cookies] = useCookies([pickerPersistKey]);
  const timezone = currentSite?.timezone;
  const [from, to] = cookies[pickerPersistKey] || [];
  const days = getLastNDaysRange(timezone || '', 7);
  const [historyQuery, setHistoryQuery] = useState<HistoryQuery>({
    dateRange: [from || days.from, to || days.to],
  });

  useEffect(() => {
    let fromURL: any = historyQuery.dateRange[0] || '';
    let toURL: any = historyQuery.dateRange[1] || '';
    if (fromURL.length !== 24) {
      fromURL = fromURL.toISOString();
      toURL = toURL.toISOString();
    }

    router.push({
      pathname,
      query: {
        from: fromURL,
        to: toURL,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyQuery, pathname]);

  return (
    <Grid>
      <TitleHeader
        header="Summary from"
        selectSiteHeader="Cohort"
        siteName="Cohort Innovation Space"
        siteAddress="16 Nexus Way, Southport QLD 4215"
        dataTestId="cohort-header"
        historyQuery={historyQuery}
        setHistoryQuery={setHistoryQuery}
        pickerPersistKey={pickerPersistKey}
      />

      <Grid item xs={12}>
        <Summary dataTestId="cohort-summary" historyQuery={historyQuery} />
      </Grid>
    </Grid>
  );
};
