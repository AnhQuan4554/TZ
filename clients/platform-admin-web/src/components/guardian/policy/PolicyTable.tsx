import { FC, useState } from 'react';
import * as React from 'react';
import { Button, Card, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import type { GridColDef } from '@mui/x-data-grid';
import { CommonTable, PermissionButton } from '@tymlez/frontend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { AddPolicyModal } from './AddPolicyModal';
import { usePolicyData } from '../../../api/useFetchPolicyData';
import { Loading } from '../../Loading';
import PublishPolicyButton from './PublishPolicyButton';

interface Props {
  addRefreshTime: Date;
}

export const CustomizedPolicyTable: FC<Props> = ({ addRefreshTime }) => {
  const [updateRefreshTime, setUpdateRefreshTime] = useState(new Date());
  const [policyId, setPolicyId] = useState('');
  const [publishing, setPublishing] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'NAME',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'version',
      headerName: 'VERSION',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'tokenMintValue',
      headerName: 'TOKEN MINT VALUE',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'tokenId',
      headerName: 'Token Id',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'content',
      headerName: 'CONTENT',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'action',
      headerName: 'ACTION',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return item.isPublished ? (
          <Button disabled title="Published" startIcon={<FileUploadIcon />}>
            Published
          </Button>
        ) : (
          <Stack direction="row">
            <PermissionButton
              allowPermissions={PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT}
              title="Edit"
              onClick={() => {
                setPolicyId(item.id);
              }}
              startIcon={<EditIcon />}
            >
              Edit
            </PermissionButton>

            <PermissionButton
              allowPermissions={PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT}
              title="Publish"
              onClick={() => {
                setPolicyId(item.id);
                setPublishing(true);
              }}
              startIcon={<FileUploadIcon />}
            >
              Publish
            </PermissionButton>
          </Stack>
        );
      },
    },
  ];

  const handleClose = () => {
    setPolicyId('');
    setUpdateRefreshTime(new Date());
    setPublishing(false);
  };

  const { queryResult, isLoading } = usePolicyData(
    addRefreshTime,
    updateRefreshTime,
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {policyId !== '' && (
        <>
          <AddPolicyModal
            open={!publishing}
            onClose={handleClose}
            id={policyId}
          />
          <PublishPolicyButton
            id={policyId}
            open={publishing}
            onClose={handleClose}
          />
        </>
      )}
      <Card sx={{ marginTop: '24px', p: 3 }}>
        <CommonTable
          columns={columns}
          data={queryResult?.data}
          selectedCell={policyId}
          count={queryResult?.count}
          customCellStyle={{
            border: 'none',
          }}
          customHeadStyle={{
            border: 'none',
            background: '#A8D973',
            color: '#3A5320',
          }}
          hideFooter
        />
      </Card>
    </>
  );
};
