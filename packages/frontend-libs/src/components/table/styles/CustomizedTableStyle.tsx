import type { FC } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { TableRow, TableCell, Box, IconButton, Typography } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import type { TablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions';
import { VerifiedTymlezLogo } from '../../../components/logo';

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#92d050', //grey[500],
    fontWeight: 'bold',
    color: '#ffffff',
    border: '1px solid',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: '1px solid rgba(224, 224, 224, 1)',
    padding: '10px 10px',
  },
}));

export const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F4F5F7',
  },

  // '&:last-child td, &:last-child th': {
  //   border: 0,
  //   backgroundColor: '#F4F5F7',
  // },
}));

const StyledFooterComponent = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  marginTop: 9,
});

const StyledFooterTitle = styled(Typography)({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
  variant: 'subtitle2',
});

export function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

interface Props {
  dataTestId: string;
}
export const StyledTableFooter: FC<Props> = ({ dataTestId }) => {
  return (
    <StyledFooterComponent data-test-id={dataTestId}>
      <VerifiedTymlezLogo />
      <Box sx={{ p: 1 }}>
        <StyledFooterTitle>
          All data secured by the TYMLEZ platform built on Hedera hashgraph
        </StyledFooterTitle>
      </Box>
    </StyledFooterComponent>
  );
};
