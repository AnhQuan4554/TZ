import * as React from 'react';
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface CommonDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  dialogButtons: any;
}

export function CommonDialog({
  open,
  onClose,
  title,
  content,
  dialogButtons,
}: CommonDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <Box
        sx={{
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'row',
          p: 3,
        }}
      >
        <DialogActions>
          {dialogButtons}
          <Button
            variant="contained"
            color="inherit"
            size="large"
            onClick={onClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
