import * as React from 'react';
import {
  Button,
  TextField,
  FormHelperText,
  Box,
  Select,
  MenuItem,
  FormControl,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Drawer,
} from '@mui/material';
import { useQuery } from 'react-query';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import type { IMeter, IMeterType } from '@tymlez/platform-api-interfaces';
import { LoadingButton } from '@mui/lab';
import toast from 'react-hot-toast';
import { useForm } from '../../api/usePostForm';
import { fetchMeterDetail } from '../../api/useFetchMeterData';
import { useFetchSiteData } from '../../api/useFetchSiteData';
import { useFetchDeviceData } from '../../api/useFetchDeviceData';
import { commonStyle } from '../../styles/CommonStyle';

interface AddMeterProps {
  open: boolean;
  onClose: () => void;
  meterId?: string;
  meterName?: string;
}

const meterTypes: IMeterType[] = [
  'wattwatchers',
  'solcast',
  'magnum',
  'uon',
  'client-specific',
];
const dataSourceTypes = ['API', 'S3', 'MOCK'];

export function AddMeterModal({
  open,
  onClose,
  meterId,
  meterName,
}: AddMeterProps) {
  const classes = commonStyle();
  const siteData = useFetchSiteData();
  if (open && siteData?.count === 0) {
    toast.error('No site. Please add a site first');
  }

  const devices = useFetchDeviceData();

  const mutateForm = useForm<IMeter>(
    'meters',
    meterId ? 'PUT' : 'POST',
    meterId,
  );

  const formik = useFormik({
    initialValues: {
      key: '',
      name: '',
      device: '',
      lat: null,
      lng: null,
      meterType: meterTypes[0],
      interval: 1,
      site: '',
      officialCarbonFactor: 0,
      customCarbonFactor: 0,
      dataSource: null,
      dataDelaySec: 0,
      dataSourceType: dataSourceTypes[0],
      dataCredentials: null,
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      key: Yup.string().required('Key is required'),
      meterType: Yup.string().required('Meter Type is required'),
      site: Yup.string().required('Site is required'),
      device: Yup.string().required('Device Id is required'),
      dataSourceType: Yup.string().required('Data Source Type is required'),
      dataDelaySec: Yup.number().moreThan(
        -1,
        'Data delay should be equal to or greater than zero',
      ),
      interval: Yup.number().moreThan(
        0,
        'Interval should be greater than zero',
      ),
    }),

    onSubmit: async (values, helpers): Promise<void> => {
      mutateForm.mutate(
        { ...(values as any) },
        {
          onSuccess: (res: any) => {
            if (res.data.success) {
              helpers.setStatus({ success: true });
              if (meterId) {
                toast.success('Meter updated');
              } else {
                toast.success('Meter added');
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
            helpers.setErrors({ submit: err.message });
          },
        },
      );
    },
  });
  const closeForm = () => {
    mutateForm.reset();
    formik.resetForm();
    onClose();
  };

  useQuery(
    ['meters/meterId', meterId],
    async () => {
      if (meterId) {
        const data = await fetchMeterDetail(meterId);
        formik.resetForm({ values: data as any });
        formik.setFieldValue('site', data.site.id);
        formik.setFieldValue('device', data.device ? data.device?.id : '-');
      }
    },
    { refetchOnWindowFocus: false },
  );

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
      {meterId ? (
        <DialogTitle className={classes.dialogButton}>
          Meter {meterName} ({meterId})
        </DialogTitle>
      ) : (
        <Typography className={classes.dialogButton}>Add a Meter</Typography>
      )}
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <>
            <Box sx={{ display: 'flex' }}>
              <Typography>Key</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              // required
              fullWidth
              id="txtKey"
              // variant="filled"
              // sx={{ marginTop: 3 }}
              name="key"
              placeholder="Enter Key"
              margin="normal"
              contentEditable={meterId === undefined}
              suppressContentEditableWarning={true}
              autoFocus
              error={Boolean(formik.touched.key && formik.errors.key)}
              helperText={formik.touched.key && formik.errors.key}
              value={formik.values.key}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: true }}
              onBlur={formik.handleBlur}
            />
            <Box sx={{ display: 'flex' }}>
              <Typography>Name</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              // required
              fullWidth
              id="txtName"
              // variant="filled"
              // sx={{ marginTop: 3 }}
              name="name"
              placeholder="Enter Name"
              margin="normal"
              autoFocus
              error={Boolean(formik.touched.name && formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              value={formik.values.name}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: true }}
              onBlur={formik.handleBlur}
            />
            <Box sx={{ display: 'flex' }}>
              <Typography>Lat</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              fullWidth
              type="number"
              id="txtLat"
              // variant="filled"
              // sx={{ marginTop: 3 }}
              name="lat"
              placeholder="Enter Lat"
              margin="normal"
              error={Boolean(formik.touched.lat && formik.errors.lat)}
              helperText={formik.touched.lat && formik.errors.lat}
              value={formik.values.lat}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: true }}
              onBlur={formik.handleBlur}
            />
            <Box sx={{ display: 'flex' }}>
              <Typography>Lng</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              fullWidth
              type="number"
              id="txtLng"
              // variant="filled"
              // sx={{ marginTop: 3 }}
              name="lng"
              placeholder="Enter Lng"
              margin="normal"
              error={Boolean(formik.touched.lng && formik.errors.lng)}
              helperText={formik.touched.lng && formik.errors.lng}
              value={formik.values.lng}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: true }}
              onBlur={formik.handleBlur}
            />
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Type</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <FormControl required fullWidth sx={{ marginTop: 3 }}>
              <Select
                // variant="filled"
                displayEmpty
                labelId="type-simple-select-required-label"
                id="selectType"
                // label="Choose Type"
                name="meterType"
                error={Boolean(
                  formik.touched.meterType && formik.errors.meterType,
                )}
                value={formik.values.meterType}
                onChange={formik.handleChange}
              >
                <MenuItem key="" value="" disabled>
                  Choose type
                </MenuItem>
                {meterTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Interval</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              fullWidth
              type="number"
              id="txtInterval"
              // variant="filled"
              // sx={{ marginTop: 3 }}
              name="interval"
              label="Interval"
              margin="normal"
              error={Boolean(formik.touched.interval && formik.errors.interval)}
              helperText={formik.touched.interval && formik.errors.interval}
              value={formik.values.interval}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: true }}
              onBlur={formik.handleBlur}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', marginTop: 2 }}>
                  <Typography>Site</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <FormControl
                  required
                  fullWidth
                  sx={{ marginTop: 3, marginRight: 1 }}
                >
                  <Select
                    displayEmpty
                    // variant="filled"
                    labelId="client-simple-select-required-label"
                    id="selectSite"
                    // label="Site"
                    name="site"
                    error={Boolean(formik.touched.site && formik.errors.site)}
                    value={formik.values.site}
                    onChange={formik.handleChange}
                  >
                    <MenuItem key="" value="" disabled>
                      Choose Site
                    </MenuItem>

                    {siteData?.data?.map((site) => (
                      <MenuItem key={site.id} value={site.id}>
                        {site.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', marginTop: 2 }}>
                  <Typography>Device Id</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <FormControl required fullWidth sx={{ marginTop: 3 }}>
                  <Select
                    displayEmpty
                    // variant="filled"
                    labelId="client-simple-select-required-label"
                    id="selectDevice"
                    // label="Device"
                    name="device"
                    error={Boolean(
                      formik.touched.device && formik.errors.device,
                    )}
                    value={formik.values.device || ''}
                    onChange={formik.handleChange}
                  >
                    <MenuItem key="" value="" disabled>
                      Choose Device Id
                    </MenuItem>

                    {devices?.data.map((device) => (
                      <MenuItem key={device.id} value={device.id}>
                        {device.deviceId}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Data Source</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              required
              fullWidth
              id="txtDataSource"
              // variant="filled"
              // sx={{ marginTop: 3 }}
              name="dataSource"
              placeholder="Enter Data"
              margin="normal"
              error={Boolean(
                formik.touched.dataSource && formik.errors.dataSource,
              )}
              helperText={formik.touched.dataSource && formik.errors.dataSource}
              value={formik.values.dataSource}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: true }}
              onBlur={formik.handleBlur}
            />
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Data Source Type</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <FormControl required fullWidth sx={{ marginTop: 3 }}>
              <Select
                // variant="filled"
                displayEmpty
                labelId="data-source-type-simple-select-required-label"
                id="selectDataSourceType"
                name="dataSourceType"
                error={Boolean(
                  formik.touched.dataSourceType && formik.errors.dataSourceType,
                )}
                value={formik.values.dataSourceType}
                onChange={formik.handleChange}
              >
                <MenuItem key="" value="" disabled>
                  Choose data source type
                </MenuItem>
                {dataSourceTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', marginTop: 3 }}>
              <Typography>Data Credentials</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              fullWidth
              id="txtDataCredentials"
              // variant="filled"
              // sx={{ marginTop: 3 }}
              name="dataCredentials"
              placeholder="Enter Data Credentials"
              margin="normal"
              error={Boolean(
                formik.touched.dataCredentials && formik.errors.dataCredentials,
              )}
              helperText={
                formik.touched.dataCredentials && formik.errors.dataCredentials
              }
              value={formik.values.dataCredentials}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Official Carbon Factor</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              fullWidth
              type="number"
              id="officialCarbonFactor"
              // variant="filled"
              // sx={{ marginTop: 3 }}
              name="officialCarbonFactor"
              // placeholder="Official Carbon Factor"
              margin="normal"
              error={Boolean(
                formik.touched.officialCarbonFactor &&
                  formik.errors.officialCarbonFactor,
              )}
              helperText={
                formik.touched.officialCarbonFactor &&
                formik.errors.officialCarbonFactor
              }
              value={formik.values.officialCarbonFactor}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', marginTop: 2 }}>
                  <Typography>Custom Carbon Factor</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <TextField
                  fullWidth
                  type="number"
                  id="txtcustomCarbonFactor"
                  // variant="filled"
                  // sx={{ marginTop: 3, marginRight: 1 }}
                  name="customCarbonFactor"
                  // label="Custom Carbon Factor"
                  margin="normal"
                  error={Boolean(
                    formik.touched.customCarbonFactor &&
                      formik.errors.customCarbonFactor,
                  )}
                  helperText={
                    formik.touched.customCarbonFactor &&
                    formik.errors.customCarbonFactor
                  }
                  value={formik.values.customCarbonFactor}
                  onChange={formik.handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', marginTop: 2 }}>
                  <Typography>Data Delay (Seconds)</Typography>
                </Box>
                <TextField
                  fullWidth
                  type="number"
                  id="dataDelaySec"
                  // variant="filled"
                  // sx={{ marginTop: 3 }}
                  name="dataDelaySec"
                  // label="Data Delay (Seconds)"
                  margin="normal"
                  error={Boolean(
                    formik.touched.dataDelaySec && formik.errors.dataDelaySec,
                  )}
                  helperText={
                    formik.touched.dataDelaySec && formik.errors.dataDelaySec
                  }
                  value={formik.values.dataDelaySec}
                  onChange={formik.handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </>
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
              color="inherit"
              size="large"
              onClick={closeForm}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={mutateForm.isLoading}
              className={classes.actionBtn}
              size="large"
              variant="contained"
              color="primary"
              type="submit"
            >
              {meterId ? 'Update' : 'Save'}
            </LoadingButton>
          </DialogActions>
        </Box>
      </form>
    </Drawer>
  );
}
