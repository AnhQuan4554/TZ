/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-case-declarations */
import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import type { NextPage } from 'next';
import useWebSocket from 'react-use-websocket';
import {
  Tooltip,
  ListItemText,
  List,
  Chip,
  Grid,
  Stack,
  TextField,
  MenuItem,
  Divider,
  ListItemButton,
  Typography,
  Box,
  Card,
} from '@mui/material';
import type { IQueue, IQueueData } from '@tymlez/platform-api-interfaces';
import type { GridColDef } from '@mui/x-data-grid';
import {
  CommonTable,
  ACCESS_TOKEN_KEY,
  CustomPagination,
} from '@tymlez/frontend-libs';
import { ObjectViewer } from '../common/ObjectViewer';
import { CustomizedFilter } from '../CustomizedFilter';

const color: { [x: string]: string } = {
  completed: 'rgb(76, 175, 80)',
  wait: 'rgb(103, 58, 183)',
  active: 'rgb(0, 188, 212)',
  failed: 'rgb(244, 67, 54)',
  drained: 'rgb(117, 117, 117)',
  delayed: 'rgb(21, 101, 192)',
};

export const QueuePage: NextPage = () => {
  const [lastProcessMessage, setLastProcessMessage] = useState('');
  const [queueList, setQueueList] = useState<IQueue[]>([]);
  const [activeQueueJobs, setQueueJobs] = useState<IQueueData>();
  const [selectedState, setSelectedState] = useState<string>('completed');
  const [selectedQueue, setSelectedQueue] = useState<IQueue>();
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(25);
  const [order, setOrder] = useState<string>('DESC');
  const [jobId, setJobId] = useState<string>('');
  const [filterQuery, setFilterQuery] = React.useState<string>('');

  function updateQueueData(
    state: string,
    newPage: number,
    newPageSize: number,
    name?: string,
  ) {
    sendJsonMessage({
      event: 'queue-data',
      data: {
        name,
        state,
        page: newPage,
        pageSize: newPageSize,
      },
    });
  }

  function updateQueueStats(name: string) {
    sendJsonMessage({
      event: 'queue-stats',
      data: {
        name,
      },
    });
  }

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
    updateQueueData(selectedState, newPage, pageSize, selectedQueue?.name);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    setPage(0);
    updateQueueData(selectedState, 0, newPageSize, selectedQueue?.name);
  };

  const handleOrderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOrder(event.target.value);
  };

  const handleSearchJobId = (event: ChangeEvent<HTMLInputElement>) => {
    setJobId(event.target.value);
  };

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    queue: IQueue,
  ) => {
    setSelectedQueue(queue);
  };
  const socketUrl = document.location.href
    .replace('/admin/queue/', '/ws')
    .replace('/admin/queue', '/ws')
    .replace('https', 'wss')
    .replace('http', 'ws');

  const {
    // lastMessage,
    //sendMessage,
    sendJsonMessage,
    lastJsonMessage,
    // getWebSocket,
    readyState,
  } = useWebSocket<{ event: string; data: any }>(socketUrl, {
    onOpen: () => console.log('socket connection ready'),
    shouldReconnect: () => true,
    queryParams: {
      token: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
    },
  });

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'timestamp',
      headerName: 'TIMESTAMP',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'processedOn',
      headerName: 'PROCESSED ON',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'name',
      headerName: 'NAME',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'delay',
      headerName: 'DELAY',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'data',
      headerName: 'DATA',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return (
          <ObjectViewer
            data={item.data}
            rootKey={item.id.toString()}
            mode="dialog"
            allowCopy={false}
          />
        );
      },
    },
    {
      field: 'action',
      headerName: 'ACTION',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return (
          <ObjectViewer
            data={item}
            rootKey={item.id.toString()}
            mode="dialog"
            allowCopy={false}
          />
        );
      },
    },
  ];

  React.useEffect(() => {
    if (readyState === 0) {
      return;
    }
    if (lastJsonMessage !== null) {
      //switch case here
      const stringMsg = JSON.stringify(lastJsonMessage);
      if (lastProcessMessage === stringMsg) {
        return;
      }
      setLastProcessMessage(stringMsg);

      switch (lastJsonMessage.event) {
        case 'sync':
          setQueueList(lastJsonMessage.data.queues);
          lastJsonMessage.data.queues.forEach((queue: any) => {
            updateQueueStats(queue.name);
          });
          break;
        case 'update': // update
          if (
            lastJsonMessage.data.state === selectedState &&
            selectedQueue?.name === lastJsonMessage.data.name
          ) {
            updateQueueData(selectedState, page, pageSize, selectedQueue?.name);
          } else {
            updateQueueStats(lastJsonMessage.data.queueName);
          }
          break;

        case 'queue-data': // update
          setQueueJobs(lastJsonMessage.data);
          break;
        case 'queue-stats': // update
          const updatedData = JSON.parse(JSON.stringify(queueList));
          const matchedByName = updatedData.find(
            (x: IQueue) => x.name === lastJsonMessage.data.name,
          );
          if (matchedByName) {
            matchedByName.stats = lastJsonMessage.data.stats;
          }
          setQueueList(updatedData);
          break;
      }
    } else {
      sendJsonMessage({ event: 'sync' });
    }
  }, [
    lastProcessMessage,
    setLastProcessMessage,
    lastJsonMessage,
    sendJsonMessage,
    setQueueJobs,
    setQueueList,
    queueList,
    readyState,
    selectedState,
    selectedQueue,
    page,
    pageSize,
    updateQueueData,
    updateQueueStats,
  ]);

  return (
    <Card sx={{ flexGrow: 1, width: '100%', p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs="auto">
          <Stack direction="row">
            <Stack direction="column">
              <CustomizedFilter
                filterQuery={filterQuery}
                onUpdateQuery={setFilterQuery}
              />

              <List component="nav" aria-label="queue list" sx={{ mt: 3 }}>
                {queueList.map((queue) => (
                  <ListItemButton
                    key={queue.name}
                    selected={selectedQueue?.name === queue.name}
                    onClick={(event) => handleListItemClick(event, queue)}
                  >
                    <ListItemText
                      primary={
                        <Typography component="span">
                          Queue: {queue.name}
                        </Typography>
                      }
                      secondary={
                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                          {Object.entries(queue.stats || {}).map(
                            ([key, value]) => {
                              return (
                                <Tooltip title={key} key={queue.name + key}>
                                  <Chip
                                    key={queue.name + key}
                                    label={value as string}
                                    variant="outlined"
                                    sx={{
                                      color: 'rgb(255, 255, 255)',
                                      bgcolor: color[key],
                                      opacity:
                                        selectedQueue?.name === queue.name &&
                                        selectedState === key
                                          ? 1
                                          : 0.3,
                                    }}
                                    onClick={() => {
                                      setSelectedQueue(queue);
                                      setSelectedState(key);
                                      updateQueueData(
                                        key,
                                        0,
                                        pageSize,
                                        queue.name,
                                      );
                                    }}
                                  />
                                </Tooltip>
                              );
                            },
                          )}
                        </Stack>
                      }
                    />
                  </ListItemButton>
                ))}
              </List>
            </Stack>
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{ borderRightWidth: 5 }}
              flexItem
            />
          </Stack>
        </Grid>

        <Grid item xs sx={{ ml: 2 }}>
          <Stack direction="row" spacing={1}>
            {Object.entries(selectedQueue?.stats || {}).map(([key, value]) => {
              return (
                <Chip
                  key={(selectedQueue?.name || '') + key}
                  label={`${value} ${key}` as string}
                  variant="outlined"
                  sx={{
                    color: 'rgb(255, 255, 255)',
                    bgcolor: color[key],
                    opacity: selectedState === key ? 1 : 0.3,
                  }}
                  onClick={() => {
                    setSelectedState(key);
                    updateQueueData(key, 0, pageSize, selectedQueue?.name);
                  }}
                />
              );
            })}
          </Stack>
          <Stack direction="row" spacing={3} sx={{ mt: 3 }}>
            <TextField
              id="txtJobId"
              variant="outlined"
              name="jobId"
              label="Enter Job ID"
              value={jobId}
              type="search"
              onChange={handleSearchJobId}
              sx={{ bgcolor: 'background.paper' }}
            />
            <TextField
              sx={{ width: 200 }}
              id="outlined-select-currency"
              select
              label="Order"
              value={order}
              onChange={handleOrderChange}
              placeholder="ChooseType"
            >
              <MenuItem value="DESC">DESC</MenuItem>
              <MenuItem value="ASC">ASC</MenuItem>
            </TextField>
          </Stack>
          <CommonTable
            columns={columns}
            data={activeQueueJobs ? activeQueueJobs?.jobs : []}
            count={activeQueueJobs?.total}
            page={page}
            pageSize={pageSize}
            colSpan={7}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
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
          <Box sx={{ marginTop: '32px' }}>
            <CustomPagination
              dataTestId="queue-custom-pagination"
              page={page}
              count={activeQueueJobs ? activeQueueJobs.total : 0}
              pageSize={pageSize}
              // pageSizeList={[5, 10, 15]}
              handleChangePage={handleChangePage}
              handleChangePageSize={handleChangeRowsPerPage}
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};
