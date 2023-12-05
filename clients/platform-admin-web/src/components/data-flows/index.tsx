import * as React from 'react';
import type { NextPage } from 'next';
import toast from 'react-hot-toast';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { IDataFlow } from '@tymlez/platform-api-interfaces';
import { PermissionButton } from '@tymlez/frontend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { DataFlowsTable } from './DataFlowsTable';
import { Loading } from '../Loading';
import { DataFlowEditorModal } from './DataFlowEditorModal';
import {
  useDataFlows,
  useDuplicateDataFlow,
  usePublishDataFlow,
  useDeleteDataFlow,
  useToggleDataFlow,
} from '../../api/useDataFlows';
import { commonStyle } from '../../styles/CommonStyle';

export const DataFlowsPage: NextPage = () => {
  const classes = commonStyle();
  const [selectedDataFlowIds, setSelectedDataFlowIds] = React.useState<
    Array<any>
  >([]);

  const [editingDataFlow, setEditingDataFlow] =
    React.useState<IDataFlow | null>(null);

  const [isCreatingDataFlow, setIsCreatingDataFlow] =
    React.useState<boolean>(false);

  const {
    isLoading,
    queryResult,
    page,
    pageSize,
    refetch,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useDataFlows();

  const dataFlows = queryResult.data || [];

  const duplicateDataFlow = useDuplicateDataFlow();
  const handleDuplicateDataFlow = async (item: IDataFlow) => {
    await duplicateDataFlow.mutateAsync(item.id);
    refetch();
  };

  const publishDataFlow = usePublishDataFlow();
  const handlePublishDataFlow = async (item: IDataFlow) => {
    await publishDataFlow.mutateAsync(item.id);
    refetch();
  };

  const deleteDataFlow = useDeleteDataFlow();
  const handleDeleteDataFlow = async (item: IDataFlow) => {
    const res = await deleteDataFlow.mutateAsync(item.id);
    if (!res?.success) {
      toast.error(res.message || 'unkown error');
    }
    refetch();
  };

  const toggleDataFlow = useToggleDataFlow();
  const handleToggleSelectedDataFlowIds = async (enabled: boolean) => {
    for (const dataFlowId of selectedDataFlowIds) {
      await toggleDataFlow.mutateAsync({ dataFlowId, enabled });
    }
    const msg = enabled ? 'Data flow(s) activated' : 'Data flow(s) deactivated';
    toast.success(msg);
    refetch();
  };

  const handleEditDataFlow = (item: IDataFlow) => {
    setEditingDataFlow(item);
  };

  const handleEditDataFlowComplete = () => {
    setEditingDataFlow(null);
    refetch();
  };

  const handleCreateDataFlow = () => {
    setIsCreatingDataFlow(true);
  };

  const handleCreateDataFlowComplete = () => {
    setIsCreatingDataFlow(false);
    refetch();
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Box
        sx={{
          textAlign: 'center',
          display: 'grid',
          gridTemplateColumns: 'repeat(6, minmax(200px, 1fr))',
        }}
      >
        <PermissionButton
          allowPermissions={PERMISSION_SET.CONFIG_WRITE_MANAGEMENT}
          fullWidth
          color="primary"
          className={classes.actionBtn}
          size="medium"
          style={{ position: 'relative' }}
          variant="contained"
          onClick={() => {
            handleCreateDataFlow();
          }}
          startIcon={<AddIcon />}
        >
          Add new
        </PermissionButton>
        {selectedDataFlowIds.length > 0 && (
          <PermissionButton
            allowPermissions={PERMISSION_SET.CONFIG_WRITE_MANAGEMENT}
            variant="outlined"
            style={{ marginLeft: '10px' }}
            onClick={() => handleToggleSelectedDataFlowIds(true)}
          >
            Activate
          </PermissionButton>
        )}
        {selectedDataFlowIds.length > 0 && (
          <PermissionButton
            allowPermissions={PERMISSION_SET.CONFIG_WRITE_MANAGEMENT}
            variant="outlined"
            style={{ marginLeft: '10px' }}
            onClick={() => handleToggleSelectedDataFlowIds(false)}
          >
            Deactivate
          </PermissionButton>
        )}
      </Box>

      {isLoading ? (
        <Loading />
      ) : (
        <DataFlowsTable
          dataFlows={dataFlows}
          selectedDataFlowIds={selectedDataFlowIds}
          onSelectDataFlow={setSelectedDataFlowIds}
          highlightedDataFlow={editingDataFlow}
          page={page}
          pageSize={pageSize}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          onDeleteDataFlow={handleDeleteDataFlow}
          onPublishDataFlow={handlePublishDataFlow}
          onDuplicateDataFlow={handleDuplicateDataFlow}
          onEditDataFlow={handleEditDataFlow}
        />
      )}

      <DataFlowEditorModal
        open={editingDataFlow !== null && !isCreatingDataFlow}
        dataFlow={editingDataFlow}
        onClose={handleEditDataFlowComplete}
      />

      <DataFlowEditorModal
        open={editingDataFlow === null && isCreatingDataFlow}
        onClose={handleCreateDataFlowComplete}
      />
    </Box>
  );
};
