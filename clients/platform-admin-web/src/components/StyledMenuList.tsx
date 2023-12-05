import { Box, MenuItem } from '@mui/material';
import { StyledTypography } from './StyledTypography';

interface MenuProps {
  title: string;
  data: Array<any>;
}

export function StyledMenuList({ title, data }: MenuProps) {
  return (
    <Box>
      {title}
      {data.map((x, index) => (
        <MenuItem key={x.name} value={x.name}>
          <StyledTypography>
            {index + 1}. {x.name}
          </StyledTypography>
        </MenuItem>
      ))}
    </Box>
  );
}
