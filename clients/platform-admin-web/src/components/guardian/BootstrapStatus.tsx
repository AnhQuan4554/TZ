import {
  Box,
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  Alert,
} from '@mui/material';
import { msecToTime } from '@tymlez/common-libs';
import { useEffect, useState } from 'react';
import { useBootstrapStatus } from '../../api/useBootstrapStatus';

interface IBootstrapStatusProps {
  isOpen: boolean;
}
export function BootstrapStatus(props: IBootstrapStatusProps) {
  const { isOpen } = props;
  const [open, setOpen] = useState(isOpen);
  const { data } = useBootstrapStatus(open);
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  return (
    <Dialog open={open} aria-labelledby="confirm-dialog">
      <DialogTitle id="confirm-dialog">
        Bootstrap is running ..... {msecToTime(data?.totalTimes || 0)}
      </DialogTitle>
      <DialogContent>
        {data ? (
          data.status.map((message, messageIndex) => (
            <Box sx={{ mb: 1 }} key={messageIndex}>
              <Alert severity="info">{message}</Alert>
            </Box>
          ))
        ) : (
          <Alert severity="info">....</Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setOpen(false);
          }}
        >
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  );
}
