import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React, { FC } from 'react';
import toast from 'react-hot-toast';
import type { IDevice } from '@tymlez/platform-api-interfaces';
import { useForm } from '../../../api/usePostForm';
import { StyledTypography } from '../../StyledTypography';
import { useFetchMetersByDevice } from '../../../api/useFetchMeterData';

type Props = {
  open: boolean;
  onClose: () => void;
  id: string;
  deviceId: string;
};

export const DeleteDeviceModal: FC<Props> = (props) => {
  const { id, deviceId, open, onClose } = props;
  const mutateForm = useForm<IDevice>('delete/device', 'DELETE', id);
  const { data: meters } = useFetchMetersByDevice(id);

  const onDelete = () => {
    if (meters && meters.length > 0) {
      toast.error('Cannot delete the device. It has meters');
      closeForm();
      return;
    }
    mutateForm.mutateAsync({ id } as any, {
      onSuccess: (res: any) => {
        if (res.data.success) {
          toast.success('Device deleted!');
        } else {
          toast.error(res.data.message);
        }
        closeForm();
      },
      onError: (err: any) => {
        toast.error(err.message);
        closeForm();
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
        Are you sure you want to delete this device?
        <StyledTypography>{deviceId} </StyledTypography>
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
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
