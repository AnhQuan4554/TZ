import * as React from 'react';
import toast from 'react-hot-toast';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import type { IInstaller } from '@tymlez/platform-api-interfaces';
import { useForm } from '../../../api/usePostForm';
import { BootstrapStatus } from '../BootstrapStatus';

interface prop {
  id: string;
  open: boolean;
  onClose: () => void;
}

const PublishInstallerButton = ({ id, open, onClose }: prop) => {
  const mutateForm = useForm<IInstaller>('installer/publish', 'POST', id);

  const onPublish = async () => {
    mutateForm.mutateAsync({ id } as any, {
      onSuccess: (res: any) => {
        if (res.data.success) {
          toast.success('Installer published successfully.');
        } else {
          toast.error(`Failed to publish installer.  ${res.data.message}`);
        }
        closeForm();
      },
      onError: (err: any) => {
        toast.error(`Failed to publish installer.  ${err.message}`);
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
        Are you sure you want to publish installer data to Guardian ?
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

export default PublishInstallerButton;
