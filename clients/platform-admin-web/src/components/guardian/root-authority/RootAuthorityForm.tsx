import * as React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import {
  Button,
  TextField,
  FormHelperText,
  Box,
  DialogContent,
  DialogActions,
  Card,
  Grid,
  Typography,
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import type { IRootAuthority } from '@tymlez/platform-api-interfaces';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { PermissionButton } from '@tymlez/frontend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { useForm } from '../../../api/usePostForm';
import { fetchRootAuthorityData } from '../../../api/useFetchRootAuthorityData';
import { ContactForm } from '../ContactForm';
import { AddressForm } from '../AddressForm';
import { ContactFormBusinessLead } from '../ContactFormBusinessLead';
import RootPublishButton from './RootPublishButton';
import { Loading } from '../../Loading';
import CountrySelect from '../../CountrySelect';

export function RootAuthorityForm() {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isErrorBusinessLead, setIsErrorBusinessLead] =
    useState<boolean>(false);
  const [isErrorAddress, setIsErrorAddress] = useState<boolean>(false);
  const [isErrorContact, setIsErrorContact] = useState<boolean>(false);
  const [isReset, setIsReset] = useState<boolean>(false);
  const [isPublished, setIsPublished] = useState<boolean>(false);

  const mutateForm = useForm<IRootAuthority>(
    'root-authority',
    isUpdating ? 'PUT' : 'POST',
  );

  const formik = useFormik({
    initialValues: {
      rootAuthorityName: '',
      registrationCountry: '',
      businessRegistrationNumber: '',
      businessRegistrationNumberType: '',
      businessRegistrationDate: new Date(),
      registeredOfficeAddress: undefined,
      businessType: '',
      primaryBusinessFunction: '',
      businessLead: undefined,
      websiteLink: '',
      numberOfEmployees: 0,
      otherCountriesOfOperation: '',
      otherRelatedEntities: '',
      shareholders: '',
      balanceSheetTotal: '',
      operationalContact: undefined,
      leadUserContact: undefined,
      financePersonContact: undefined,
      submit: null,
    },
    validationSchema: Yup.object({
      rootAuthorityName: Yup.string().required('Business Name is required'),
      registrationCountry: Yup.string().required(
        'Registration Country is required',
      ),
      businessRegistrationNumber: Yup.string().required(
        'Business Registration Number is required',
      ),
      businessRegistrationNumberType: Yup.string().required(
        'Business Registration Number Type is required',
      ),

      businessType: Yup.string().required('Business Type is required'),
      primaryBusinessFunction: Yup.string().required(
        'Primary Business Function is required',
      ),
    }),

    onSubmit: async (_, helpers): Promise<void> => {
      if (isErrorAddress) {
        helpers.setStatus({ success: false });
        helpers.setErrors({
          submit:
            'Registered Office Address requires all required fields not to be empty. Please check! ',
        });
        helpers.setSubmitting(false);
        return;
      }

      if (isErrorBusinessLead) {
        helpers.setStatus({ success: false });
        helpers.setErrors({
          submit:
            'Business Lead Details requires all required fields not to be empty. Please check! ',
        });
        helpers.setSubmitting(false);
        return;
      }

      if (isErrorContact) {
        helpers.setStatus({ success: false });
        helpers.setErrors({
          submit:
            'There is at least one required field to be empty. Please check! ',
        });
        helpers.setSubmitting(false);
        return;
      }

      setIsReset(false);
      mutateForm.mutate(
        { ...(formik.values as any) },
        {
          onSuccess: (res: any) => {
            if (res.data.success) {
              helpers.setStatus({ success: true });

              if (isUpdating) {
                toast.success('Root Authority updated');
              } else {
                toast.success('Root Authority added');
                setIsUpdating(true);
              }
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

  const { refetch, isLoading } = useQuery(
    ['root-authority'],
    async () => {
      const data = await fetchRootAuthorityData();
      if (data) {
        formik.resetForm({ values: data as any });
        setIsPublished(data.isPublished);
        if (!data.isPublished) {
          setIsUpdating(true);
        }
      } else {
        formik.resetForm();
      }
      setIsErrorBusinessLead(false);
      setIsErrorAddress(false);
      setIsErrorContact(false);
      return data;
    },
    { refetchOnWindowFocus: false },
  );

  const onCancel = () => {
    refetch();
    setIsReset(true);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <RootPublishButton
        isPublished={isPublished}
        onPublishedSuccess={setIsPublished}
      />

      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={{ p: 0 }}>
          <Card sx={{ marginTop: 3, p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', marginTop: 2 }}>
                  <Typography>Business Name</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <TextField
                  disabled={isPublished}
                  fullWidth
                  id="txtName"
                  name="rootAuthorityName"
                  placeholder="Enter business name"
                  margin="normal"
                  autoFocus
                  value={formik.values.rootAuthorityName}
                  onChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.rootAuthorityName &&
                      formik.errors.rootAuthorityName,
                  )}
                  helperText={
                    formik.touched.rootAuthorityName &&
                    formik.errors.rootAuthorityName
                  }
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', marginTop: 1 }}>
                  <Typography>Registration Country</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <CountrySelect
                  name="registrationCountry"
                  value={formik.values.registrationCountry}
                  setFieldValue={formik.setFieldValue}
                  disabled={isPublished}
                  title="Registration Country"
                  display="name"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', marginTop: 2 }}>
                  <Typography>Business Registration Number</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <TextField
                  placeholder="Enter Business Registration Number"
                  disabled={isPublished}
                  fullWidth
                  id="txtRegistrationNumber"
                  name="businessRegistrationNumber"
                  margin="normal"
                  value={formik.values.businessRegistrationNumber}
                  onChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.businessRegistrationNumber &&
                      formik.errors.businessRegistrationNumber,
                  )}
                  helperText={
                    formik.touched.businessRegistrationNumber &&
                    formik.errors.businessRegistrationNumber
                  }
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', marginTop: 2 }}>
                  <Typography>Business Registration Number Type</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <TextField
                  disabled={isPublished}
                  fullWidth
                  id="txtRegistrationType"
                  name="businessRegistrationNumberType"
                  margin="normal"
                  value={formik.values.businessRegistrationNumberType}
                  onChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.businessRegistrationNumberType &&
                      formik.errors.businessRegistrationNumberType,
                  )}
                  helperText={
                    formik.touched.businessRegistrationNumberType &&
                    formik.errors.businessRegistrationNumberType
                  }
                  onBlur={formik.handleBlur}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Registration Date</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <Box sx={{ marginTop: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  disabled={isPublished}
                  inputFormat="dd-MM-yyyy"
                  disableMaskedInput
                  label="Registration Date *"
                  value={formik.values.businessRegistrationDate}
                  onChange={(newValue) => {
                    formik.setFieldValue('businessRegistrationDate', newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </Card>
          <AddressForm
            name="registeredOfficeAddress"
            value={formik.values.registeredOfficeAddress}
            setFieldValue={formik.setFieldValue}
            isReset={isReset}
            onError={setIsErrorAddress}
            disabled={isPublished}
            addMoreComponents={
              <>
                <Box sx={{ display: 'flex', marginTop: 2 }}>
                  <Typography>Business Type</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <TextField
                  required
                  disabled={isPublished}
                  fullWidth
                  id="txtType"
                  name="businessType"
                  margin="normal"
                  value={formik.values.businessType}
                  onChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.businessType && formik.errors.businessType,
                  )}
                  helperText={
                    formik.touched.businessType && formik.errors.businessType
                  }
                />
                <Box sx={{ display: 'flex', marginTop: 2 }}>
                  <Typography>Primary Business Function</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <TextField
                  placeholder="Enter primary business function"
                  required
                  disabled={isPublished}
                  fullWidth
                  id="txtFunction"
                  name="primaryBusinessFunction"
                  margin="normal"
                  value={formik.values.primaryBusinessFunction}
                  onChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.primaryBusinessFunction &&
                      formik.errors.primaryBusinessFunction,
                  )}
                  helperText={
                    formik.touched.primaryBusinessFunction &&
                    formik.errors.primaryBusinessFunction
                  }
                />
              </>
            }
          />

          <ContactFormBusinessLead
            title="Business Lead Details *"
            name="businessLead"
            value={formik.values.businessLead}
            setFieldValue={formik.setFieldValue}
            isReset={isReset}
            onError={setIsErrorBusinessLead}
            disabled={isPublished}
            addMoreComponents={
              <>
                <Box sx={{ display: 'flex', marginTop: 2 }}>
                  <Typography>Website Link</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <TextField
                  placeholder="Enter website link"
                  fullWidth
                  disabled={isPublished}
                  id="txtWebsite"
                  name="websiteLink"
                  margin="normal"
                  value={formik.values.websiteLink}
                  onChange={formik.handleChange}
                />
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Box sx={{ display: 'flex', marginTop: 2 }}>
                      <Typography>Number of Employees</Typography>
                    </Box>
                    <TextField
                      fullWidth
                      disabled={isPublished}
                      type="number"
                      id="txtEmployeeNumber"
                      name="numberOfEmployees"
                      margin="normal"
                      value={formik.values.numberOfEmployees}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ display: 'flex', marginTop: 2 }}>
                      <Typography>Other countries of Operation</Typography>
                    </Box>
                    <TextField
                      placeholder="Enter other countries of operation"
                      fullWidth
                      disabled={isPublished}
                      id="txtOperationCountry"
                      name="otherCountriesOfOperation"
                      margin="normal"
                      value={formik.values.otherCountriesOfOperation}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ display: 'flex', marginTop: 2 }}>
                      <Typography>Other Related Businesses</Typography>
                    </Box>
                    <TextField
                      placeholder="Enter other related businesses"
                      fullWidth
                      disabled={isPublished}
                      id="txtRelatedBusiness"
                      name="otherRelatedEntities"
                      margin="normal"
                      value={formik.values.otherRelatedEntities}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ display: 'flex', marginTop: 2 }}>
                      <Typography>Significant Shareholders</Typography>
                    </Box>
                    <TextField
                      placeholder="Enter significant shareholders"
                      fullWidth
                      disabled={isPublished}
                      id="txtShareHolder"
                      name="shareholders"
                      margin="normal"
                      value={formik.values.shareholders}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', marginTop: 2 }}>
                  <Typography>
                    Balance sheet total for the last financial year
                  </Typography>
                </Box>
                <TextField
                  placeholder="Enter balance sheet total for the last financial year"
                  fullWidth
                  disabled={isPublished}
                  id="txtBalance"
                  name="balanceSheetTotal"
                  margin="normal"
                  value={formik.values.balanceSheetTotal}
                  onChange={formik.handleChange}
                />
              </>
            }
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ContactForm
                title="Operational Contact"
                name="operationalContact"
                value={formik.values.operationalContact}
                setFieldValue={formik.setFieldValue}
                isReset={isReset}
                disabled={isPublished}
                onError={setIsErrorContact}
              />
            </Grid>
            <Grid item xs={6}>
              <ContactForm
                title="Lead User Contact"
                name="leadUserContact"
                value={formik.values.leadUserContact}
                setFieldValue={formik.setFieldValue}
                isReset={isReset}
                disabled={isPublished}
                onError={setIsErrorContact}
              />
            </Grid>
          </Grid>

          <ContactForm
            title="Finance Person Contact"
            name="financePersonContact"
            value={formik.values.financePersonContact}
            setFieldValue={formik.setFieldValue}
            isReset={isReset}
            disabled={isPublished}
            onError={setIsErrorContact}
          />
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
              onClick={() => onCancel()}
              fullWidth
              disabled={isPublished}
            >
              Cancel
            </Button>
            <PermissionButton
              allowPermissions={PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT}
              isLoadingButton
              sx={{
                color: '#3A5320',
                borderRadius: 0,
              }}
              loading={mutateForm.isLoading}
              size="large"
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={isPublished}
            >
              {isUpdating ? 'Update' : 'Save'}
            </PermissionButton>
          </DialogActions>
        </Box>
      </form>
    </>
  );
}
