import { Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { IGuardianSummary } from '@tymlez/platform-api-interfaces';
import type { FC } from 'react';

const HeaderTypographyStyled = styled(Typography)({
  color: 'textPrimary',
  variant: 'body1',
});

const BodyTypographyStyled = styled(Typography)({
  color: 'textPrimary',
  variant: 'body2',
  fontSize: 25,
  fontWeight: 'bold',
  p: 1,
});

const StyledCard = styled(Card)({
  marginBottom: 15,
  extAlign: 'center',
});

interface Props {
  data: IGuardianSummary;
}

export const Summary: FC<Props> = ({ data }) => {
  return (
    <>
      <StyledCard sx={{ p: 3 }}>
        <HeaderTypographyStyled>Root Authority Balance</HeaderTypographyStyled>
        <BodyTypographyStyled>
          {data.rootAuthorityAccountId}
        </BodyTypographyStyled>
        <BodyTypographyStyled>{data.rootAuthorityBalance}</BodyTypographyStyled>
      </StyledCard>

      <StyledCard sx={{ p: 3 }}>
        <HeaderTypographyStyled>Guardian Status</HeaderTypographyStyled>
        <BodyTypographyStyled>{data.status}</BodyTypographyStyled>
        <CheckCircleIcon color="primary" fontSize="large" />
      </StyledCard>

      <StyledCard sx={{ p: 3 }}>
        <HeaderTypographyStyled>Total Installers</HeaderTypographyStyled>
        <BodyTypographyStyled>{data.installers}</BodyTypographyStyled>
      </StyledCard>

      <StyledCard sx={{ p: 3 }}>
        <HeaderTypographyStyled>Devices Installed</HeaderTypographyStyled>
        <BodyTypographyStyled>{data.devices}</BodyTypographyStyled>
      </StyledCard>
    </>
  );
};
