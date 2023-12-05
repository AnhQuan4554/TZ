import * as React from 'react';
import toast from 'react-hot-toast';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import type { IDevice } from '@tymlez/platform-api-interfaces';
import { useForm } from '../../../api/usePostForm';
import { BootstrapStatus } from '../BootstrapStatus';

interface prop {
  id: string;
  open: boolean;
  onClose: () => void;
}

const PublishDeviceButton = ({ open, onClose, id }: prop) => {
  const mutateForm = useForm<IDevice>('device/publish', 'POST', id);

  const onPublish = async () => {
    mutateForm.mutateAsync({ id } as any, {
      onSuccess: (res: any) => {
        if (res.data.success) {
          toast.success('Device published successfully.');
        } else {
          toast.error(`Failed to publish device.  ${res.data.message}`);
        }
        closeForm();
      },
      onError: (err: any) => {
        toast.error(`Failed to publish device.  ${err.message}`);
        closeForm();
      },
    });
  };

  const closeForm = () => {
    mutateForm.reset();
    onClose();
  };
  if (mutateForm.isLoading) {
    return <BootstrapStatus isOpen={mutateForm.isLoading} />;
  }
  return (
    <Dialog open={open} aria-labelledby="confirm-dialog">
      <DialogTitle id="confirm-dialog">Please confirm</DialogTitle>
      <DialogContent>
        Are you sure you want to publish device data to Guardian ?
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={closeForm} color="info">
          No
        </Button>
        <Button variant="contained" onClick={onPublish} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PublishDeviceButton;
