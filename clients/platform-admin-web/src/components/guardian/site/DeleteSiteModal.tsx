import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React, { FC } from 'react';
import toast from 'react-hot-toast';
import type { IGuardianSite } from '@tymlez/platform-api-interfaces';
import { useForm } from '../../../api/usePostForm';
import { StyledTypography } from '../../StyledTypography';
import { StyledDeviceMenuList } from '../device/StyledDeviceMenuList';
import {
  useFetchDevicesMetersByGuardianSite,
  useFetchDevicesWithoutMetersByGuardianSite,
} from '../../../api/useFetchDeviceData';

type Props = {
  open: boolean;
  onClose: () => void;
  id: string;
  siteName: string;
};

export const DeleteSiteModal: FC<Props> = (props) => {
  const { id, siteName, open, onClose } = props;
  const mutateForm = useForm<IGuardianSite>(
    'delete/guardian-site',
    'DELETE',
    id,
  );
  const { data: devicesWithMeters } = useFetchDevicesMetersByGuardianSite(id);
  const { data: devicesWithoutMeters } =
    useFetchDevicesWithoutMetersByGuardianSite(id);

  const onDelete = () => {
    if (devicesWithMeters && devicesWithMeters.length > 0) {
      toast.error('Cannot delete the guardian site. Its devices have meters');
      closeForm();
      return;
    }
    mutateForm.mutateAsync({ id } as any, {
      onSuccess: (res: any) => {
        if (res.data.success) {
          toast.success('Site deleted');
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
        Are you sure you want to delete this site?
        <StyledTypography>{siteName} </StyledTypography>
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
