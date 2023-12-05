import { Box, Button, Card, FormLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import axios from 'axios';
import type { IImport } from '@tymlez/platform-api-interfaces';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { Loading } from '../Loading';
import Checkbox from './CustomizedCheckbox';
import { commonStyle } from '../../styles/CommonStyle';

const Input = styled('input')({
  display: 'none',
});

export function ImportForm() {
  const classes = commonStyle();
  const [data, setData] = useState<IImport[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [selectedData, setSelectedData] = useState<IImport[]>([]);
  const formRef = useRef(null);
  const previewMutateForm = useMutation((_: any) => {
    const formData = new FormData(formRef.current as any);
    return axios.post(
      `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/import/preview`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  });

  const onFileSelectedHandle = async (event: any) => {
    const file: File = event.target.files[0];
    if (file === undefined) {
      return;
    }
    const zip = file.name.match(/\.zip/gi);
    if (zip) {
      setSelectedFile(file.name);
      const previewImportItems: IImport[] = (
        await previewMutateForm.mutateAsync({ setSelectedFile })
      ).data;
      setData(previewImportItems);
      const selections = previewImportItems.filter((x) => x.status);
      setSelectionModel(selections.map((x) => x.id));
    } else {
      toast.error('Please select a zip file');
    }
  };

  const columns: GridColDef[] = [
    //{ field: 'id', headerName: 'ID', minWidth: 350, sortable: false, flex: 3 },

    {
      field: 'ref',
      headerName: 'Reference',
      sortable: false,
      flex: 3,
      headerAlign: 'center',
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerName: 'Not Existing',
      flex: 1,
      headerAlign: 'center',
    },
    //{ field: 'isPublished', headerName: 'Published', minWidth: 150 },
  ];

  const importMutateForm = useMutation((_: any) => {
    const formData = new FormData(formRef.current as any);
    return axios.post(
      `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/import`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  });
  const onImport = () => {
    const ids = selectionModel.map((selection) =>
      data.findIndex((x) => x.id === selection),
    );

    const selectedRows = ids.map((index) => data[index]);
    setSelectedData(selectedRows);
    importMutateForm.mutateAsync(
      { selectedFile },
      {
        onSuccess: (res: any) => {
          if (res.data?.success) {
            toast.success('Import successfully');
          } else {
            toast.error(
              `Import failed! ${
                res.data?.message || res.response?.data.message
              }`,
            );
          }
        },
        onError: (err: any) => {
          toast.error(`Import failed! ${err.message}`);
        },
      },
    );
  };

  if (importMutateForm.isLoading) {
    <Loading />;
  }

  return (
    <>
      <form ref={formRef}>
        <Box
          sx={{
            textAlign: 'center',
            display: 'grid',
            gridTemplateColumns: 'repeat(6, minmax(200px, 1fr))',
            columnGap: 10,
          }}
        >
          <input
            type="hidden"
            value={JSON.stringify(selectedData)}
            name="importData"
          />
          <FormLabel htmlFor="file" style={{ width: '100%' }}>
            <Input
              accept=".zip"
              id="file"
              name="file"
              type="file"
              onChange={onFileSelectedHandle}
            />
            <Button
              fullWidth
              className={classes.actionBtn}
              size="medium"
              variant="contained"
              color="primary"
              component="span"
            >
              Select File
            </Button>
          </FormLabel>

          <Button
            className={classes.actionBtn}
            fullWidth
            size="medium"
            variant="contained"
            color="primary"
            component="span"
            onClick={onImport}
          >
            Import
          </Button>

          {previewMutateForm.isLoading && <Loading />}
        </Box>
      </form>

      {data && (
        <Card sx={{ width: '100%', p: 3, marginTop: '24px' }}>
          <DataGrid
            autoHeight
            sx={{
              minWidth: 700,
              marginTop: 5,
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#92d050',
                //   fontWeight: 'bold',
                color: '#3A5320',
                // textTransform: 'uppercase',
                // border: 'none',
              },
              '& .MuiDataGrid-columnSeparator': {
                display: 'none',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'rgba(146, 208, 80, 0.08)',
              },
              borderColor: 'primary.light',
            }}
            rows={data}
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[15]}
            // checkboxSelection
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
            disableSelectionOnClick
            isRowSelectable={(params) => !params.row.isPublished}
            components={{
              BaseCheckbox: Checkbox,
            }}
            hideFooter
          />
        </Card>
      )}
    </>
  );
}
