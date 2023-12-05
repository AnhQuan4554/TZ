import type {
  IDevice,
  IInstaller,
  IRootAuthority,
  ISite,
} from '@tymlez/platform-api-interfaces';
import type { IVCRecord } from './vc';

export interface IPolicyGridData<T> {
  data: T[];
}
export type IDeviceGrid = IPolicyGridData<IVCRecord<IDevice>>;
export type ISiteGrid = IPolicyGridData<IVCRecord<ISite>>;
export type IInstallerGrid = IPolicyGridData<IVCRecord<IInstaller>>;

export type IRootAuthorityGrid = IPolicyGridData<IVCRecord<IRootAuthority>>;

export enum BLOCK_TAGS {
  SENSORS_GRID = 'sensors_grid',
  ADD_SENSOR_BNT = 'add_sensor_bnt',
  ADD_NEW_INSTALLER_REQUEST = 'add_new_installer_request',
  INSTALLER_GRID_DATA = 'installer_grid_data',
  RA_INSTALLER_DATA = 'ra_installer_data',
  DEVICE_SITE_SELECTOR = 'device_site_selector',
  DEVICE_NOT_LINKED_TO_SITE = 'device_not_linked_to_site',
  SENSORS_GRID_FILTERS = 'sensors_grid_filters',
  MRV_GRIDS = 'mrv_grids',
  MRV_SOURCE = 'mrv_source',
  MVR_GRID_FILTERS = 'mvr_grid_filters',
  DOWNLOAD_CONFIG_BTN = 'download_config_btn',
  DEVICE_LINKED_TO_SITE = 'device_linked_to_site',
  SITE_GRID_DATA = 'site_grid_data',
  REQUEST_SITE_DATA = 'request_site_data',
  REQUEST_OWNER_VC = 'request_owner_vc',
  TOKEN_OWNER_DOCUMENT_DATA = 'token_owner_document_data',
  REQUEST_PROJECT_DATA = 'request_project_data',
  PROJECT_GRID_DATA = 'project_grid_data',
  DEVICE_GRID = 'device_grid',
  RA_INSTALLER_GRID = 'ra_installer_grid',
  PROJECT_GRID = 'project_grid',
  SITE_GRID = 'site_grid',
  MINT_EVENTS = 'mint_events',
  MINT_TOKEN = 'mint_token',
  TOKEN_OWNER_DOCUMENT = 'token_owner_document',
  CHOOSE_ROLE_USER_ROLE = 'choose_role_user_role',
  ASSIGN_DEVICE_TO_SITE = 'assign_device_to_site',
  AGGREGATE_CO2EMISSION = 'aggregate_co2Emission',
  VP_GRID_DATA = 'vp_grid_data',
  VP_GRID_PAGER = 'vp_grid_pager',
  VP_GRID = 'vp_grid',
  TRUST_CHAIN_REPORT = 'trustchain_report',
  MRV_SPLIT = 'mrv_split',
}
