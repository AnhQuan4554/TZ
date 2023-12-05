import { Card, Grid, Stack, Typography, Box } from '@mui/material';
import { formatNumber } from '@tymlez/common-libs';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Loading } from '@tymlez/frontend-libs';
import type { FC } from 'react';
import { hydrogenFootPrintStyles } from '../../../styles/energy/hydrogenFootPrintStyles';
import { getCarbonIntensity } from '../../../hooks/summary';

interface Props {
  data: any;
}
export const HydrogenFootprint: FC<Props> = ({ data }) => {
  const classes = hydrogenFootPrintStyles();
  const dataCarbon = getCarbonIntensity(data);

  return (
    <Stack direction="column" spacing={5} sx={{ height: '100%' }}>
      <Card elevation={12} style={{ padding: '24px', height: '100%' }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.headingComponent}>
              Carbon Intensity
            </Typography>
            <Grid className={classes.imgComponent}>
              <img
                style={{
                  width: '120px',
                }}
                src="icons/compressedAirH2.svg"
                alt="icon"
              />
            </Grid>
            {dataCarbon.value !== 0 ? (
              <Grid item xs={12} className={classes.jcCenter}>
                <Typography className={classes.productionValue}>
                  {formatNumber(dataCarbon.value || 0)} {dataCarbon.unit}
                </Typography>
                {dataCarbon.percentageChange >= 0 ? (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '13px',
                      padding: '4px 16px',
                      height: '32px',
                      background: 'rgba(39, 194, 129, 0.1)',
                      color: '#0A7A4B',
                      borderRadius: '2px',
                      marginLeft: '8px',
                    }}
                  >
                    <ArrowUpwardIcon color="success" />
                    {dataCarbon.percentageChange} %
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '13px',
                      padding: '4px 16px',
                      height: '32px',
                      background: 'rgba(207, 55, 44, 0.1)',
                      color: '#CF372C',
                      borderRadius: '2px',
                      marginLeft: '8px',
                    }}
                  >
                    <ArrowDownwardIcon color="error" />
                    {dataCarbon.percentageChange} %
                  </Box>
                )}
              </Grid>
            ) : (
              <Loading />
            )}

            <Typography className={classes.txtHydrogenFooter}>
              CO2eq produced per kL of water pumped
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
};
