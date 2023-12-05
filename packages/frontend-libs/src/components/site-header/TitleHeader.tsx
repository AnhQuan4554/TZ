import type { FC } from 'react';
import { Grid } from '@mui/material';
import { HistoryQuery, HistoryQueryForm } from '../date-range-pickers';
import { useBreakpoint } from '../../hooks';
import { StickyTitleHeader } from './styles/TitleHeaderStyle';
import { SiteHeader } from './SiteHeader';

interface IHeaderProps {
  header: string;
  selectSiteHeader: string;
  siteName: string;
  siteAddress: string;
  historyQuery?: HistoryQuery;
  setHistoryQuery?: any;
  pickerPersistKey?: string;
  dataTestId: string;
}

export const TitleHeader: FC<IHeaderProps> = ({
  header,
  selectSiteHeader,
  siteName,
  siteAddress,
  historyQuery,
  setHistoryQuery,
  pickerPersistKey,
  dataTestId,
}) => {
  const isSmallScreen = useBreakpoint('sm', 'down');
  return (
    <StickyTitleHeader container>
      <SiteHeader
        header={header}
        selectSiteHeader={selectSiteHeader}
        siteName={siteName}
        siteAddress={siteAddress}
        dataTestId={dataTestId}
      />
      {historyQuery && (
        <Grid
          item
          sm={12}
          md={6}
          sx={{
            display: 'flex',
            justifyContent: {
              xs: 'flex-start',
              sm: 'flex-start',
              md: 'flex-end',
            },
          }}
        >
          <HistoryQueryForm
            dataTestId={`${dataTestId}-history-query`}
            persistKey={pickerPersistKey}
            query={historyQuery}
            onUpdateQuery={setHistoryQuery}
            backgroundColor="#FCFCFC"
            alignItems={!isSmallScreen ? 'end' : 'start'}
          />
        </Grid>
      )}
    </StickyTitleHeader>
  );
};
