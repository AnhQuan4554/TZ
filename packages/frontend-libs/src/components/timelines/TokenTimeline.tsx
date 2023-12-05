/* eslint-disable react/no-array-index-key */
import type { FC } from 'react';
import { Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Timeline from '@mui/lab/Timeline';
import TimelineLeft from './timelines-components/TimelineLeft';
import TimelineRight from './timelines-components/TimelineRight';
import TimelineCenter from './timelines-components/TimelineCenter';
import {
  StyledAccordionSummaryRoot,
  StyledTimeCacbonMassItem,
  StyledTotalTokenGrid,
  StyledViewMoreOfDateItem,
} from './styled-components';
import DividerComponent from './timelines-components/DividerComponent';
import { useBreakpoint } from '../../hooks/media/useBreakpointsQuery';

export interface ITokenTimelineProps {
  data: any;
  dataTestId?: string;
}

export const TokenTimeline: FC<ITokenTimelineProps> = ({ data, dataTestId }) => {
  const isSmallScreen = useBreakpoint('sm', 'down');
  return (
    <Accordion expanded data-test-id={dataTestId}>
      <StyledAccordionSummaryRoot aria-controls="panel1a-content" id="panel1a-header" />
      <AccordionDetails>
        {data &&
          data.data.map((item: any, index: number) => {
            return (
              <Accordion
                key={`item-${index}`}
                sx={{
                  '&.Mui-expanded': {
                    m: 0,
                  },
                  '& .MuiAccordionSummary-content.Mui-expanded': {
                    my: 2,
                  },
                  '& .MuiAccordionSummary-content > div': {
                    display: 'contents',
                  },
                  '& .MuiAccordionSummary-expandIconWrapper': {
                    mt: 2,
                  },
                }}
              >
                {item.type !== 'external' && (
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ background: '#F4F5F7', border: '1px solid #F2F2F2' }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={0} sm={0} md={4} />
                      <Grid item sm={6} md={4}>
                        <StyledTimeCacbonMassItem>{item.device}</StyledTimeCacbonMassItem>
                      </Grid>
                      {!isSmallScreen && (
                        <Grid item sm={6} md={4}>
                          <StyledViewMoreOfDateItem>View More</StyledViewMoreOfDateItem>
                        </Grid>
                      )}
                    </Grid>
                  </AccordionSummary>
                )}

                <AccordionDetails>
                  <Timeline position="alternate">
                    <Grid container sx={{ justifyContent: 'center' }}>
                      <Grid item xs={12}>
                        <Grid item xs={12} sx={{ height: '48px' }}>
                          <DividerComponent />
                        </Grid>
                        {item.data.map((detailData: any, dataIndex: number) => {
                          if (isSmallScreen) {
                            return (
                              <TimelineCenter
                                data={detailData}
                                key={`timeline-center-${dataIndex}`}
                              />
                            );
                          }
                          if (detailData.position === 'left') {
                            return (
                              <TimelineLeft data={detailData} key={`timeline-left-${dataIndex}`} />
                            );
                          }
                          if (detailData.position === 'right') {
                            return (
                              <TimelineRight
                                data={detailData}
                                key={`timeline-right-${dataIndex}`}
                              />
                            );
                          }
                          return (
                            <TimelineCenter
                              data={detailData}
                              key={`timeline-center-default-${dataIndex}`}
                            />
                          );
                        })}
                        <Grid item xs={12} sx={{ height: 48 }}>
                          <DividerComponent />
                        </Grid>
                        {index === data.data.length - 1 && (
                          <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <img src={data.mintedToken.icon} alt="settingicon" />
                            <StyledTotalTokenGrid>
                              {data.mintedToken.amount} {data.mintedToken.uom}{' '}
                              {data.mintedToken.name}
                            </StyledTotalTokenGrid>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Timeline>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </AccordionDetails>
    </Accordion>
  );
};
