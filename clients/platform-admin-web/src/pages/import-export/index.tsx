import { PERMISSION_SET } from '@tymlez/common-libs';
import { createProtectedPage } from '../../components/common/createProtectedPage';
import { ImportExportPage } from '../../components/import-export';

export default createProtectedPage(
  <ImportExportPage />,
  PERMISSION_SET.CONFIG_WRITE_MANAGEMENT,
);
