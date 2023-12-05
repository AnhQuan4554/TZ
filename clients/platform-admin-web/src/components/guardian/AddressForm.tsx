/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Card, Grid, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import type { IAddress } from '@tymlez/platform-api-interfaces';
import CountrySelect from '../CountrySelect';

interface props {
  name: string;
  setFieldValue: any;
  value?: IAddress;
  isReset: boolean;
  onError: (value: boolean) => void;
  disabled: boolean;
  addMoreComponents?: any;
}

export function AddressForm({
  name,
  setFieldValue,
  value,
  isReset,
  onError,
  disabled,
  addMoreComponents,
}: props) {
  const formik = useFormik<IAddress>({
    initialValues: {
      addressId: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      GPSLocation: '',
    },
    validationSchema: Yup.object({
      addressLine1: Yup.string()
        .max(255)
        .required('Address Line 1 is required'),
      city: Yup.string().max(255).required('City is required'),
      country: Yup.string().max(255).required('Country is required'),
    }),

    onSubmit: async (): Promise<void> => {
      console.log();
    },
  });

  const checkError = () => {
    if (
      formik.values.addressLine1 &&
      formik.values.city &&
      formik.values.country
    ) {
      onError(false);
      return;
    }
    onError(true);
  };

  useEffect(() => {
    if (setFieldValue) {
      if (JSON.stringify(value) === JSON.stringify(formik.values)) {
        return;
      }

      if (formik.dirty) {
        setFieldValue(name, formik.values);
      }
      checkError();
    }
  }, [name, setFieldValue, formik.values, formik.setFieldError]);

  useEffect(() => {
    if (value) {
      formik.resetForm({ values: value });
      onError(false);
    }
  }, [value, formik.resetForm]);

  useEffect(() => {
    if (isReset) {
      formik.resetForm();
    }
  }, [isReset, formik.resetForm]);

  return (
    <Card variant="outlined" sx={{ marginTop: 3, p: 3 }}>
      <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
        Business Details
      </Typography>
      <Box sx={{ display: 'flex', marginTop: 2 }}>
        <Typography>Address Line 1</Typography>
        <Typography sx={{ color: '#CF372C' }}>*</Typography>
      </Box>
      <TextField
        required
        fullWidth
        disabled={disabled}
        id="txtAddressLine1"
        // variant="filled"
        name="addressLine1"
        placeholder="Enter address line 1"
        // label="Address Line 1"
        margin="normal"
        value={formik.values.addressLine1}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.addressLine1)}
        helperText={formik.errors.addressLine1}
      />
      <Box sx={{ display: 'flex', marginTop: 2 }}>
        <Typography>Address Line 2</Typography>
      </Box>
      <TextField
        fullWidth
        disabled={disabled}
        id="txtAddressLine2"
        // variant="filled"
        name="addressLine2"
        placeholder="Enter address line 2"
        // label="Address Line 2"
        margin="normal"
        value={formik.values.addressLine2}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.addressLine2)}
        helperText={formik.errors.addressLine2}
      />

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Typography>City</Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <TextField
            required
            fullWidth
            disabled={disabled}
            id="txtCity"
            // variant="filled"
            name="city"
            // label="City"
            placeholder="Enter City"
            margin="normal"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.city)}
            helperText={formik.errors.city}
          />
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Typography>State</Typography>
          </Box>
          <TextField
            placeholder="Enter State"
            fullWidth
            disabled={disabled}
            id="txtState"
            // variant="filled"
            name="state"
            // label="State"
            margin="normal"
            value={formik.values.state}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.state)}
            helperText={formik.errors.state}
          />
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Typography>Postal code</Typography>
          </Box>
          <TextField
            placeholder="Enter Postal Code"
            fullWidth
            disabled={disabled}
            id="txtPostcode"
            // variant="filled"
            name="postalCode"
            // label="Postal Code"
            margin="normal"
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.postalCode)}
            helperText={formik.errors.postalCode}
          />
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', marginTop: 1 }}>
            <Typography>Country</Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <CountrySelect
            name="country"
            value={formik.values.country}
            setFieldValue={formik.setFieldValue}
            disabled={disabled}
            title="Country"
            display="name"
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', marginTop: 2 }}>
        <Typography>GPS Location</Typography>
      </Box>
      <TextField
        fullWidth
        disabled={disabled}
        id="txtGPSLocation"
        // variant="filled"
        name="GPSLocation"
        // label="GPS Location"
        placeholder="Enter GPS Location"
        margin="normal"
        value={formik.values.GPSLocation}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.GPSLocation)}
        helperText={formik.errors.GPSLocation}
      />

      {addMoreComponents}
    </Card>
  );
}
