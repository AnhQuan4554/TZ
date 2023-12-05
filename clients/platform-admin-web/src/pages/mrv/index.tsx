import { PERMISSION_SET } from '@tymlez/common-libs';
import { createProtectedPage } from '../../components/common/createProtectedPage';
import { MrvPage } from '../../components/mrv';

export default createProtectedPage(<MrvPage />, PERMISSION_SET.DATA_MANAGEMENT);
