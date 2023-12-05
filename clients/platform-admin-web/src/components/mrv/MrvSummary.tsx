import { Card, Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { formatNumber } from '@tymlez/common-libs';
import { Loading } from '@tymlez/frontend-libs';
import type { FC } from 'react';
import { useMrvSummary } from '../../api/useFetchMrvData';

const HeaderTypographyStyled = styled(Typography)({
  fontSize: 25,
  fontWeight: 'bold',
  padding: '8px',
});

const StyledCard = styled(Card)({
  margin: '15px 0',
  padding: '8px',
  width: '100%',
});

const StyledBox = styled(Box)({
  margin: '8px',
  padding: '8px',
  border: '1px solid #3A5320',
  borderRadius: '5px',
  textAlign: 'center',
  contentAlign: 'bottom',
});

const BodyTypographyStyled = styled(Typography)({
  fontSize: '16px',
});
const BodyValueTypographyStyled = styled(Typography)({
  fontSize: '20px',
  fontWeight: 'bold',
});

interface Props {
  startDateTime: string;
  endDateTime: string;
}

export const MrvSummary: FC<Props> = ({ startDateTime, endDateTime }) => {
  const { data, isLoading } = useMrvSummary(startDateTime, endDateTime);
  const evenNumber = data && data.length % 2 === 0;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Grid container spacing={3}>
      {data &&
        data.map((item, index) => {
          const lastIndex = index + 1 === data.length;

          return (
            <Grid
              item
              key={item.policyTag}
              xs={12}
              sm={!evenNumber && lastIndex ? 12 : 6}
              md={!evenNumber && lastIndex ? 12 : 6}
            >
              <StyledCard>
                <HeaderTypographyStyled>
                  {item.policyTag}
                </HeaderTypographyStyled>
                <Box
                  sx={{
                    mt: 1,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, minmax(80px, 400px))',
                  }}
                >
                  <StyledBox>
                    <BodyTypographyStyled>
                      Total CO2EQ Emission sent
                    </BodyTypographyStyled>
                    <BodyValueTypographyStyled>
                      {formatNumber(item.totalCO2Emission)}
                    </BodyValueTypographyStyled>
                  </StyledBox>

                  <StyledBox>
                    <BodyTypographyStyled>
                      Total CO2EQ Reduction sent
                    </BodyTypographyStyled>
                    <BodyValueTypographyStyled>
                      {formatNumber(item.totalCO2Reduction)}
                    </BodyValueTypographyStyled>
                  </StyledBox>

                  <StyledBox>
                    <BodyTypographyStyled>Reading value </BodyTypographyStyled>
                    <BodyValueTypographyStyled>
                      {formatNumber(item.readingValue)}
                    </BodyValueTypographyStyled>
                  </StyledBox>

                  <StyledBox>
                    <BodyTypographyStyled>MRV aggregation</BodyTypographyStyled>
                    <BodyValueTypographyStyled>
                      {formatNumber(item.mrvAggregation)}
                    </BodyValueTypographyStyled>
                  </StyledBox>
                </Box>
              </StyledCard>
            </Grid>
          );
        })}
    </Grid>
  );
};
