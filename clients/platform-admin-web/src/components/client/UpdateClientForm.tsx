import * as React from 'react';
import { useState, useMemo } from 'react';
import {
  Button,
  TextField,
  FormHelperText,
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  Typography,
} from '@mui/material';
import toast from 'react-hot-toast';
import type { IClient } from '@tymlez/platform-api-interfaces';
import { PermissionButton } from '@tymlez/frontend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { fetchClientData } from '../../api/useFetchClientData';
import { useForm } from '../../api/usePostForm';
import { commonStyle } from '../../styles/CommonStyle';

export function UpdateClientForm() {
  const classes = commonStyle();
  const initialValue: IClient = {
    name: '',
    label: '',
  };
  const [client, setClient] = useState<IClient>(initialValue);
  const [initialClient, setInitialClient] = useState<IClient>(initialValue);
  const [errorMessage, setErrorMessage] = useState('');

  useMemo(async () => {
    const currentClient = await fetchClientData();
    setInitialClient(currentClient);
    setClient(currentClient);
  }, []);

  const handleChange = (e: any) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  const form = useForm<IClient>('auth', 'PUT', client.name);

  const useUpdate = async () => {
    form.mutate({ ...client } as any, {
      onSuccess: (res: any) => {
        if (res.data.success) {
          toast.success('Update successful!');
          setInitialClient(client);
        } else {
          setErrorMessage(res.data.message);
        }
      },
      onError: (err: any) => {
        setErrorMessage(err.message);
      },
    });
  };
  const onCancel = () => {
    setClient(initialClient);
    form.reset();
    setErrorMessage('');
  };

  return (
    <form>
      <Card sx={{ padding: '48px 96px 48px 96px' }}>
        <DialogTitle
          style={{ textAlign: 'center', fontWeight: 700, fontSize: '20px' }}
        >
          Client Detail
        </DialogTitle>
        <DialogContent>
          {client && (
            <>
              <Box sx={{ display: 'flex' }}>
                <Typography>Name</Typography>
                <Typography sx={{ color: '#CF372C' }}>*</Typography>
              </Box>
              <TextField
                disabled
                fullWidth
                id="txtName"
                name="name"
                margin="normal"
                autoFocus
                value={client.name}
              />
              <Box sx={{ display: 'flex', marginTop: 3 }}>
                <Typography>Label</Typography>
                <Typography sx={{ color: '#CF372C' }}>*</Typography>
              </Box>
              <TextField
                required
                fullWidth
                id="txtLabel"
                name="label"
                margin="normal"
                value={client.label}
                onChange={handleChange}
              />
            </>
          )}
        </DialogContent>
        <Box
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'row',
            p: 3,
          }}
        >
          <Box sx={{ mt: 3 }}>
            {errorMessage !== '' && (
              <FormHelperText error>{errorMessage}</FormHelperText>
            )}
          </Box>
          <DialogActions>
            <Button
              sx={{ mr: 3, color: '#5C6A82' }}
              color="inherit"
              size="large"
              onClick={onCancel}
            >
              Cancel
            </Button>

            <PermissionButton
              className={classes.actionBtn}
              size="large"
              variant="contained"
              color="primary"
              onClick={useUpdate}
              allowPermissions={PERMISSION_SET.CONFIG_WRITE_MANAGEMENT}
            >
              Update
            </PermissionButton>
          </DialogActions>
        </Box>
      </Card>
    </form>
  );
}
