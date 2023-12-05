/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Card, Grid, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import type { IPerson } from '@tymlez/platform-api-interfaces';

interface Props {
  title: string;
  name: string;
  setFieldValue: any;
  value?: IPerson;
  isReset: boolean;
  onError: (value: boolean) => void;
  disabled: boolean;
  addMoreComponents?: any;
}
export function ContactFormBusinessLead({
  title,
  name,
  setFieldValue,
  value,
  isReset,
  onError,
  disabled,
  addMoreComponents,
}: Props) {
  const formik = useFormik<IPerson>({
    initialValues: {
      personId: '',
      title: '',
      familyName: '',
      givenNames: '',
      identificationNumber: '',
      identificationNumberType: '',
      identificationNumberAuthority: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().max(255).required('Title is required'),
      familyName: Yup.string().max(255).required('Family Name is required'),
      givenNames: Yup.string().max(15).required('Given Names is required'),
    }),
    onSubmit: async (): Promise<void> => {
      console.log();
    },
  });

  const checkError = () => {
    if (
      formik.values.title &&
      formik.values.familyName &&
      formik.values.givenNames
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
      <Typography sx={{ fontWeight: 700, fontSize: 20 }}>{title}</Typography>
      <Box sx={{ display: 'flex', marginTop: 2 }}>
        <Typography>Title</Typography>
        <Typography sx={{ color: '#CF372C' }}>*</Typography>
      </Box>
      <TextField
        placeholder="Enter Title"
        required
        fullWidth
        disabled={disabled}
        id="txtTitle"
        // variant="filled"
        name="title"
        // label="Title"
        margin="normal"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.title)}
        helperText={formik.errors.title}
      />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Typography>Family Name</Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <TextField
            placeholder="Enter Family Name"
            required
            fullWidth
            disabled={disabled}
            id="txtFamilyName"
            // variant="filled"
            name="familyName"
            // label="Family Name"
            margin="normal"
            value={formik.values.familyName}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.familyName)}
            helperText={formik.errors.familyName}
          />
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Typography>Given Name</Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <TextField
            placeholder="Enter Given Name"
            required
            fullWidth
            disabled={disabled}
            id="txtGivenName"
            // variant="filled"
            name="givenNames"
            // label="Given Names"
            margin="normal"
            value={formik.values.givenNames}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.givenNames)}
            helperText={formik.errors.givenNames}
          />
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Typography>Identification Number</Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <TextField
            fullWidth
            placeholder="Enter Identification Number"
            disabled={disabled}
            id="txtIdentificationNumber"
            // variant="filled"
            name="identificationNumber"
            // label="Identification Number"
            margin="normal"
            value={formik.values.identificationNumber}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.identificationNumber)}
            helperText={formik.errors.identificationNumber}
          />
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Typography>Identification Number Type</Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <TextField
            placeholder="Enter Identification Number Type"
            fullWidth
            disabled={disabled}
            id="txtIdentificationNumberType"
            // variant="filled"
            name="identificationNumberType"
            // label="Identification Number Type"
            margin="normal"
            value={formik.values.identificationNumberType}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.identificationNumberType)}
            helperText={formik.errors.identificationNumberType}
          />
        </Grid>
      </Grid>
      {/* <TextField
        fullWidth
        disabled={disabled}
        id="txtIdentificationNumberAuthority"
        variant="filled"
        name="identificationNumberAuthority"
        label="Identification Number Authority"
        margin="normal"
        value={formik.values.identificationNumberAuthority}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.identificationNumberAuthority)}
        helperText={formik.errors.identificationNumberAuthority}
      /> */}
      {addMoreComponents}
    </Card>
  );
}
