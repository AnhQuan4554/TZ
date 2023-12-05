import * as React from 'react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { PermissionButton } from '@tymlez/frontend-libs';
import { publish } from '../../../api/usePostForm';
import { BootstrapStatus } from '../BootstrapStatus';

interface props {
  isPublished: boolean;
  onPublishedSuccess(value: boolean): void;
}

const TokenPublishButton = ({ isPublished, onPublishedSuccess }: props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(isPublished);

  const onPublish = async () => {
    setLoading(true);
    try {
      const queryResult = await publish('token-owner/publish');
      if (queryResult.data.success) {
        setLoading(false);
        toast.success('Token published successfully.');
        setIsDisabled(true);
        onPublishedSuccess(true);
      } else if (queryResult.data.data === true) {
        toast.error(`Publishing is running in background.`);
      } else {
        setLoading(false);
        onPublishedSuccess(false);
        toast.error(
          `Failed to publish token owner.  ${queryResult.data.message}`,
        );
      }
    } catch (err: any) {
      setLoading(false);
      onPublishedSuccess(false);
      toast.error(`Failed to publish token owner.  ${err.message}`);
    }
  };

  useEffect(() => {
    setIsDisabled(isPublished);
  }, [isPublished]);

  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
          display: 'grid',
          gridTemplateColumns: 'repeat(6, minmax(200px, 1fr))',
        }}
      >
        <PermissionButton
          allowPermissions={PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT}
          disabled={isDisabled}
          style={{ position: 'relative' }}
          color="primary"
          sx={{ textTransform: 'uppercase' }}
          fullWidth
          size="large"
          variant="contained"
          onClick={() => {
            setShowModal(true);
          }}
          startIcon={<FileUploadIcon />}
        >
          {isDisabled ? 'Published' : 'Publish'}
        </PermissionButton>
      </Box>

      <Dialog open={showModal} aria-labelledby="confirm-dialog">
        <DialogTitle id="confirm-dialog">Please confirm</DialogTitle>
        <DialogContent>
          Are you sure you want to publish token owner data to Guardian ?
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setShowModal(false)}
            color="info"
          >
            No
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setShowModal(false);
              onPublish();
            }}
            color="primary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <BootstrapStatus isOpen={loading} />
    </>
  );
};

export default TokenPublishButton;
