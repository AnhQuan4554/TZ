import { useMediaQuery } from '@mui/material';
import { Breakpoint, useTheme } from '@mui/material/styles';

export function useBreakpoint(media: Breakpoint, trend: string): boolean {
  const theme = useTheme();
  switch (trend) {
    case 'up':
      return useMediaQuery(theme.breakpoints.up(media));
    case 'down':
      return useMediaQuery(theme.breakpoints.down(media));

    default:
      return false;
  }
}
