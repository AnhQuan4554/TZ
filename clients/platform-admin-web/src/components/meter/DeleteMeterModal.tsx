import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React, { FC } from 'react';
import toast from 'react-hot-toast';
import type { IMeter } from '@tymlez/platform-api-interfaces';
import { useForm } from '../../api/usePostForm';
import { StyledTypography } from '../StyledTypography';

type Props = {
  open: boolean;
  onClose: () => void;
  meterId?: string;
  meterName: string;
};

export const DeleteMeterModal: FC<Props> = (props) => {
  const { meterId, meterName, open, onClose } = props;
  const mutateForm = useForm<IMeter>('meters', 'DELETE', meterId);

  const onDelete = () => {
    mutateForm.mutateAsync({ meterId } as any, {
      onSuccess: (res: any) => {
        if (res.data.success) {
          toast.success('Meter deleted');
          closeForm();
        } else {
          toast.error(res.data.message);
        }
      },
      onError: (err: any) => {
        toast.error(err.message);
      },
    });
  };

  const closeForm = () => {
    mutateForm.reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this meter?
        <StyledTypography>{meterName} </StyledTypography>
      </DialogContent>
      <DialogActions>
        <Button
          size="large"
          variant="contained"
          color="info"
          onClick={closeForm}
        >
          No
        </Button>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={onDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
