import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import type { IRole } from '@tymlez/platform-api-interfaces';
import React, { FC } from 'react';
import toast from 'react-hot-toast';
import { useForm } from '../../api/usePostForm';
import { StyledTypography } from '../StyledTypography';

type Props = {
  open: boolean;
  onClose: () => void;
  name: string;
};

export const DeleteRoleModal: FC<Props> = (props) => {
  const { name, open, onClose } = props;

  const mutateForm = useForm<IRole>('auth/roles', 'DELETE', name);
  const onDelete = () => {
    mutateForm.mutateAsync({ name } as any, {
      onSuccess: (res: any) => {
        if (res.data.success) {
          toast.success('Role deleted');
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
        Are you sure you want to delete this user role?
        <StyledTypography>{name} </StyledTypography>
      </DialogContent>
      <DialogActions>
        <Button size="large" variant="contained" color="info" onClick={onClose}>
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
