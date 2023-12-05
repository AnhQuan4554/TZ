import type { FC } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReportStyle } from 'src/components/report/styled-components';
import Link from 'next/link';
import ReportImage from '../../../public/images/ReportImage.png';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(2),
  height: '100%',
  border: '1px solid #ECECEC',
  borderRadius: '8px',
}));

interface Props {
  data: {
    id: number;
    title: string;
    description: string;
    type: string;
  };
  dataTestId?: string;
}

export const ReportComponent: FC<Props> = ({ data, dataTestId }) => {
  const classes = ReportStyle();

  // const { data: series } = useSummarySeries(from, to, data.name);
  // const { data: preValue, isLoading } = useSummaryPreValue(from, to, data.name);

  // // eslint-disable-next-line no-param-reassign
  // data.preValue = preValue || 0;

  return (
    <Grid item xs={12} sm={6} md={6} xl={4} lg={4} data-test-id={dataTestId}>
      <Link
        href={{
          pathname: '/meter-report',
          query: {
            id: data.id,
            type: data.type,
            // ...params,
          }, // the data
        }}
        passHref
      >
        <Item>
          <Grid container className={classes.dashBoardReport}>
            <Box>
              <img
                src={ReportImage.src}
                alt="imageReport"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
            <Box>
              <Typography className={classes.titleReportCard}>
                {data.title}
              </Typography>
              <Typography className={classes.descriptionReportCard}>
                {data.description}
              </Typography>
            </Box>
          </Grid>
        </Item>
      </Link>
    </Grid>
  );
};
