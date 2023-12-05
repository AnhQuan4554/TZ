import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React, { FC } from 'react';
import toast from 'react-hot-toast';
import type { ISite } from '@tymlez/platform-api-interfaces';
import { useForm } from '../../api/usePostForm';
import { useFetchMetersBySite } from '../../api/useFetchMeterData';
import { StyledTypography } from '../StyledTypography';
import { StyledMenuList } from '../StyledMenuList';

type Props = {
  open: boolean;
  onClose: () => void;
  siteName: string;
  id: string;
};

export const DeleteSiteModal: FC<Props> = (props) => {
  const { id, siteName, open, onClose } = props;
  const mutateForm = useForm<ISite>('sites', 'DELETE', id);
  const { data: meters } = useFetchMetersBySite(id);

  const onDelete = () => {
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
        {meters && meters.length > 0 && (
          <StyledMenuList
            title={`This will also delete ${meters.length} meters:`}
            data={meters}
          />
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
