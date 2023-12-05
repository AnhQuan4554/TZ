import type { Meta, Story } from '@storybook/react';
import type { GridColDef } from '@mui/x-data-grid';
import { CommonTable, ITableProps } from './CommonTable';
import { CustomizedCard, ICardProps } from './styles/VerificationStyle';

export default {
  title: 'components/Table',
  // component: CommonTable,
} as Meta<ITableProps>;

//========================Common Table===============================
const columns: GridColDef[] = [
  {
    field: 'energyValue',
    headerName: 'Energy Value (kWh)',
    headerAlign: 'center',
    type: 'number',
    flex: 100,
    align: 'center',
    renderCell: (params: any) => (params.energyValue ? params.energyValue.toFixed(5) : 0),
  },
  {
    field: 'CO2eqEmissions',
    headerName: 'CO2 Produced (t)',
    headerAlign: 'center',
    type: 'number',
    flex: 100,
    align: 'center',
    renderCell: (params: any) => (params.CO2eqEmissions ? params.CO2eqEmissions.toFixed(5) : 0),
  },
  {
    field: 'value',
    headerName: 'H2 Produced (t)',
    headerAlign: 'center',
    flex: 100,
    type: 'number',
    align: 'center',
    renderCell: (params: any) => (params.value ? params.value.toFixed(5) : 0),
  },
  {
    field: 'intervalStartDateTime',
    headerName: 'Interval Start Date Time',
    headerAlign: 'center',
    type: 'dateTime',
    flex: 150,
    align: 'center',
  },
  {
    field: 'intervalEndDateTime',
    headerName: 'Interval End Date Time',
    headerAlign: 'center',
    type: 'dateTime',
    flex: 150,
    align: 'center',
  },
  {
    field: 'intervalDuration',
    headerName: 'Interval Duration (s)',
    headerAlign: 'center',
    type: 'number',
    flex: 150,
    align: 'center',
  },
];

