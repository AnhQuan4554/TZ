import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  FormHelperText,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardMedia,
  Card,
  Typography,
  FormLabel,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Drawer,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useQuery } from 'react-query';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import type { IDevice } from '@tymlez/platform-api-interfaces';
import { formatDateAu } from '@tymlez/common-libs';
import toast from 'react-hot-toast';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LoadingButton } from '@mui/lab';
import { dataFiletoURL, useForm } from '../../../api/usePostForm';
import { fetchDeviceDetail } from '../../../api/useFetchDeviceData';
import { useFetchGuardianSiteData } from '../../../api/useFetchGuardianSiteData';
import { useFetchInstallerData } from '../../../api/useFetchInstallerData';
import { commonStyle } from '../../../styles/CommonStyle';

const Input = styled('input')({
  display: 'none',
});

interface AddDeviceProps {
  open: boolean;
  onClose: () => void;
  id?: string;
  deviceId?: string;
}

export function AddDeviceModal({
  open,
  onClose,
  id,
  deviceId,
}: AddDeviceProps) {
  const classes = commonStyle();
  const siteData = useFetchGuardianSiteData();
  if (open && siteData?.count === 0) {
    toast.error('No site. Please add a site first');
  }
  const installerData = useFetchInstallerData();
  if (open && installerData?.count === 0) {
    toast.error('No installer. Please add an installer first');
  }

  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [isCalled, setIsCalled] = useState<boolean>(false);
  const [device, setDevice] = useState<IDevice>();
  const [pdfFile, setPdfFile] = useState<string>('');

  const mutateForm = useForm<IDevice>('device', id ? 'PUT' : 'POST', id);

  const formik = useFormik({
    initialValues: {
      siteId: '',
      installerId: '',
      deviceId: '',
      deviceType: '',
      deviceName: '',
      deviceDescription: '',
      make: '',
      model: '',
      serialNumber: '',
      certification: undefined,
      certificationExpiryDate: new Date(),
      otherDeviceData: undefined,
      submit: null,
    },
    validationSchema: Yup.object({
      siteId: Yup.string().required('Site should be selected'),
      installerId: Yup.string().required('Installer should be selected'),
      deviceId: Yup.string().required('Device Id is required'),
      deviceType: Yup.string().required('Device type should be selected'),
      deviceName: Yup.string().required('Device name is required'),
    }),

    onSubmit: async (values, helpers): Promise<void> => {
      mutateForm.mutate(
        { ...(values as any) },
        {
          onSuccess: (res: any) => {
            if (res.data.success) {
              helpers.setStatus({ success: true });
              if (id) {
                toast.success('Device updated');
              } else {
                toast.success('Device added');
              }
              closeForm();
            } else {
              helpers.setStatus({ success: false });
              helpers.setErrors({ submit: res.data.message });
              helpers.setSubmitting(false);
            }
          },
          onError: (err: any) => {
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: err.response?.data.message });
          },
        },
      );
    },
  });

  const onFileSelectedHandle = async (event: any) => {
    formik.setErrors({ submit: '' });

    const files = [...event.target.files];
    if (files.length === 0) {
      formik.setErrors({ submit: 'Please select a certification file' });
    } else {
      if (files[0].name.match(/\.pdf/gi)) {
        setPdfFile(URL.createObjectURL(files[0]));

        URL.revokeObjectURL(selectedFile); //free memory
        setSelectedFile('');
      } else {
        setSelectedFile(URL.createObjectURL(files[0]));

        URL.revokeObjectURL(pdfFile); //free memory
        setPdfFile('');
      }
      formik.setFieldValue('certification', await dataFiletoURL(files[0]));
    }
  };

  useQuery(
    ['device/id', id],
    async () => {
      if (!isCalled && id) {
        const data = await fetchDeviceDetail(id);
        formik.resetForm({ values: data as any });
        formik.setFieldValue('siteId', data.site.id);
        formik.setFieldValue('installerId', data.installer.id);

        setDevice(data);

        if (data.certification.url.includes('.pdf')) {
          setPdfFile(
            `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/file/pdf?url=${data.certification.url}`,
          );
        } else {
          setSelectedFile(
            `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/file?url=${data.certification.url}`,
          );
        }
        setIsPublished(data.isPublished);
        setIsCalled(true);
      }
    },
    { refetchOnWindowFocus: false },
  );

  const closeForm = () => {
    mutateForm.reset();
    formik.resetForm();

    URL.revokeObjectURL(selectedFile); //free memory
    setSelectedFile('');
    URL.revokeObjectURL(pdfFile); //free memory
    setPdfFile('');
    setIsCalled(false);
    onClose();
  };

  return (
    <Drawer
      open={open}
      onClose={closeForm}
      anchor="right"
      PaperProps={{
        sx: {
          width: '50%',
          marginTop: '92px',
          height: '-webkit-fill-available',
        },
      }}
    >
      {id ? (
        <DialogTitle>Device {deviceId}</DialogTitle>
      ) : (
        <Typography className={classes.dialogButton}>Add a Device</Typography>
      )}

      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Typography>Device Id</Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <TextField
            placeholder="Enter Device Id"
            autoFocus
            required
            disabled={isPublished}
            fullWidth
            id="txtId"
            // variant="filled"
            // sx={{ marginTop: 3 }}
            name="deviceId"
            // label="Device Id"
            margin="normal"
            error={Boolean(formik.touched.deviceId && formik.errors.deviceId)}
            helperText={formik.touched.deviceId && formik.errors.deviceId}
            value={formik.values.deviceId}
            onChange={formik.handleChange}
          />
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Typography>Device Name</Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <TextField
            required
            placeholder="Enter Device Name"
            disabled={isPublished}
            fullWidth
            id="txtName"
            // variant="filled"
            // sx={{ marginTop: 3 }}
            name="deviceName"
            // label="Device Name"
            margin="normal"
            error={Boolean(
              formik.touched.deviceName && formik.errors.deviceName,
            )}
            helperText={formik.touched.deviceName && formik.errors.deviceName}
            value={formik.values.deviceName}
            onChange={formik.handleChange}
          />
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Typography>Device Type</Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <TextField
            placeholder="Enter Device Type"
            required
            disabled={isPublished}
            fullWidth
            id="txtDeviceType"
            // variant="filled"
            // sx={{ marginTop: 3 }}
            name="deviceType"
            // label="Device Type"
            margin="normal"
            error={Boolean(
              formik.touched.deviceType && formik.errors.deviceType,
            )}
            helperText={formik.touched.deviceType && formik.errors.deviceType}
            value={formik.values.deviceType}
            onChange={formik.handleChange}
          />
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Typography>Device Description</Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <TextField
            placeholder="Enter Device Description"
            disabled={isPublished}
            fullWidth
            id="txtDeviceDescription"
            // variant="filled"
            name="deviceDescription"
            // label="Device Description"
            margin="normal"
            // sx={{ marginTop: 3 }}
            value={formik.values.deviceDescription}
            onChange={formik.handleChange}
          />
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Typography>Site</Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <FormControl
            required
            disabled={isPublished}
            fullWidth
            sx={{ marginTop: 3 }}
          >
            <Select
              displayEmpty
              // variant="filled"
              labelId="type-simple-select-required-label"
              id="selectSite"
              // label="Site Id"
              name="siteId"
              error={Boolean(formik.touched.siteId && formik.errors.siteId)}
              value={formik.values.siteId}
              onChange={formik.handleChange}
            >
              <MenuItem value="" disabled>
                Choose Site
              </MenuItem>
              {siteData?.data?.map((site) => (
                <MenuItem key={site.id} value={site.id}>
                  {site.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Typography>Installer</Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <FormControl
            required
            disabled={isPublished}
            fullWidth
            sx={{ marginTop: 3 }}
          >
            <Select
              // variant="filled"
              labelId="type-simple-select-required-label"
              id="selectInstaller"
              // label="Installer Id"
              displayEmpty
              name="installerId"
              error={Boolean(
                formik.touched.installerId && formik.errors.installerId,
              )}
              value={formik.values.installerId}
              onChange={formik.handleChange}
            >
              <MenuItem value="" disabled>
                Choose Installer
              </MenuItem>
              {installerData?.data.map((installer) => (
                <MenuItem key={installer.id} value={installer.id}>
                  {installer.installerId}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Typography>Make</Typography>
          </Box>
          <TextField
            placeholder="Enter Make"
            disabled={isPublished}
            fullWidth
            id="txtMake"
            // variant="filled"
            name="make"
            // label="Make"
            margin="normal"
            // sx={{ marginTop: 3 }}
            value={formik.values.make}
            onChange={formik.handleChange}
          />
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Typography>Model</Typography>
          </Box>
          <TextField
            placeholder="Enter Model"
            disabled={isPublished}
            fullWidth
            id="txtModel"
            // variant="filled"
            name="model"
            // label="Model"
            margin="normal"
            // sx={{ marginTop: 3 }}
            value={formik.values.model}
            onChange={formik.handleChange}
          />
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Typography>Serial Number</Typography>
          </Box>
          <TextField
            placeholder="Enter Serial Number"
            disabled={isPublished}
            fullWidth
            id="txtSerialNumber"
            // variant="filled"
            name="serialNumber"
            // label="Serial Number"
            margin="normal"
            // sx={{ marginTop: 3 }}
            value={formik.values.serialNumber}
            onChange={formik.handleChange}
          />
          <Card variant="outlined" sx={{ marginTop: 3, p: 3 }}>
            <Grid container xs={12}>
              <Grid item xs={6}>
                <Typography>Certification</Typography>
                <div>
                  {pdfFile && <embed src={pdfFile} width="840" height="480" />}
                  {selectedFile && (
                    <CardMedia
                      component="img"
                      height="480"
                      image={selectedFile}
                      //  alt="certification"
                    />
                  )}
                </div>
                <FormLabel htmlFor="contained-button-file">
                  <Input
                    accept="application/pdf,image/*"
                    id="contained-button-file"
                    // multiple
                    type="file"
                    onChange={onFileSelectedHandle}
                  />
                  <Button
                    disabled={isPublished}
                    size="medium"
                    variant="contained"
                    component="span"
                    sx={{ marginTop: 1 }}
                  >
                    Upload certification
                  </Button>
                </FormLabel>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ marginTop: 3 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      disabled={isPublished}
                      inputFormat="dd-MM-yyyy"
                      disableMaskedInput
                      label="Certification Expiry Date *"
                      value={formik.values.certificationExpiryDate}
                      onChange={(newValue) => {
                        formik.setFieldValue(
                          'certificationExpiryDate',
                          newValue,
                        );
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>
            </Grid>
          </Card>
          <Box sx={{ display: 'flex', marginTop: 3 }}>
            <Typography>Other Device Data</Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <TextField
            fullWidth
            multiline
            disabled={isPublished}
            id="txtOtherDeviceData"
            // variant="filled"
            name="otherDeviceData"
            // label="Other Device Data"
            margin="normal"
            rows={4}
            // sx={{ marginTop: 3 }}
            value={formik.values.otherDeviceData}
            onChange={formik.handleChange}
          />
          {device && (
            <Box>
              <TextField
                fullWidth
                id="txtCreatedBy"
                disabled
                variant="filled"
                sx={{ marginTop: 3 }}
                value={device.createdBy.email}
                label="Created By"
                name="createdBy"
              />

              <TextField
                fullWidth
                id="txtCreatedOn"
                disabled
                variant="filled"
                sx={{ marginTop: 3 }}
                value={formatDateAu(new Date(device.createdAt))}
                label="Created On"
                name="createdAt"
              />
              <TextField
                fullWidth
                id="txtUpdatedOn"
                disabled
                variant="filled"
                sx={{ marginTop: 3 }}
                value={
                  device.updatedAt
                    ? formatDateAu(new Date(device.updatedAt))
                    : ''
                }
                label="Updated On"
                name="updatedAt"
              />
            </Box>
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
          <Box>
            {formik.errors.submit && (
              <FormHelperText error>{formik.errors.submit}</FormHelperText>
            )}
          </Box>

          <DialogActions>
            <Button
              sx={{ mr: 3, color: '#5C6A82' }}
              size="large"
              color="inherit"
              onClick={closeForm}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={mutateForm.isLoading}
              className={classes.actionBtn}
              disabled={isPublished}
              size="large"
              variant="contained"
              color="primary"
              type="submit"
            >
              {id ? 'Update' : 'Save'}
            </LoadingButton>
          </DialogActions>
        </Box>
      </form>
    </Drawer>
  );
}
