import { Box, CircularProgress } from '@mui/material';

export function Loading() {
  return (
    <Box
      sx={{
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <CircularProgress sx={{ m: 2 }} />
    </Box>
  );
}
