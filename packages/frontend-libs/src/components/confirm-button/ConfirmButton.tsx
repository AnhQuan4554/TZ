import * as React from 'react';
import toast from 'react-hot-toast';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export interface ConfirmButtonProps {
  btnTxt?: string;
  questionTxt?: string;
  confirmBtnTxt?: string;
  cancelBtnTxt?: string;
  onConfirmMsg?: string;
  onCancelMsg?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  btnIcon?: React.ReactElement;
  disabled?: boolean;
}

export const ConfirmButton = ({
  btnTxt,
  questionTxt = 'Are you sure?',
  confirmBtnTxt = 'Yes',
  cancelBtnTxt = 'No',
  onConfirm,
  onCancel,
  onConfirmMsg,
  onCancelMsg,
  btnIcon,
  disabled,
}: ConfirmButtonProps) => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const handleConfirm = async () => {
    try {
      setShowModal(false);
      if (onConfirm) {
        await onConfirm();
      }

      if (onConfirmMsg) {
        toast.success(onConfirmMsg);
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  };

  const handleCancel = async () => {
    try {
      setShowModal(false);
      if (onCancel) {
        await onCancel();
      }
      if (onCancelMsg) {
        toast.success(onCancelMsg);
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  };

  return (
    <>
      <Button
        disabled={disabled}
        onClick={() => {
          setShowModal(true);
        }}
        title={btnTxt}
        startIcon={btnIcon}
      >
        {btnTxt}
      </Button>
      <Dialog open={showModal} aria-labelledby="confirm-dialog">
        <DialogTitle id="confirm-dialog">Please confirm</DialogTitle>
        <DialogContent>{questionTxt}</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleConfirm} color="primary">
            {confirmBtnTxt}
          </Button>
          <Button variant="outlined" onClick={handleCancel} color="info">
            {cancelBtnTxt}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
