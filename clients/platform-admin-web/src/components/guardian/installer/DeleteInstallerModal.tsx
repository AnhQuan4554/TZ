import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React, { FC } from 'react';
import toast from 'react-hot-toast';
import type { IInstaller } from '@tymlez/platform-api-interfaces';
import { useForm } from '../../../api/usePostForm';
import { StyledTypography } from '../../StyledTypography';
import {
  useFetchDevicesMetersByInstaller,
  useFetchDevicesWithoutMetersByInstaller,
} from '../../../api/useFetchDeviceData';
import { StyledDeviceMenuList } from '../device/StyledDeviceMenuList';

type Props = {
  open: boolean;
  onClose: () => void;
  id?: string;
  installerId: string;
};

export const DeleteInstallerModal: FC<Props> = (props) => {
  const { id, installerId, open, onClose } = props;
  const mutateForm = useForm<IInstaller>('delete/installer', 'DELETE', id);
  const { data: devicesWithMeters } = useFetchDevicesMetersByInstaller(id);
  const { data: devicesWithoutMeters } =
    useFetchDevicesWithoutMetersByInstaller(id);

  const onDelete = () => {
    if (devicesWithMeters && devicesWithMeters.length > 0) {
      toast.error('Cannot delete the installer. Its devices have meters');
      closeForm();
      return;
    }
    mutateForm.mutateAsync({ id } as any, {
      onSuccess: (res: any) => {
        if (res.data.success) {
          toast.success('Installer deleted');
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
        Are you sure you want to delete this installer?
        <StyledTypography>{installerId} </StyledTypography>
        {devicesWithoutMeters && devicesWithoutMeters.length > 0 && (
          <StyledDeviceMenuList devicesWithoutMeters={devicesWithoutMeters} />
        )}
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
