import { Box } from '@mui/material';
import type { NextPage } from 'next';
import { Summary } from './Overview';
import { CustomizedOverviewTable } from './OverviewTable';
import { useGuardianSummary } from '../../../api/useGuardianSummary';
import { Loading } from '../../Loading';

export const OverviewPage: NextPage = () => {
  const { data } = useGuardianSummary();
  if (!data) {
    return <Loading />;
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          textAlign: 'center',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(200px, 1fr))',
          columnGap: '16px',
        }}
      >
        <Summary data={data} />
      </Box>
      <Box>
        <CustomizedOverviewTable data={data.entities} />
      </Box>
    </Box>
  );
};
