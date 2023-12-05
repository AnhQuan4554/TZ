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
  Grid,
  Drawer,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useQuery } from 'react-query';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import type { IInstaller } from '@tymlez/platform-api-interfaces';
import toast from 'react-hot-toast';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LoadingButton } from '@mui/lab';
import { dataFiletoURL, useForm } from '../../../api/usePostForm';
import { fetchInstallerDetail } from '../../../api/useFetchInstallerData';
import { ContactForm } from '../ContactForm';
import { AddressForm } from '../AddressForm';
import { ContactFormBusinessLead } from '../ContactFormBusinessLead';
import { Loading } from '../../Loading';
import CountrySelect from '../../CountrySelect';
import { commonStyle } from '../../../styles/CommonStyle';

const Input = styled('input')({
  display: 'none',
});

interface AddInstallerProps {
  open: boolean;
  onClose: () => void;
  id?: string;
  installerId?: string;
}

export function AddInstallerModal({
  open,
  onClose,
  id,
  installerId,
}: AddInstallerProps) {
  const classes = commonStyle();
  const [isErrorAddress, setIsErrorAddress] = useState<boolean>(false);
  const [isErrorBusinessLead, setIsErrorBusinessLead] =
    useState<boolean>(false);
  const [isErrorContact, setIsErrorContact] = useState<boolean>(false);
  const [isReset, setIsReset] = useState<boolean>(false);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [isCalled, setIsCalled] = useState<boolean>(false);
  const [pdfFile, setPdfFile] = useState<string>('');

  const mutateForm = useForm<IInstaller>('installer', id ? 'PUT' : 'POST', id);

  const formik = useFormik({
    initialValues: {
      installerId: '',
      installerName: '',
      registrationCountry: '',
      businessRegistrationNumber: '',
      businessRegistrationNumberType: '',
      businessRegistrationDate: new Date(),
      registeredOfficeAddress: undefined,
      businessType: '',
      primaryBusinessFunction: '',
      businessLead: undefined,
      websiteLink: '',
      numberOfEmployees: '0',
      otherCountriesOfOperation: '',
      otherRelatedEntities: '',
      shareholders: '',
      balanceSheetTotal: '',
      operationalContact: undefined,
      leadUserContact: undefined,
      financePersonContact: undefined,
      certification: undefined,
      certificationExpiryDate: new Date(),
      submit: null,
    },
    validationSchema: Yup.object({
      installerId: Yup.string().required('Installer Id is required'),
      installerName: Yup.string().required('Installer Name is required'),
      registrationCountry: Yup.string().required(
        'Registration Country is required',
      ),
      numberOfEmployees: Yup.string().required(
        'Number of Employees is required',
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
              if (id) {
                toast.success('Installer updated');
              } else {
                toast.success('Installer added');
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
    ['installer/id', id],
    async () => {
      if (!isCalled && id) {
        const data = await fetchInstallerDetail(id);
        formik.resetForm({ values: data as any });
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
        setIsErrorAddress(false);
        setIsErrorBusinessLead(false);
        setIsErrorContact(false);
        setIsCalled(true);
      }
    },
    { refetchOnWindowFocus: false },
  );
  const closeForm = () => {
    mutateForm.reset();
    setIsReset(false);
    formik.resetForm();
    URL.revokeObjectURL(selectedFile); //free memory
    setSelectedFile('');
    URL.revokeObjectURL(pdfFile); //free memory
    setPdfFile('');
    setIsErrorAddress(false);
    setIsErrorBusinessLead(false);
    setIsErrorContact(false);
    setIsCalled(false);

    onClose();
  };

  if (mutateForm.isLoading) {
    <Loading />;
  }
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
        <DialogTitle>Installer {installerId}</DialogTitle>
      ) : (
        <Typography className={classes.dialogButton}>
          Add a Installer
        </Typography>
      )}

      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Card sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', marginTop: 1 }}>
                  <Typography>Installer Id</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <TextField
                  placeholder="Enter Installer Id"
                  autoFocus
                  required
                  disabled={isPublished}
                  fullWidth
                  id="txtId"
                  // variant="filled"
                  // sx={{ marginTop: 3 }}
                  name="installerId"
                  // label="Installer Id"
                  margin="normal"
                  error={Boolean(
                    formik.touched.installerId && formik.errors.installerId,
                  )}
                  helperText={
                    formik.touched.installerId && formik.errors.installerId
                  }
                  value={formik.values.installerId}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', marginTop: 1 }}>
                  <Typography>Installer Name</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <TextField
                  placeholder="Enter Installer Name"
                  required
                  disabled={isPublished}
                  fullWidth
                  id="txtName"
                  // variant="filled"
                  // sx={{ marginTop: 3 }}
                  name="installerName"
                  // label="Installer Name"
                  margin="normal"
                  error={Boolean(
                    formik.touched.installerName && formik.errors.installerName,
                  )}
                  helperText={
                    formik.touched.installerName && formik.errors.installerName
                  }
                  value={formik.values.installerName}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
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
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', marginTop: 2 }}>
                  <Typography>Business Registration Number</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <TextField
                  placeholder="Enter Business Registration Number"
                  required
                  disabled={isPublished}
                  fullWidth
                  id="txtRegistrationNumber"
                  // variant="filled"
                  name="businessRegistrationNumber"
                  // label="Business Registration Number"
                  margin="normal"
                  // sx={{ marginTop: 3 }}
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
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Business Registration Number Type</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              placeholder="Enter Business Registration Number Type"
              required
              disabled={isPublished}
              fullWidth
              id="txtRegistrationType"
              // variant="filled"
              name="businessRegistrationNumberType"
              // label="Business Registration Number Type"
              margin="normal"
              // sx={{ marginTop: 3 }}
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
            />
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
            onError={(b) => {
              setIsErrorAddress(b);
            }}
            disabled={isPublished}
            addMoreComponents={
              <>
                <Box sx={{ display: 'flex', marginTop: 2 }}>
                  <Typography>Business Type</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <TextField
                  placeholder="Enter Business Type"
                  required
                  disabled={isPublished}
                  fullWidth
                  id="txtType"
                  // variant="filled"
                  name="businessType"
                  // label="Business Type"
                  margin="normal"
                  // sx={{ marginTop: 3 }}
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
                  placeholder="Enter Primary Business Function"
                  required
                  disabled={isPublished}
                  fullWidth
                  id="txtFunction"
                  // variant="filled"
                  name="primaryBusinessFunction"
                  // label="Primary Business Function"
                  margin="normal"
                  // sx={{ marginTop: 3 }}
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
            onError={(b) => {
              setIsErrorBusinessLead(b);
            }}
            disabled={isPublished}
            addMoreComponents={
              <>
                <Box sx={{ display: 'flex', marginTop: 2 }}>
                  <Typography>Website Link</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <TextField
                  placeholder="Enter Website Link"
                  fullWidth
                  disabled={isPublished}
                  id="txtWebsite"
                  // variant="filled"
                  name="websiteLink"
                  // label="Company Website"
                  margin="normal"
                  // sx={{ marginTop: 3 }}
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
                      // variant="filled"
                      name="numberOfEmployees"
                      // label="Number of Employees"
                      margin="normal"
                      // sx={{ marginTop: 3 }}
                      value={formik.values.numberOfEmployees}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ display: 'flex', marginTop: 2 }}>
                      <Typography>Other countries of Operation</Typography>
                    </Box>
                    <TextField
                      fullWidth
                      placeholder="Enter other countries of operation"
                      disabled={isPublished}
                      id="txtOperationCountry"
                      // variant="filled"
                      name="otherCountriesOfOperation"
                      // label="Other Countries of Operation"
                      margin="normal"
                      // sx={{ marginTop: 3 }}
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
                      // variant="filled"
                      name="otherRelatedEntities"
                      // label="Other Related Businesses"
                      margin="normal"
                      // sx={{ marginTop: 3 }}
                      value={formik.values.otherRelatedEntities}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ display: 'flex', marginTop: 2 }}>
                      <Typography>Significant Shareholders</Typography>
                    </Box>
                    <TextField
                      fullWidth
                      placeholder="Enter significant shareholders"
                      disabled={isPublished}
                      id="txtShareHolder"
                      // variant="filled"
                      name="shareholders"
                      // label="Significant Shareholders"
                      margin="normal"
                      // sx={{ marginTop: 3 }}
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
                  // variant="filled"
                  name="balanceSheetTotal"
                  // label="Balance Sheet Total For The Last Financial Year"
                  margin="normal"
                  // sx={{ marginTop: 3 }}
                  value={formik.values.balanceSheetTotal}
                  onChange={formik.handleChange}
                />
              </>
            }
          />

          <ContactForm
            title="Operational Contact"
            name="operationalContact"
            value={formik.values.operationalContact}
            setFieldValue={formik.setFieldValue}
            isReset={isReset}
            disabled={isPublished}
            onError={(b) => {
              setIsErrorContact(b);
            }}
          />
          <ContactForm
            title="Lead User Contact"
            name="leadUserContact"
            value={formik.values.leadUserContact}
            setFieldValue={formik.setFieldValue}
            isReset={isReset}
            disabled={isPublished}
            onError={(b) => {
              setIsErrorContact(b);
            }}
          />
          <ContactForm
            title="Finance Person Contact"
            name="financePersonContact"
            value={formik.values.financePersonContact}
            setFieldValue={formik.setFieldValue}
            isReset={isReset}
            disabled={isPublished}
            onError={(b) => {
              setIsErrorContact(b);
            }}
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
                      // alt="certification"
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
        {id && (
          <Box textAlign="center" sx={{ mb: 3 }}>
            <Button size="large" variant="contained" color="primary">
              View Installed Devices
            </Button>
          </Box>
        )}
      </form>
    </Drawer>
  );
}