const data = [
  {
    CO2eqEmissions: 5.995902,
    CO2Emissions: 0,
    emissionsUOM: 't',
    intervalEndDateTime: '2022-09-29T08:00:00.000Z',
    intervalStartDateTime: '2022-09-29T07:55:00.000Z',
    intervalDuration: 300,
    intervalDurationUOM: 's',
    value: 14,
    valueUOM: 't',
    CO2eqEmissionsReduction: 4.64,
    emissionsReductionUOM: 't',
    otherMRVData:
      '{"hismelt-gas-emission-carbon":17640.798952210214,"hismelt-input-biochar-carbon":-11710.665821655752,"hismelt-input-ironore-carbon":65.7689145839299,"hismelt-srv-output-pig_iron":14}',
  },
  {
    CO2eqEmissions: 7.138639,
    CO2Emissions: 0,
    emissionsUOM: 't',
    intervalEndDateTime: '2022-09-29T08:05:00.000Z',
    intervalStartDateTime: '2022-09-29T08:00:00.000Z',
    intervalDuration: 300,
    intervalDurationUOM: 's',
    value: 11.416667,
    valueUOM: 't',
    CO2eqEmissionsReduction: 4.61,
    emissionsReductionUOM: 't',
    otherMRVData:
      '{"hismelt-gas-emission-carbon":17067.779960707267,"hismelt-input-biochar-carbon":-10001.41353379248,"hismelt-input-ironore-carbon":72.2730052547112,"hismelt-srv-output-pig_iron":11.4166666667}',
  },
  {
    CO2eqEmissions: 7.055057,
    CO2Emissions: 0,
    emissionsUOM: 't',
    intervalEndDateTime: '2022-09-29T08:10:00.000Z',
    intervalStartDateTime: '2022-09-29T08:05:00.000Z',
    intervalDuration: 300,
    intervalDurationUOM: 's',
    value: 12.666667,
    valueUOM: 't',
    CO2eqEmissionsReduction: 4.093333,
    emissionsReductionUOM: 't',
    otherMRVData:
      '{"hismelt-gas-emission-carbon":17231.4996725442,"hismelt-input-biochar-carbon":-10246.038641402552,"hismelt-input-ironore-carbon":69.59580001800894,"hismelt-srv-output-pig_iron":12.6666666667}',
  },
  {
    CO2eqEmissions: 7.249814,
    CO2Emissions: 0,
    emissionsUOM: 't',
    intervalEndDateTime: '2022-09-29T08:15:00.000Z',
    intervalStartDateTime: '2022-09-29T08:10:00.000Z',
    intervalDuration: 300,
    intervalDurationUOM: 's',
    value: 12.916667,
    valueUOM: 't',
    CO2eqEmissionsReduction: 5.016667,
    emissionsReductionUOM: 't',
    otherMRVData:
      '{"hismelt-gas-emission-carbon":17681.72888015717,"hismelt-input-biochar-carbon":-10489.653357963702,"hismelt-input-ironore-carbon":57.73850704844029,"hismelt-srv-output-pig_iron":12.9166666667}',
  },
  {
    CO2eqEmissions: 7.337341,
    CO2Emissions: 0,
    emissionsUOM: 't',
    intervalEndDateTime: '2022-09-29T08:20:00.000Z',
    intervalStartDateTime: '2022-09-29T08:15:00.000Z',
    intervalDuration: 300,
    intervalDurationUOM: 's',
    value: 11.416667,
    valueUOM: 't',
    CO2eqEmissionsReduction: 4.41,
    emissionsReductionUOM: 't',
    otherMRVData:
      '{"hismelt-gas-emission-carbon":16658.480681090372,"hismelt-input-biochar-carbon":-9391.504103880314,"hismelt-input-ironore-carbon":70.36442281106872,"hismelt-srv-output-pig_iron":11.4166666667}',
  },
  {
    CO2eqEmissions: 8.840741,
    CO2Emissions: 0,
    emissionsUOM: 't',
    intervalEndDateTime: '2022-09-29T08:25:00.000Z',
    intervalStartDateTime: '2022-09-29T08:20:00.000Z',
    intervalDuration: 300,
    intervalDurationUOM: 's',
    value: 12.75,
    valueUOM: 't',
    CO2eqEmissionsReduction: 4.956667,
    emissionsReductionUOM: 't',
    otherMRVData:
      '{"hismelt-gas-emission-carbon":16822.200392927305,"hismelt-input-biochar-carbon":-8050.286223925052,"hismelt-input-ironore-carbon":68.82719735075764,"hismelt-srv-output-pig_iron":12.75}',
  },
  {
    CO2eqEmissions: 6.270486,
    CO2Emissions: 0,
    emissionsUOM: 't',
    intervalEndDateTime: '2022-09-29T08:30:00.000Z',
    intervalStartDateTime: '2022-09-29T08:25:00.000Z',
    intervalDuration: 300,
    intervalDurationUOM: 's',
    value: 11.083333,
    valueUOM: 't',
    CO2eqEmissionsReduction: 4.356667,
    emissionsReductionUOM: 't',
    otherMRVData:
      '{"hismelt-gas-emission-carbon":15471.512770137522,"hismelt-input-biochar-carbon":-9271.385612142818,"hismelt-input-ironore-carbon":70.35872064172229,"hismelt-srv-output-pig_iron":11.0833333333}',
  },
  {
    CO2eqEmissions: 5.911126,
    CO2Emissions: 0,
    emissionsUOM: 't',
    intervalEndDateTime: '2022-09-29T08:35:00.000Z',
    intervalStartDateTime: '2022-09-29T08:30:00.000Z',
    intervalDuration: 300,
    intervalDurationUOM: 's',
    value: 13.416667,
    valueUOM: 't',
    CO2eqEmissionsReduction: 5.196667,
    emissionsReductionUOM: 't',
    otherMRVData:
      '{"hismelt-gas-emission-carbon":16822.200392927305,"hismelt-input-biochar-carbon":-10981.431691664171,"hismelt-input-ironore-carbon":70.35756200783133,"hismelt-srv-output-pig_iron":13.4166666667}',
  },
  {
    CO2eqEmissions: 7.540232,
    CO2Emissions: 0,
    emissionsUOM: 't',
    intervalEndDateTime: '2022-09-29T08:40:00.000Z',
    intervalStartDateTime: '2022-09-29T08:35:00.000Z',
    intervalDuration: 300,
    intervalDurationUOM: 's',
    value: 13.916667,
    valueUOM: 't',
    CO2eqEmissionsReduction: 4.776667,
    emissionsReductionUOM: 't',
    otherMRVData:
      '{"hismelt-gas-emission-carbon":17354.28945643418,"hismelt-input-biochar-carbon":-9883.267271300623,"hismelt-input-ironore-carbon":69.20999837660966,"hismelt-srv-output-pig_iron":13.9166666667}',
  },
];

const TableTemplate: Story<ITableProps> = (args) => <CommonTable {...args} />;

export const TablePrimary = TableTemplate.bind({});
TablePrimary.args = {
  stickyHeader: true,
  columns,
  data,
  hideFooter: false,
  customHeadStyle: {
    border: 'none',
    background: '#A8D973',
  },
  customCellStyle: {
    border: 'none',
  },
  page: 0,
  pageSize: 10,
  count: 25,
};
TablePrimary.storyName = 'Common Table';

//========================Customized Card===============================

const CustomizedCardTemplate: Story<ICardProps> = (args) => <CustomizedCard {...args} />;

export const CustomizedCardPrimary = CustomizedCardTemplate.bind({});
CustomizedCardPrimary.args = {
  title: 'Energy Value',
  uom: 'kWh',
  value: 1000,
};
CustomizedCardPrimary.storyName = 'Customized Card';
