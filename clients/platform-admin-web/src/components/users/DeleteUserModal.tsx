import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import type { IUser } from '@tymlez/platform-api-interfaces';
import React, { FC } from 'react';
import toast from 'react-hot-toast';
import { useForm } from '../../api/usePostForm';
import { StyledTypography } from '../StyledTypography';

type Props = {
  open: boolean;
  onClose: () => void;
  userId: string;
  email: string;
};

export const DeleteUserModal: FC<Props> = (props) => {
  const { userId, email, open, onClose } = props;

  const mutateForm = useForm<IUser>('user', 'DELETE', userId);
  const onDelete = () => {
    mutateForm.mutateAsync({ id: userId } as any, {
      onSuccess: (res: any) => {
        if (res.data.success) {
          toast.success('User deleted');
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
        Are you sure you want to delete this user?
        <StyledTypography>{email} </StyledTypography>
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
