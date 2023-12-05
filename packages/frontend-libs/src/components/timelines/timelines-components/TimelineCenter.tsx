import { FC, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatNumber } from '@tymlez/common-libs';
import {
  StyledAccordionSummaryReading,
  StyledActionButtonGrid,
  StyledCategoryTimelineTitle,
  StyledLaunchIconStyle,
  StyledMeterReadingLabel,
  StyledParameterDevicesGrid,
  StyledParameterTimeline,
  StyledParameterTimelineValue,
  StyledSubIconGrid,
  StyledTimelineContentGrid,
  StyledTimelineTitle,
  StyledViewMeterTypography,
} from '../styled-components';
import TokenTimelineDetailsDialog from './TimelineDialog';
import DividerComponent from './DividerComponent';
import { IconCenterTimeLine } from './IconCenterTimeLine';
import MrvDataDialog from './MrvDataDialog';
import { capitalizeFirstLetter } from '../../../utils/ConvertText';
import GoogleMaps from '../map-components/MapComponent';

const ItemTextDevice = styled('div')(() => ({
  color: '#75A640',
  marginRight: '5px',
  fontSize: '16px',
  fontWeight: '500',
  textAlign: 'end',
}));

interface Props {
  data: any;
}

const convertStringToJson = (value: any) => {
  let newValue = value;

  if (typeof newValue === 'string') {
    newValue = JSON.parse(newValue);
    newValue = convertStringToJson(newValue);
  }

  return newValue;
};

