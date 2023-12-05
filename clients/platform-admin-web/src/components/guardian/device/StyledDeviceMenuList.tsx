import { Box, MenuItem } from '@mui/material';
import type { IDevice } from '@tymlez/platform-api-interfaces';
import { StyledTypography } from '../../StyledTypography';

interface MenuProps {
  devicesWithoutMeters: IDevice[];
}

export function StyledDeviceMenuList({ devicesWithoutMeters }: MenuProps) {
  return (
    <Box>
      This will also delete {devicesWithoutMeters.length} device(s):
      {devicesWithoutMeters.map((x, index) => (
        <MenuItem key={x.deviceId} value={x.deviceId}>
          <StyledTypography>
            {index + 1}. {x.deviceId}
          </StyledTypography>
        </MenuItem>
      ))}
    </Box>
  );
}
