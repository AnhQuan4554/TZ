import { Box, Tab, Tabs } from '@mui/material';
import type { NextPage } from 'next';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import * as React from 'react';
import { StyledTabPanel, TabProps } from '../StyledTab';
import { ExportForm } from './ExportForm';
import { ImportForm } from './ImportForm';

export const ImportExportPage: NextPage = () => {
  const [tab, setTab] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const tabList = [
    {
      id: 0,
      tabName: 'Import',
      icon: <ImportExportIcon fontSize="small" />,
      page: <ImportForm />,
    },
    {
      id: 1,
      tabName: 'Export',
      icon: <ImportExportIcon fontSize="small" />,
      page: <ExportForm />,
    },
  ];
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={tab}
        onChange={handleChange}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        {tabList.map((item, index) => {
          return (
            <Tab
              key={item.id}
              icon={item.icon}
              iconPosition="start"
              label={item.tabName}
              {...TabProps(index)}
            />
          );
        })}
      </Tabs>

      {tabList.map(({ id, page }) => (
        <StyledTabPanel value={tab} index={id} key={id}>
          {page}
        </StyledTabPanel>
      ))}
    </Box>
  );
};
