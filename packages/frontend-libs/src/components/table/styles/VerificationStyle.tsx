import { Card, TableCell, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { formatNumber } from '@tymlez/common-libs';

export const BodyTypographyStyled = styled(Typography)({
  color: 'textPrimary',
  variant: 'body2',
  fontSize: 25,
  fontWeight: 'bold',
  p: 1,
  marginTop: '8px',
});

export const StyledCard = styled(Card)({
  padding: '8px',
  marginBottom: 15,
  textAlign: 'center',
  background: 'rgb(168, 217, 115)',
  color: '#ffffff',
});

export const HeaderTypographyStyled = styled(Typography)({
  color: 'textPrimary',
  variant: 'body1',
});

export const HeaderTableCell = styled(TableCell)({
  background: 'rgb(168, 217, 115)',
  color: '#ffffff !important',
});

export interface ICardProps {
  title: string;
  uom?: string;
  value: number;
  roundDigits?: number;
  dataTestId?: string;
}

export function CustomizedCard(props: ICardProps) {
  const { title, uom, value, roundDigits = 4, dataTestId } = props;
  return (
    <StyledCard sx={{ pt: 1 }} data-test-id={dataTestId}>
      <HeaderTypographyStyled>
        {title} ({uom})
      </HeaderTypographyStyled>
      <BodyTypographyStyled sx={{ mt: 2 }}>{formatNumber(value, roundDigits)}</BodyTypographyStyled>
    </StyledCard>
  );
}

export const VerifiedStyle = makeStyles({
  mainTitleComponent: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  tableStyle: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    padding: '24px',
  },
  btnTable: {
    fontSize: '13px',
    borderRadius: '21px',
    fontWeight: 700,
    textAlign: 'center',
    padding: '8px',
    width: 'fit-content',
  },
  footerComponent: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0px 0px 24px 24px',
  },
  footerTitle: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
  },
  paginationStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '24px',
  },
});
