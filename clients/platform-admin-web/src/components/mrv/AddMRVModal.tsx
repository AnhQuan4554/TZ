import * as React from 'react';
import { useQuery } from 'react-query';
import {
  Button,
  TextField,
  FormHelperText,
  Box,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  Typography,
  Grid,
  Drawer,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import type { IMrv } from '@tymlez/platform-api-interfaces';
import { LoadingButton } from '@mui/lab';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { isIsoDate } from '@tymlez/common-libs';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import { dataFiletoURL, useForm } from '../../api/usePostForm';
import { useFetchDeviceData } from '../../api/useFetchDeviceData';
import { fetchMrvDetail } from '../../api/useFetchMrvData';
import { commonStyle } from '../../styles/CommonStyle';

interface AddMRVProps {
  open: boolean;
  onClose: () => void;
  id?: string;
  handleRefresh: () => void;
}

const Input = styled('input')({
  display: 'none',
});

export function AddMRVModal({ open, onClose, id, handleRefresh }: AddMRVProps) {
  const classes = commonStyle();
  const [selectedFile, setSelectedFile] = React.useState('');
  const [documentProof, setDocumentProof] = React.useState<string>('');
  const mutateForm = useForm<IMrv>('mrv', id ? 'PUT' : 'POST', id);
  const devices = useFetchDeviceData();

  const intervalDurationUOMs = ['ms', 's', 'min'];
  const qualitys = [
    'HIGH - REAL TIME IOT DEVICE READINGS',
    'MEDIUM - MANUALLY ENTERED SENSOR DATA',
    'LOW - ESTIMATED',
  ];
  const valueUOMs = ['kW/h', 'L', 'kwh'];
  const greenhouseGasEmissionsScopes = ['Scope 1', 'Scope 2', 'Scope 3'];
  const greenhouseGasEmissionsSources = [
    'DIRECT - STATIONARY COMBUSTION',
    'DIRECT - MOBILE COMBUSTION',
    'DIRECT - PROCESS EMISSIONS',
    'DIRECT - FUGITIVE EMISSIONS',
    'INDIRECT - PURCHASED ELECTRICITY',
  ];
  const emissionsUOMs = ['t', 'Kg'];

  const formik = useFormik({
    initialValues: {
      readingId: '',
      deviceId: '',
      readingDate: new Date(),
      intervalStartDateTime: new Date().toISOString(),
      intervalEndDateTime: new Date().toISOString(),
      intervalDuration: '',
      intervalDurationUOM: intervalDurationUOMs[0],
      value: '',
      valueUOM: valueUOMs[0],
      quality: qualitys[0],
      otherMRVData: '',
      greenhouseGasEmissionsScope: greenhouseGasEmissionsScopes[0],
      greenhouseGasEmissionsSource: greenhouseGasEmissionsSources[0],
      CO2Emissions: '',
      CH4Emissions: '',
      N2OEmissions: '',
      CO2eqEmissions: '',
      CO2eqEmissionsTYMLEZ: '',
      emissionsUOM: emissionsUOMs[0],
      emissionsFactorsLink: '',
      CO2eqFormula: '',
      CO2eqFormulaLink: '',
      documentProof: {
        name: '',
      },
      submit: null,
    },
    validationSchema: Yup.object({
      readingId: Yup.string().required('readingId is required'),
      deviceId: Yup.string().required('deviceId is required'),
      readingDate: Yup.string().required('readingDate is required'),
      intervalStartDateTime: Yup.string().test(
        'is-iso-date',
        'Start date is not ISO-8601 date',
        (value) => isIsoDate(value || ''),
      ),
      intervalEndDateTime: Yup.string().test(
        'is-iso-date',
        'End date is not ISO-8601 date',
        (value) => isIsoDate(value || ''),
      ),
      intervalDuration: Yup.string().required('intervalDuration is required'),
      intervalDurationUOM: Yup.string().required(
        'intervalDurationUOM is required',
      ),
      value: Yup.string().required('value is required'),
      valueUOM: Yup.string().required('valueUOM is required'),
      quality: Yup.string().required('quality is required'),
      greenhouseGasEmissionsScope: Yup.string().required(
        'greenhouseGasEmissionsScope is required',
      ),
      greenhouseGasEmissionsSource: Yup.string().required(
        'greenhouseGasEmissionsSource is required',
      ),
      CO2Emissions: Yup.string().required('CO2Emissions is required'),
      CO2eqEmissions: Yup.string().required('CO2eqEmissions is required'),
      CO2eqEmissionsTYMLEZ: Yup.string().required(
        'CO2eqEmissionsTYMLEZ is required',
      ),
      emissionsUOM: Yup.string().required('emissionsUOM is required'),
      CO2eqFormula: Yup.string().required('CO2eqFormula is required'),
      documentProof: Yup.object().required('documentProof is required'),
    }),
    onSubmit: async (_, helpers): Promise<void> => {
      mutateForm.mutate(
        {
          ...(formik.values as any),
          intervalDuration: parseFloat(formik.values.intervalDuration),
          value: parseFloat(formik.values.value),
          CO2Emissions: parseFloat(formik.values.CO2Emissions),
          CH4Emissions: parseFloat(formik.values.CH4Emissions),
          N2OEmissions: parseFloat(formik.values.N2OEmissions),
          CO2eqEmissions: parseFloat(formik.values.CO2eqEmissions),
          CO2eqEmissionsTYMLEZ: parseFloat(formik.values.CO2eqEmissionsTYMLEZ),
        },
        {
          onSuccess: (res: any) => {
            if (res.data.success) {
              helpers.setStatus({ success: true });
              if (id) {
                toast.success('MRV updated');
              } else {
                toast.success('MRV added');
              }
              handleRefresh();
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

  const onFileSelectedHandle = async (event: any) => {
    const file: File = event.target.files[0];

    if (file === undefined) {
      return;
    }
    setDocumentProof(URL.createObjectURL(file));
    setSelectedFile(file.name);
    formik.setFieldValue('documentProof', await dataFiletoURL(file));
  };

  const handleDeleteFile = () => {
    setSelectedFile('');
    URL.revokeObjectURL(documentProof);
  };

  useQuery(
    ['mrv/id', id],
    async () => {
      if (id) {
        const data = await fetchMrvDetail(id);
        formik.resetForm({
          values: {
            ...(data as any),
            otherMRVData: data.otherMRVData
              ? JSON.stringify(data.otherMRVData)
              : '',
          },
        });
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
      <Typography
        sx={{
          fontSize: '32px',
          textAlign: 'center',
          fontWeight: 700,
          marginTop: '24px',
        }}
      >
        Upload Carbon Data
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <>
            <Box sx={{ display: 'flex' }}>
              <Typography>Reading ID</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              placeholder="Enter Key"
              // required
              fullWidth
              id="txtReadingId"
              // variant="filled"
              name="readingId"
              margin="normal"
              // sx={{ marginTop: 3 }}
              autoFocus
              error={Boolean(
                formik.touched.readingId && formik.errors.readingId,
              )}
              helperText={formik.touched.readingId && formik.errors.readingId}
              value={formik.values.readingId}
              onChange={formik.handleChange}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', marginTop: 1 }}>
                  <Typography>Device ID</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} />
              <Grid item xs={9}>
                <FormControl required fullWidth>
                  <Select
                    required
                    displayEmpty
                    // variant="filled"
                    labelId="client-simple-select-required-label"
                    id="selectDevice"
                    // label="Device"
                    name="deviceId"
                    error={Boolean(
                      formik.touched.deviceId && formik.errors.deviceId,
                    )}
                    value={formik.values.deviceId}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="" disabled>
                      Choose Site
                    </MenuItem>
                    {devices?.data.map((device) => (
                      <MenuItem key={device.deviceId} value={device.deviceId}>
                        {device.deviceId}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputFormat="yyyy-MM-dd"
                    disableMaskedInput
                    label="Reading Date *"
                    value={formik.values.readingDate}
                    onChange={(newValue) => {
                      formik.setFieldValue(
                        'readingDate',
                        format(newValue as Date, 'YYYY-MM-DD'),
                      );
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Interval Start Date Time</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              // required
              fullWidth
              id="txtIntervalStartDateTime"
              // variant="filled"
              // sx={{ marginTop: 3 }}
              name="intervalStartDateTime"
              // label="Interval Start Date Time"
              margin="normal"
              autoFocus
              error={Boolean(
                formik.touched.intervalStartDateTime &&
                  formik.errors.intervalStartDateTime,
              )}
              helperText={
                formik.touched.intervalStartDateTime &&
                formik.errors.intervalEndDateTime
              }
              value={formik.values.intervalStartDateTime || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Interval End Date Time</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              // required
              fullWidth
              id="txtIntervalEndDateTime"
              // variant="filled"
              name="intervalEndDateTime"
              // label="Interval End Date Time"
              margin="normal"
              sx={{ marginTop: 3 }}
              error={Boolean(
                formik.touched.intervalEndDateTime &&
                  formik.errors.intervalEndDateTime,
              )}
              helperText={
                formik.touched.intervalEndDateTime &&
                formik.errors.intervalEndDateTime
              }
              value={formik.values.intervalEndDateTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Interval Duration</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              // required
              fullWidth
              placeholder="Enter Interval Duration"
              id="intervalDuration"
              type="number"
              // variant="filled"
              name="intervalDuration"
              // label="Interval Duration"
              margin="normal"
              // sx={{ marginTop: 3 }}
              error={Boolean(
                formik.touched.intervalDuration &&
                  formik.errors.intervalDuration,
              )}
              helperText={
                formik.touched.intervalDuration &&
                formik.errors.intervalDuration
              }
              value={formik.values.intervalDuration}
              onChange={formik.handleChange}
            />
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Interval Duration UOM</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>

            <FormControl required fullWidth sx={{ marginTop: 3 }}>
              <Select
                required
                displayEmpty
                // variant="filled"
                labelId="client-simple-select-required-label"
                id="intervalDurationUOM"
                // label="Interval Duration UOM"
                name="intervalDurationUOM"
                error={Boolean(
                  formik.touched.intervalDurationUOM &&
                    formik.errors.intervalDurationUOM,
                )}
                value={formik.values.intervalDurationUOM}
                onChange={formik.handleChange}
              >
                <MenuItem value="" disabled>
                  Choose Type
                </MenuItem>
                {intervalDurationUOMs.map((intervalDurationUOM) => (
                  <MenuItem
                    key={intervalDurationUOM}
                    value={intervalDurationUOM}
                  >
                    {intervalDurationUOM}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', marginTop: 2 }}>
                  <Typography>Value</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <TextField
                  placeholder="Enter Value"
                  // required
                  fullWidth
                  id="value"
                  type="number"
                  // variant="filled"
                  name="value"
                  // label="Value"
                  margin="normal"
                  // sx={{ marginTop: 3 }}
                  error={Boolean(formik.touched.value && formik.errors.value)}
                  helperText={formik.touched.value && formik.errors.value}
                  value={formik.values.value}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', marginTop: 2 }}>
                  <Typography>Value UOM</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <FormControl required fullWidth sx={{ marginTop: 2 }}>
                  <Select
                    displayEmpty
                    required
                    // variant="filled"
                    labelId="client-simple-select-required-label"
                    id="valueUOM"
                    // label="Value UOM"
                    name="valueUOM"
                    error={Boolean(
                      formik.touched.valueUOM && formik.errors.valueUOM,
                    )}
                    value={formik.values.valueUOM}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="" disabled>
                      Choose value UOM
                    </MenuItem>
                    {valueUOMs.map((valueUOM) => (
                      <MenuItem key={valueUOM} value={valueUOM}>
                        {valueUOM}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Quality</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <FormControl required fullWidth sx={{ marginTop: 3 }}>
              <Select
                displayEmpty
                required
                // variant="filled"
                labelId="client-simple-select-required-label"
                id="quality"
                // label="Quality"
                name="quality"
                error={Boolean(formik.touched.quality && formik.errors.quality)}
                value={formik.values.quality}
                onChange={formik.handleChange}
              >
                <MenuItem value="" disabled>
                  Choose Quality
                </MenuItem>
                {qualitys.map((quality) => (
                  <MenuItem key={quality} value={quality}>
                    {quality}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Other MRV Data</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              fullWidth
              placeholder="Enter Other MRV Data"
              // multiline
              id="txtOtherMRVData"
              // variant="filled"
              name="otherMRVData"
              // label="Other MRV Data"
              margin="normal"
              rows={5}
              // sx={{ marginTop: 3 }}
              value={formik.values.otherMRVData}
              onChange={formik.handleChange}
            />
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Greenhouse Gas Emissions Scope</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <FormControl required fullWidth sx={{ marginTop: 3 }}>
              <Select
                displayEmpty
                required
                // variant="filled"
                labelId="client-simple-select-required-label"
                id="greenhouseGasEmissionsScope"
                // label="Greenhouse Gas Emissions Scope"
                name="greenhouseGasEmissionsScope"
                error={Boolean(
                  formik.touched.greenhouseGasEmissionsScope &&
                    formik.errors.greenhouseGasEmissionsScope,
                )}
                value={formik.values.greenhouseGasEmissionsScope}
                onChange={formik.handleChange}
              >
                <MenuItem value="" disabled>
                  Choose Scope
                </MenuItem>
                {greenhouseGasEmissionsScopes.map(
                  (greenhouseGasEmissionsScope) => (
                    <MenuItem
                      key={greenhouseGasEmissionsScope}
                      value={greenhouseGasEmissionsScope}
                    >
                      {greenhouseGasEmissionsScope}
                    </MenuItem>
                  ),
                )}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Greenhouse Gas Emissions Source</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <FormControl required fullWidth sx={{ marginTop: 3 }}>
              <Select
                required
                displayEmpty
                // variant="filled"
                labelId="client-simple-select-required-label"
                id="greenhouseGasEmissionsSource"
                // label="Greenhouse Gas Emissions Source"
                name="greenhouseGasEmissionsSource"
                error={Boolean(
                  formik.touched.greenhouseGasEmissionsSource &&
                    formik.errors.greenhouseGasEmissionsSource,
                )}
                value={formik.values.greenhouseGasEmissionsSource}
                onChange={formik.handleChange}
              >
                <MenuItem value="" disabled>
                  Choose Source
                </MenuItem>
                {greenhouseGasEmissionsSources.map(
                  (greenhouseGasEmissionsSource) => (
                    <MenuItem
                      key={`greenhouse-gas-emissions-source-${greenhouseGasEmissionsSource}`}
                      value={greenhouseGasEmissionsSource}
                    >
                      {greenhouseGasEmissionsSource}
                    </MenuItem>
                  ),
                )}
              </Select>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', marginTop: 2 }}>
                  <Typography>CO2 Emissions</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <TextField
                  placeholder="Enter CO2 emissions"
                  // required
                  fullWidth
                  id="CO2Emissions"
                  type="number"
                  // variant="filled"
                  name="CO2Emissions"
                  // label="CO2Emissions"
                  margin="normal"
                  // sx={{ marginTop: 3 }}
                  error={Boolean(
                    formik.touched.CO2Emissions && formik.errors.CO2Emissions,
                  )}
                  helperText={
                    formik.touched.CO2Emissions && formik.errors.CO2Emissions
                  }
                  value={formik.values.CO2Emissions}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', marginTop: 2 }}>
                  <Typography>CH4 Emissions</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <TextField
                  fullWidth
                  placeholder="Enter CH4 Emissions"
                  id="CH4Emissions"
                  type="number"
                  // variant="filled"
                  name="CH4Emissions"
                  // label="CH4 Emissions"
                  margin="normal"
                  // sx={{ marginTop: 3 }}
                  value={formik.values.CH4Emissions}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', marginTop: 2 }}>
                  <Typography>N2O Emissions</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <TextField
                  placeholder="Enter N2O emissions"
                  fullWidth
                  id="N2OEmissions"
                  type="number"
                  // variant="filled"
                  name="N2OEmissions"
                  // label="N2OEmissions"
                  margin="normal"
                  // sx={{ marginTop: 3 }}
                  value={formik.values.N2OEmissions}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', marginTop: 2 }}>
                  <Typography>CO2eq Emissions</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <TextField
                  // required
                  placeholder="Enter CO2 emissions"
                  fullWidth
                  id="CO2eqEmissions"
                  type="number"
                  // variant="filled"
                  name="CO2eqEmissions"
                  // label="CO2eq Emissions"
                  margin="normal"
                  // sx={{ marginTop: 3 }}
                  error={Boolean(
                    formik.touched.CO2eqEmissions &&
                      formik.errors.CO2eqEmissions,
                  )}
                  helperText={
                    formik.touched.CO2eqEmissions &&
                    formik.errors.CO2eqEmissions
                  }
                  value={formik.values.CO2eqEmissions}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.values.CO2eqEmissions !== null &&
                  parseFloat(formik.values.CO2eqEmissions) < 1 && (
                    <Alert sx={{ marginTop: 3 }} severity="warning">
                      This CO2 Emissions amount is less than 1 tons. it will be
                      combine with other MRV and cause inaccuracy token mint
                      rule 1 ton/token
                    </Alert>
                  )}
              </Grid>
            </Grid>

            {/* <TextField
                required
                fullWidth
                id="CO2eqEmissionsTYMLEZ"
                type="number"
                variant="filled"
                name="CO2eqEmissionsTYMLEZ"
                label="CO2eq Emissions TYMLEZ"
                margin="normal"
                sx={{ marginTop: 3 }}
                error={Boolean(
                  formik.touched.CO2eqEmissionsTYMLEZ &&
                    formik.errors.CO2eqEmissionsTYMLEZ,
                )}
                helperText={
                  formik.touched.CO2eqEmissionsTYMLEZ &&
                  formik.errors.CO2eqEmissionsTYMLEZ
                }
                value={formik.values.CO2eqEmissionsTYMLEZ}
                onChange={formik.handleChange}
              /> */}
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Emissions UOM</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <FormControl required fullWidth sx={{ marginTop: 3 }}>
              <Select
                required
                displayEmpty
                // variant="filled"
                labelId="client-simple-select-required-label"
                id="emissionsUOM"
                // label="Emissions UOM"
                name="emissionsUOM"
                error={Boolean(
                  formik.touched.emissionsUOM && formik.errors.emissionsUOM,
                )}
                value={formik.values.emissionsUOM}
                onChange={formik.handleChange}
              >
                <MenuItem value="" disabled>
                  Choose emissions UOM
                </MenuItem>
                {emissionsUOMs.map((emissionsUOM) => (
                  <MenuItem
                    key={`emissions-UOM-${emissionsUOM}`}
                    value={emissionsUOM}
                  >
                    {emissionsUOM}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Emissions Factors Link</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              fullWidth
              placeholder="Enter link"
              id="emissionsFactorsLink"
              // variant="filled"
              name="emissionsFactorsLink"
              // label="Emissions Factors Link"
              margin="normal"
              // sx={{ marginTop: 3 }}
              value={formik.values.emissionsFactorsLink}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>CO2eq Formula</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              // required
              placeholder="Enter CO2eq formula"
              fullWidth
              id="CO2eqFormula"
              // variant="filled"
              name="CO2eqFormula"
              // label="CO2eq Formula"
              margin="normal"
              // sx={{ marginTop: 3 }}
              error={Boolean(
                formik.touched.CO2eqFormula && formik.errors.CO2eqFormula,
              )}
              helperText={
                formik.touched.CO2eqFormula && formik.errors.CO2eqFormula
              }
              value={formik.values.CO2eqFormula}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>CO2eq Formula Link</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              fullWidth
              id="CO2eqFormulaLink"
              // variant="filled"
              name="CO2eqFormulaLink"
              // label="CO2eq Formula Link"
              margin="normal"
              // sx={{ marginTop: 3 }}
              value={formik.values.CO2eqFormulaLink}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Upload File</Typography>
            </Box>
            <FormLabel
              sx={{ display: 'block', marginBottom: '8px' }}
              htmlFor="file"
            >
              <Input
                id="file"
                name="file"
                // multiple
                type="file"
                onChange={onFileSelectedHandle}
              />
              <Grid
                sx={{
                  marginTop: 2,
                  cursor: 'pointer',
                  textAlign: 'center',
                  padding: 8,
                  backgroundColor: '#EFF4EA',
                  border: '1px dashed #587D30',
                }}
              >
                <Typography sx={{ color: '#587D30' }}>
                  Drag & drop or browse
                </Typography>
              </Grid>
              {/* <Button
                  sx={{ textTransform: 'uppercase' }}
                  size="large"
                  variant="contained"
                  color="primary"
                  component="span"
                >
                  Upload File
                </Button> */}

              {Boolean(
                formik.touched.documentProof && formik.errors.documentProof,
              ) && (
                <Alert sx={{ marginTop: 3 }} severity="error">
                  {formik.touched.documentProof && formik.errors.documentProof}
                </Alert>
              )}
            </FormLabel>

            {selectedFile ||
              (formik.values.documentProof &&
                formik.values.documentProof.name && (
                  <Chip
                    label={selectedFile || formik.values.documentProof.name}
                    variant="outlined"
                    onDelete={handleDeleteFile}
                  />
                ))}
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
              {id ? 'Update' : 'Save'}
            </LoadingButton>
          </DialogActions>
        </Box>
      </form>
    </Drawer>
  );
}
