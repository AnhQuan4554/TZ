import React from 'react';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { QueuePage } from '../../components/queue';
import { createProtectedPage } from '../../components/common/createProtectedPage';

export default createProtectedPage(
  <QueuePage />,
  PERMISSION_SET.CONFIG_MANAGEMENT,
);
