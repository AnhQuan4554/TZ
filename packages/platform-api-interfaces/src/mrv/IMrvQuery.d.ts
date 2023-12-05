export type IMrvStatus = 'All' | 'Success' | 'Error';

export type IMrvApprovedStatus = 'All' | 'Approved' | 'Not Approved Yet';

export type IMrvQuery = {
  startDateTime: string;
  endDateTime: string;
  status: IMrvStatus;
  dataSourceType: string;
  isApproved: IMrvApprovedStatus;
  policyTag: string;
};
