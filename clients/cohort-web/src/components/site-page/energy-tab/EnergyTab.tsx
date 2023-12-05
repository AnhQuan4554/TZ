import type { FC } from 'react';
import { Tab, Tabs } from '@mui/material';
import * as React from 'react';
import { useRouter } from 'next/router';
import { useBreakpoint } from '@tymlez/frontend-libs';

interface TabProps {
  data: { key: string; label: string; value: string }[];
}

export const EnergyTab: FC<TabProps> = ({ data }) => {
  const router = useRouter();
  const { pathname } = router;

  const urlParams = new URLSearchParams(window.location.search || '');
  const fromURL = urlParams.get('from');
  const toURL = urlParams.get('to');
  const isSmallScreen = useBreakpoint('sm', 'down');

  return (
    <Tabs
      data-test-id="cohort-energy-tabs"
      indicatorColor="primary"
      scrollButtons="auto"
      textColor="primary"
      value={pathname === '/' ? '/tenancy' : pathname}
      variant={isSmallScreen ? 'scrollable' : 'fullWidth'}
      sx={{
        '& button.MuiTab-textColorPrimary': {
          m: 3,
          py: 1,
          px: 3,
          background: '#F5F5F5',
          border: '1px solid #F2F2F2',
          borderRadius: '4px',
        },
        '& button:hover': {},
        '& button.Mui-selected': {
          m: 3,
          borderRadius: '4px',
          background: '#92D050',
          color: '#293343',
        },
      }}
      TabIndicatorProps={{
        style: {
          backgroundColor: 'transparent',
        },
      }}
    >
      {data.map((tab) => {
        return (
          <Tab
            data-test-id={`cohort-energy-tab-child-${tab.key}`}
            key={tab.key}
            label={tab.label}
            value={tab.value}
            onClick={() => {
              router.push(
                {
                  pathname: tab.value,
                  query: {
                    from: fromURL,
                    to: toURL,
                  },
                },
                '',
                { scroll: false },
              );
            }}
          />
        );
      })}
    </Tabs>
  );
};
