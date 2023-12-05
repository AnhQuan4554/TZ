import { Button, Card, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC, useState } from 'react';
import { Loading } from '@tymlez/frontend-libs';
import { useCarbonPurchased, useDovuLink } from '../../../hooks/useDovu';
import { PurchaseHistory } from './PurchaseHistory';

const StyledGridItem = styled('div')({
  display: 'flex',
  marginTop: '30px',
  marginBottom: '30px',
  justifyContent: 'center',
  height: 57,
});
const StyledTypographyTitle = styled(Typography)({
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: '24px',
  color: '#293343',
});
export const CarbonPurchase: FC = () => {
  const [isHistoryOpen, setHistoryOpen] = useState<boolean>(false);

  const { data: path, isLoading } = useDovuLink();
  const { data: carbonPurchased } = useCarbonPurchased();
  if (isLoading) {
    return <Loading dataTestId="dovu-carbon-purchase-loading" />;
  }

  return (
    <>
      <Card
        data-test-id="dovu-carbon-offsets"
        sx={{ px: 3, py: 2, boxShadow: '0px 6px 15px rgb(100 116 139 / 12%)' }}
      >
        <Typography
          data-test-id="dovu-carbon-purchase-title"
          style={{
            fontSize: '24px',
            fontWeight: 700,
            lineHeight: '36px',
            color: '#293343',
          }}
        >
          Carbon Offsets
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Grid
              sx={{
                borderColor: '#ECECEC',
                borderStyle: 'solid',
                p: 2,
                height: '100%',
              }}
            >
              <StyledTypographyTitle>
                Carbon Offsets Provided by
              </StyledTypographyTitle>
              <StyledGridItem style={{ justifyContent: 'left' }}>
                <img alt="dovu" src="../dovu.svg" />
              </StyledGridItem>
              <Typography variant="h6">Dovu</Typography>
              <Typography variant="caption">
                The trust layer for carbon offset integrity
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Grid
              sx={{
                borderColor: '#ECECEC',
                borderStyle: 'solid',
                p: 2,
                height: '100%',
              }}
            >
              <StyledTypographyTitle>
                Carbon Offsets Purchased
              </StyledTypographyTitle>
              <StyledGridItem>
                <Typography
                  data-test-id="dovu-carbon-purchase-value"
                  style={{
                    fontSize: '32px',
                    fontWeight: 700,
                    lineHeight: '48px',
                    color: '#293343',
                  }}
                >
                  {(carbonPurchased || 0) / 1000} (t)
                </Typography>
              </StyledGridItem>
              <Button
                data-test-id="dovu-carbon-purchase-btn-view-history"
                sx={{ width: '100%' }}
                variant="outlined"
                color="primary"
                onClick={() => setHistoryOpen(true)}
              >
                View History
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={9} md={6} lg={4} xl={4}>
            <Grid
              sx={{
                borderColor: '#ECECEC',
                borderStyle: 'solid',
                p: 2,
                height: '100%',
              }}
            >
              <StyledTypographyTitle>
                Purchase Carbon Offsets
              </StyledTypographyTitle>
              <Grid
                style={{
                  justifyContent: 'center',
                  display: 'flex',
                }}
              >
                <iframe
                  title="Purchase Carbon Offsets"
                  src={path}
                  width="100%"
                  height="240"
                  style={{ border: 0 }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>

      <PurchaseHistory
        isOpen={isHistoryOpen}
        handleClose={() => setHistoryOpen(false)}
      />
    </>
  );
};
