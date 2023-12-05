import * as React from 'react';
import type { NextPage } from 'next';
import { Box, Card, Grid } from '@mui/material';
import type { IDataTask, UUID } from '@tymlez/platform-api-interfaces';
import { useDataTasks, useDeleteDataTask } from 'src/api/useDataTasks';
import AddIcon from '@mui/icons-material/Add';
import { PermissionButton } from '@tymlez/frontend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { DataTasksFilterForm } from './DataTasksFilterForm';
import { Loading } from '../Loading';
import { DataTasksTable } from './DataTasksTable';
import { DataTaskEditorModal } from './DataTaskEditorModal';
import { commonStyle } from '../../styles/CommonStyle';

interface IDataTaskFilter {
  dataFlowId?: UUID;
}

export const DataTasksPage: NextPage = () => {
  const classes = commonStyle();
  const [filter, setFilter] = React.useState<IDataTaskFilter>({});
  const [editingDataTask, setEditingDataTask] =
    React.useState<IDataTask | null>(null);

  const [isCreatingDataTask, setIsCreatingDataTask] =
    React.useState<boolean>(false);

  const {
    queryResult,
    isLoading,
    page,
    pageSize,
    handleChangePage,
    handleChangeRowsPerPage,
    refetch,
  } = useDataTasks();

  const dataTasks = queryResult.data.filter(
    (df) =>
      filter.dataFlowId === undefined ||
      filter.dataFlowId === 'all' ||
      df?.dataFlow?.id === filter.dataFlowId,
  );

  const handleFilterChange = (newFilter: any) => {
    setFilter(newFilter);
  };

  const handleEditDataTask = (item: IDataTask) => {
    setEditingDataTask(item);
  };

  const handleEditDataTaskComplete = () => {
    setEditingDataTask(null);
    refetch();
  };

  const handleCreateDataTask = () => {
    setIsCreatingDataTask(true);
    setEditingDataTask(null);
  };

  const handleCreateDataTaskComplete = () => {
    setIsCreatingDataTask(false);
    refetch();
  };

  const deleteDataTask = useDeleteDataTask();
  const handleDeleteDataTask = async (item: IDataTask) => {
    await deleteDataTask.mutateAsync(item.id);
    refetch();
  };

  return (
    <Card sx={{ width: '100%', p: 3 }}>
      <Box
        sx={{
          textAlign: 'center',
          display: 'grid',
          gridTemplateColumns: 'repeat(6, minmax(200px, 1fr))',
        }}
      >
        <PermissionButton
          allowPermissions={PERMISSION_SET.CONFIG_WRITE_MANAGEMENT}
          className={classes.actionBtn}
          onClick={() => setIsCreatingDataTask(true)}
          size="medium"
          style={{ position: 'relative' }}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add New
        </PermissionButton>
      </Box>
      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item xs={2}>
          <DataTasksFilterForm
            filter={filter}
            onFilterChange={handleFilterChange}
          />
        </Grid>
      </Grid>
      <DataTaskEditorModal
        open={editingDataTask !== null && !isCreatingDataTask}
        dataTask={editingDataTask}
        onClose={handleEditDataTaskComplete}
      />
      <DataTaskEditorModal
        open={editingDataTask === null && isCreatingDataTask}
        onClose={handleCreateDataTaskComplete}
      />
      {isLoading && <Loading />}
      {!isLoading && (
        <DataTasksTable
          dataTasks={dataTasks}
          page={page}
          pageSize={pageSize}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          onCreateNew={() => handleCreateDataTask()}
          onDeleteDataTask={handleDeleteDataTask}
          onEditDataTask={handleEditDataTask}
        />
      )}
    </Card>
  );
};