const TimelineCenter: FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [meterReadingData, setMeterReadingData] = useState([]);
  const [mrvData, setMrvData] = useState<any>(null);
  const mrvIconsList = data.mrvIconsList ? data.mrvIconsList : [];
  const handleShowProductionMetrics = (mrvDataString: string) => {
    const mrvJson = convertStringToJson(mrvDataString);

    const result: any = {};
    Object.keys(mrvJson).map((key) => {
      let splitString = key.split('.');
      if (splitString.length === 1) {
        splitString = key.split('_');
      }
      const [device, category, metric]: any = splitString;
      // TODO: implement this properly, this code was hotfixing for release test
      const mappingCategory: { [k: string]: string } = {
        eRealPositiveKwh: 'input',
        'hismelt-gas-emission-carbon': 'carbon',
        'hismelt-srv-output-pig_iron': 'output',
        'hismelt-input-biochar-carbon': 'input',
        'hismelt-input-ironore-carbon': 'input',
      };

      const mappingMetric: { [k: string]: string } = {
        eRealPositiveKwh: 'electricity',
        'hismelt-gas-emission-carbon': 'CO2eq',
        'hismelt-input-biochar-carbon': 'CO2eq',
        'hismelt-input-ironore-carbon': 'CO2eq',
        'hismelt-srv-output-pig_iron': 'Pig Iron',
        'compression.input.electricity': 'Grid',
        'water_treatment.input.electricity': 'Grid',
        'electrolyser.input.electricity': 'Grid',
        'gas_purification.input.electricity': 'Grid',
      };

      const categoryAdjust = mappingCategory[key] || category || 'input';
      const metricAdjust = mappingMetric[key] || metric || 'electricity';

      const categoryExistingIndex = Object.keys(result).findIndex(
        (item: any) => item === categoryAdjust
      );

      if (categoryExistingIndex > -1) {
        const deviceExistingIndex = result[categoryAdjust].findIndex(
          (item: any) => item.key === device
        );

        if (deviceExistingIndex > -1) {
          result[category][deviceExistingIndex].data[metricAdjust] = mrvJson[key];
        } else {
          result[categoryAdjust].push({
            key: device,
            data: {
              [metricAdjust]: mrvJson[key],
            },
          });
        }
      } else {
        result[categoryAdjust] = [
          {
            key: device,
            data: {
              [metricAdjust]: mrvJson[key],
            },
          },
        ];
      }
      return result;
    });
    setMrvData(result);
  };

  return (
    <Grid container>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <IconCenterTimeLine data={data} />
      </Grid>
      <Grid item xs={12} sx={{ height: '24px' }}>
        <DividerComponent />
      </Grid>
      <StyledTimelineContentGrid container sx={{ borderTop: `10px solid ${data.color}` }}>
        {data.position === 'left' || data.position === 'right' ? (
          <Grid style={{ width: '100%' }}>
            <Grid item xs={12} style={{ lineHeight: '25px' }}>
              {data.category ? (
                <Grid>
                  <StyledCategoryTimelineTitle>{data.category}</StyledCategoryTimelineTitle>
                  <StyledTimelineTitle>{data.name}</StyledTimelineTitle>
                </Grid>
              ) : (
                <StyledCategoryTimelineTitle>{data.name}</StyledCategoryTimelineTitle>
              )}
              <Grid sx={{ display: 'flex' }}>
                <StyledParameterTimeline>Time : </StyledParameterTimeline>
                <StyledParameterTimelineValue> {data.time}</StyledParameterTimelineValue>
              </Grid>
              <Grid sx={{ display: 'flex' }}>
                <StyledParameterTimeline>Date : </StyledParameterTimeline>
                <StyledParameterTimelineValue> {data.date}</StyledParameterTimelineValue>
              </Grid>
              <Grid sx={{ display: 'flex' }}>
                <StyledParameterTimeline>Input : </StyledParameterTimeline>
                <StyledParameterTimelineValue> {data.input}</StyledParameterTimelineValue>
              </Grid>
              {data.misc &&
                Object.keys(data.misc).map((key) => {
                  if (data.misc[key] !== '') {
                    return (
                      <Grid key={`item-misc-${key}`} sx={{ wordBreak: 'break-word' }}>
                        <StyledParameterTimeline>
                          {capitalizeFirstLetter(key)} :{' '}
                        </StyledParameterTimeline>
                        <StyledParameterTimelineValue>
                          {data.misc[key]}
                        </StyledParameterTimelineValue>
                      </Grid>
                    );
                  }
                  /* eslint-disable */
                  return <></>;
                })}
            </Grid>
            <StyledSubIconGrid item xs={12}>
              <img
                src={data.subIcon}
                alt="settingicon"
                style={{
                  color: '#4a4f52',
                }}
              />
            </StyledSubIconGrid>
            <Grid item xs={12}>
              {data.misc.location && <GoogleMaps location={data.misc.location.split(/[\s,]+/)} />}
            </Grid>
          </Grid>
        ) : null}

        {data.position === 'center' && (
          <Grid style={{ width: '100%' }} container>
            <MrvDataDialog
              open={!!mrvData}
              data={mrvData}
              mrvIconsList={mrvIconsList}
              handleOpenDialog={() => {
                setMrvData(null);
              }}
            />
            <TokenTimelineDetailsDialog
              open={open}
              data={meterReadingData}
              handleOpenDialog={setOpen}
            />
            <Grid
              item
              xs={12}
              sm={9}
              md={9}
              lg={9}
              xl={9}
              style={{ lineHeight: '25px', width: '100%' }}
            >
              {data.category ? (
                <Grid>
                  <StyledCategoryTimelineTitle>{data.category}</StyledCategoryTimelineTitle>
                  <StyledTimelineTitle>Readings from {data.name}</StyledTimelineTitle>
                </Grid>
              ) : (
                <StyledCategoryTimelineTitle>Readings from {data.name}</StyledCategoryTimelineTitle>
              )}
              <Grid sx={{ mb: 2 }}>
                <StyledParameterTimeline>Date : </StyledParameterTimeline>
                <StyledParameterTimelineValue>
                  {data.meterReadings[0].issuanceDate.substring(0, 10)} &rarr;
                </StyledParameterTimelineValue>
                <StyledParameterTimelineValue>
                  {data.meterReadings[data.meterReadings.length - 1].issuanceDate.substring(0, 10)}
                </StyledParameterTimelineValue>
              </Grid>
            </Grid>
            <StyledSubIconGrid item xs={12} sm={3} md={3} lg={3} xl={3}>
              <img src={data.subIcon} alt="settingicon" />
            </StyledSubIconGrid>
            <Grid item xs={12}>
              <Accordion sx={{ boxShadow: 'none' }}>
                <StyledAccordionSummaryReading
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <StyledViewMeterTypography>View meter readings</StyledViewMeterTypography>
                </StyledAccordionSummaryReading>
                <AccordionDetails>
                  {data.meterReadings.map((meterReading: any) => {
                    let readingValue = 0;
                    let readingValueUOM = '';
                    let readingCO2eqEmissions = 0;
                    let readingEmissionsUOM = '';
                    let readingCO2eqEmissionsReduction = 0;
                    let readingOtherMRVData: any = null;
                    const credentialSubject =
                      meterReading.credentialSubject?.length > 0
                        ? meterReading.credentialSubject[0]
                        : null;

                    if (credentialSubject) {
                      readingValue = credentialSubject.value || 0;
                      readingValueUOM = credentialSubject.valueUOM;
                      readingOtherMRVData = credentialSubject.otherMRVData;
                      readingCO2eqEmissions = credentialSubject.CO2eqEmissions || 0;
                      readingEmissionsUOM = credentialSubject.emissionsUOM;
                      readingCO2eqEmissionsReduction =
                        credentialSubject.CO2eqEmissionsReduction || 0;
                    }

                    const totalEmissions = readingCO2eqEmissions - readingCO2eqEmissionsReduction;
                    return (
                      <Grid
                        key={`meter-readings-${meterReading.id}`}
                        container
                        spacing={0}
                        sx={{ mt: 3 }}
                      >
                        <Grid item sm={12} md={9}>
                          <Grid container spacing={0}>
                            <StyledParameterDevicesGrid
                              item
                              xs={12}
                              sm={12}
                              md={7}
                              sx={{ borderLeft: 'none !important', pr: 1 }}
                            >
                              <StyledMeterReadingLabel>Timestamp:</StyledMeterReadingLabel>
                              {meterReading.issuanceDate}
                            </StyledParameterDevicesGrid>
                            <StyledParameterDevicesGrid
                              item
                              xs={12}
                              sm={totalEmissions === 0 ? 12 : 6}
                              md={totalEmissions === 0 ? 5 : 3}
                            >
                              <StyledMeterReadingLabel>Reading:</StyledMeterReadingLabel>
                              {readingValue}
                              {readingValueUOM}
                            </StyledParameterDevicesGrid>
                            {totalEmissions !== 0 && (
                              <StyledParameterDevicesGrid item xs={12} sm={6} md={2}>
                                {formatNumber(totalEmissions, 6)}
                                {readingEmissionsUOM}
                              </StyledParameterDevicesGrid>
                            )}
                          </Grid>
                        </Grid>
                        <Grid item sm={12} md={3}>
                          <Grid container>
                            {readingOtherMRVData && (
                              <StyledActionButtonGrid
                                item
                                xs={12}
                                onClick={() => {
                                  handleShowProductionMetrics(readingOtherMRVData);
                                }}
                              >
                                <ItemTextDevice>Show Production Metrics</ItemTextDevice>
                                <StyledLaunchIconStyle />
                              </StyledActionButtonGrid>
                            )}
                            <StyledActionButtonGrid
                              item
                              xs={12}
                              onClick={() => {
                                setMeterReadingData(credentialSubject);
                                setOpen(true);
                              }}
                            >
                              <ItemTextDevice>Show detail</ItemTextDevice>
                              <StyledLaunchIconStyle />
                            </StyledActionButtonGrid>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        )}
      </StyledTimelineContentGrid>
      <Grid item xs={12} sx={{ height: '48px' }}>
        <DividerComponent />
      </Grid>
    </Grid>
  );
};

export default TimelineCenter;
