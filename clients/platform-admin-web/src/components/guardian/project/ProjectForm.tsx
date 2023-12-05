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
  FormControl,
  Select,
  MenuItem,
  Card,
  Typography,
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import type { IProject, IProjectType } from '@tymlez/platform-api-interfaces';
import { PermissionButton } from '@tymlez/frontend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { useForm } from '../../../api/usePostForm';
import { fetchProjectData } from '../../../api/useFetchProjectData';
import ProjectPublishButton from './ProjectPublishButton';
import { Loading } from '../../Loading';
import CountrySelect from '../../CountrySelect';

export function ProjectForm() {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isPublished, setIsPublished] = useState<boolean>(false);

  const mutateForm = useForm<IProject>('project', isUpdating ? 'PUT' : 'POST');
  const projectTypes: IProjectType[] = [
    'GHG emission reductions from fuel combustion',
    'GHG emission reductions from industrial processes (non-combustion, chemical reaction, fugitive, other) ',
    'Land Use, Land Use Change and Forestry',
    'Carbon Capture and Storage',
    'Livestock',
    'Waste Handling and Disposal',
    'Renewable Energy Generation',
  ];

  const formik = useFormik({
    initialValues: {
      projectName: '',
      projectDescription: '',
      projectType: projectTypes[0],
      country: '',
      standard: '',
      standardProjectId: '',
      standardProjectLink: '',
      plannedUNSDGImpacts: '',
      submit: null,
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required('Project Name is required'),
      projectDescription: Yup.string().required(
        'Project Description is required',
      ),
      country: Yup.string().required('Country is required'),
      standard: Yup.string().required('Standard is required'),
      // standardProjectId: Yup.string().required(
      //   'Standard Project Id is required',
      // ),
    }),

    onSubmit: async (_, helpers): Promise<void> => {
      mutateForm.mutate(
        { ...(formik.values as any) },
        {
          onSuccess: (res: any) => {
            if (res.data.success) {
              helpers.setStatus({ success: true });

              if (isUpdating) {
                toast.success('Project updated');
              } else {
                toast.success('Project added');
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
    ['project'],
    async () => {
      const data = await fetchProjectData();
      if (data) {
        formik.resetForm({ values: data as any });
        setIsPublished(data.isPublished);
        if (!data.isPublished) {
          setIsUpdating(true);
        }
      } else {
        formik.resetForm();
      }
    },
    { refetchOnWindowFocus: false },
  );
  if (isLoading) {
    return <Loading />;
  }
  const onCancel = () => {
    refetch();
  };

  return (
    <>
      <ProjectPublishButton
        isPublished={isPublished}
        onPublishedSucces={(b) => {
          setIsPublished(b);
        }}
      />

      <form onSubmit={formik.handleSubmit}>
        <Card sx={{ marginTop: '24px', p: 3 }}>
          <DialogContent sx={{ p: 0 }}>
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Project Name</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              placeholder="Enter project name"
              required
              disabled={isPublished}
              fullWidth
              id="txtName"
              name="projectName"
              margin="normal"
              autoFocus
              value={formik.values.projectName}
              onChange={formik.handleChange}
              error={Boolean(
                formik.touched.projectName && formik.errors.projectName,
              )}
              helperText={
                formik.touched.projectName && formik.errors.projectName
              }
            />
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Country</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <CountrySelect
              name="country"
              value={formik.values.country}
              setFieldValue={formik.setFieldValue}
              disabled={isPublished}
              title=""
              display="code"
            />
            <Box sx={{ display: 'flex', marginTop: 3 }}>
              <Typography>Project Type</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <FormControl
              required
              disabled={isPublished}
              fullWidth
              sx={{ marginTop: 3 }}
            >
              <Select
                labelId="type-simple-select-required-label"
                id="selectProjectType"
                name="projectType"
                error={Boolean(
                  formik.touched.projectType && formik.errors.projectType,
                )}
                value={formik.values.projectType}
                onChange={formik.handleChange}
              >
                {projectTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', marginTop: 3 }}>
              <Typography>Project Description</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              required
              disabled={isPublished}
              fullWidth
              id="txtProjectDescription"
              name="projectDescription"
              margin="normal"
              value={formik.values.projectDescription}
              onChange={formik.handleChange}
              error={Boolean(
                formik.touched.projectDescription &&
                  formik.errors.projectDescription,
              )}
              helperText={
                formik.touched.projectDescription &&
                formik.errors.projectDescription
              }
            />
            <Box sx={{ display: 'flex', marginTop: 3 }}>
              <Typography>Standard</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              required
              disabled={isPublished}
              fullWidth
              id="txtStandard"
              name="standard"
              margin="normal"
              value={formik.values.standard}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.standard && formik.errors.standard)}
              helperText={formik.touched.standard && formik.errors.standard}
            />
            <Box sx={{ display: 'flex', marginTop: 3 }}>
              <Typography>Standard Project Id</Typography>
            </Box>
            <TextField
              // required
              disabled={isPublished}
              fullWidth
              id="txtStandardProjectId"
              name="standardProjectId"
              margin="normal"
              value={formik.values.standardProjectId}
              onChange={formik.handleChange}
              error={Boolean(
                formik.touched.standardProjectId &&
                  formik.errors.standardProjectId,
              )}
              helperText={
                formik.touched.standardProjectId &&
                formik.errors.standardProjectId
              }
            />
            <Box sx={{ display: 'flex', marginTop: 3 }}>
              <Typography>Standard Project Link</Typography>
            </Box>
            <TextField
              disabled={isPublished}
              fullWidth
              id="txtStandardProjectLink"
              name="standardProjectLink"
              margin="normal"
              value={formik.values.standardProjectLink}
              onChange={formik.handleChange}
              placeholder="Enter standard project link"
            />
            <Box sx={{ display: 'flex', marginTop: 3 }}>
              <Typography>Planned UNSDG Impacts</Typography>
            </Box>
            <TextField
              placeholder="Enter Planned UNSDG Impacts"
              fullWidth
              disabled={isPublished}
              id="txtPlannedUNSDGImpacts"
              name="plannedUNSDGImpacts"
              margin="normal"
              value={formik.values.plannedUNSDGImpacts}
              onChange={formik.handleChange}
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
                onClick={onCancel}
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
        </Card>
      </form>
    </>
  );
}
