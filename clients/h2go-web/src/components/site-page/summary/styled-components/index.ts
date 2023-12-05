import { styled } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';

export const StyledContainerGrid = styled(Grid)(({ theme }) => ({
  borderTop: '1px dashed #ECECEC',
  padding: theme.spacing(2),
  alignItems: 'center',
}));

export const StyledJcFlexStartGrid = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
}));

export const StyledTitleTypography = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: '24px',
  color: theme.palette.text.primary,
}));

export const StyledJcCenterGrid = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledJcFlexEndGrid = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
}));

export const StyledHydrogenValueTypography = styled(Typography)(
  ({ theme }) => ({
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '24px',
    color: '#293343',
    marginRight: theme.spacing(1),
  }),
);

export const StyledHeadingComponentTypography = styled(Typography)(
  ({ theme }) => ({
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '24px',
    color: theme.palette.text.primary,
  }),
);

export const StyledImgComponentGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

export const StyledProductionValueTypography = styled(Typography)(
  ({ theme }) => ({
    fontSize: '32px',
    fontWeight: 500,
    lineHeight: '24px',
    color: theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
);

export const StyledTxtHydrogenFooterTypography = styled(Typography)(
  ({ theme }) => ({
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '24px',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  }),
);

export const StyledMaintTitleComponentTypography = styled(Typography)(
  ({ theme }) => ({
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '36px',
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
  }),
);
