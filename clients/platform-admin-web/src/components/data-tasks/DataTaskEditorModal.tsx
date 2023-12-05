import * as React from 'react';
import { find } from 'lodash';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import type {
  IDataTask,
  IMeterJob,
  UUID,
} from '@tymlez/platform-api-interfaces';
import { LoadingButton } from '@mui/lab';
import toast from 'react-hot-toast';
import {
  Button,
  TextField,
  FormHelperText,
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  ListItemText,
  Typography,
  Drawer,
} from '@mui/material';
import { useDataFlows } from 'src/api/useDataFlows';
import { useDataTasks } from 'src/api/useDataTasks';
import { useForm } from '../../api/usePostForm';
import { commonStyle } from '../../styles/CommonStyle';

interface DataTaskEditorModalProps {
  open: boolean;
  onClose: () => void;
  dataTask?: IDataTask | null;
}

const dataTaskTypes = [
  'collection.wattwatchers',
  'collection.solcast',
  'collection.mockaroo',
];

export function DataTaskEditorModal({
  open,
  onClose,
  dataTask,
}: DataTaskEditorModalProps) {
  const classes = commonStyle();
  const { queryResult } = useDataFlows();
  const dataFlows = queryResult.data;
  if (open && dataFlows?.length === 0) {
    toast.error('No data flows. Please add a Data Flow first');
  }

  const { queryResult: taskResult } = useDataTasks();

  const isCreatingNew = dataTask === undefined || dataTask === null;

  const mutateForm = useForm<IMeterJob>(
    'data-task',
    isCreatingNew ? 'POST' : 'PUT',
    dataTask?.id,
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      dataFlow: '',
      type: '',
      dependsOn: [] as UUID[],
      submit: null,
      settings: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      type: Yup.string().required('Type is required'),
      dataFlow: Yup.string().required('Data Flow is required'),
      settings: Yup.object().nullable(),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      mutateForm.mutate(
        { ...(values as any) },
        {
          onSuccess: (res: any) => {
            if (res.data.success) {
              helpers.setStatus({ success: true });
              if (isCreatingNew) {
                toast.success('Data Task added');
              } else {
                toast.success('Data Task updated');
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

  const dataTasks = taskResult.data.filter(
    (task) =>
      !formik.values.dataFlow || task.dataFlow.id === formik.values.dataFlow,
  );

  const closeForm = () => {
    mutateForm.reset();
    formik.resetForm();
    onClose();
  };

  const { resetForm } = formik; // this is to silence lint warnings
  React.useEffect(() => {
    if (dataTask) {
      resetForm({
        values: { ...(dataTask as any), dataFlow: dataTask.dataFlow.id },
      });
    }
  }, [dataTask, resetForm]);

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
      {dataTask ? (
        <DialogTitle>Data Task - {dataTask.name}</DialogTitle>
      ) : (
        <Typography className={classes.dialogButton}>
          Add a Data Task
        </Typography>
      )}
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <>
            <Box sx={{ display: 'flex' }}>
              <Typography>Name</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              placeholder="Enter Name"
              // required
              fullWidth
              id="txtName"
              // // variant="filled"
              // sx={{ marginTop: 3 }}
              name="name"
              // label="Name"
              margin="normal"
              autoFocus
              error={Boolean(formik.touched.name && formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              value={formik.values.name || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Box sx={{ display: 'flex' }}>
              <Typography>Data Flow</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <FormControl fullWidth sx={{ marginTop: 3 }}>
              <Select
                displayEmpty
                // variant="filled"
                labelId="data-flow-simple-select-required-label"
                id="selectDataFlow"
                // label="Data Flow *"
                name="dataFlow"
                error={Boolean(
                  formik.touched.dataFlow && formik.errors.dataFlow,
                )}
                value={formik.values.dataFlow}
                onChange={formik.handleChange}
              >
                <MenuItem value="" disabled>
                  Choose data flow
                </MenuItem>
                {dataFlows?.map((flow) => (
                  <MenuItem key={flow.id} value={flow.id}>
                    {flow.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Task Type</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <FormControl fullWidth sx={{ marginTop: 3 }}>
              <Select
                displayEmpty
                // variant="filled"
                labelId="type-simple-select-required-label"
                id="selectType"
                // label="Type *"
                name="type"
                error={Boolean(formik.touched.type && formik.errors.type)}
                value={formik.values.type}
                onChange={formik.handleChange}
              >
                <MenuItem value="" disabled>
                  Choose task type
                </MenuItem>
                {dataTaskTypes?.map((str) => (
                  <MenuItem key={str} value={str}>
                    {str}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Depends On</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <FormControl fullWidth sx={{ marginTop: 3 }}>
              <InputLabel id="depends-on-select-required-label">
                Depends On
              </InputLabel>
              <Select
                // variant="filled"
                multiple
                labelId="depends-on-select-required-label"
                id="selectDependants"
                // label="Data Tasks *"
                name="dependsOn"
                error={Boolean(
                  formik.touched.dataFlow && formik.errors.dataFlow,
                )}
                renderValue={(selected) =>
                  selected.map((id) => find(dataTasks, { id })?.name).join(', ')
                }
                value={formik.values.dependsOn}
                onChange={formik.handleChange}
              >
                {dataTasks?.map((task) => (
                  <MenuItem key={task.id} value={task.id}>
                    <Checkbox
                      checked={formik.values.dependsOn.includes(task.id)}
                    />
                    <ListItemText primary={task.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 3 }}>
              <Box sx={{ display: 'flex' }}>
                <Typography>Setting</Typography>
                <Typography sx={{ color: '#CF372C' }}>*</Typography>
              </Box>
              <TextField
                multiline
                fullWidth
                id="txtSettings"
                // variant="filled"
                // sx={{ marginTop: 3 }}
                name="settings"
                // label="Settings"
                margin="normal"
                autoFocus
                error={Boolean(
                  formik.touched.settings && formik.errors.settings,
                )}
                helperText={formik.touched.settings && formik.errors.settings}
                value={
                  typeof formik.values.settings === 'string'
                    ? formik.values.settings
                    : JSON.stringify(formik.values.settings || {}, null, 4)
                }
                onChange={formik.handleChange}
              />
            </FormControl>
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
              className={classes.actionBtn}
              loading={mutateForm.isLoading}
              size="large"
              variant="contained"
              color="primary"
              type="submit"
            >
              {isCreatingNew ? 'Save' : 'Update'}
            </LoadingButton>
          </DialogActions>
        </Box>
      </form>
    </Drawer>
  );
}
