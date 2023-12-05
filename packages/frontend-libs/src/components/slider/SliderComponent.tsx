import React, { FC } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Grid } from '@mui/material';

import { LineChart } from '../charts/LineChart';
import { TrendPercent } from '../trend';
import { Loading } from '../loading';
import {
  StyledSliderGrid,
  StyledSliderIconPaper,
  StyledSliderMobileGrid,
  StyledSliderValueTypography,
} from './styled-components';
import { JustifySpaceBetweenBox } from '../common/styled-components';

export interface ISliderProps {
  steps: {
    icon: string;
    label: string;
    total: number;
    unit: string;
    value: number;
    preValue: number;
    lineChart: {
      series: any;
      color: string;
      width?: number;
      height?: number;
    };
  }[];
  dataTestId?: string;
}

export const SliderComponent: FC<ISliderProps> = ({ steps, dataTestId }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  if (steps.length) {
    return (
      <Box sx={{ flexGrow: 1 }} data-test-id={dataTestId}>
        <Grid sx={{ textAlign: 'end' }}>
          <Button
            size="small"
            sx={{ minWidth: 'unset' }}
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </Button>
          <Button
            size="small"
            sx={{ minWidth: 'unset' }}
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        </Grid>
        <StyledSliderGrid>
          <StyledSliderIconPaper square elevation={0}>
            <img src={steps[activeStep].icon} alt="icon-task" />
            <Typography sx={{ ml: 3 }}>{steps[activeStep].label}</Typography>
          </StyledSliderIconPaper>
          <Box sx={{ width: '100%' }}>
            <LineChart
              data={steps[activeStep].lineChart.series}
              color={steps[activeStep].lineChart.color}
              height={steps[activeStep].lineChart.height}
              width={steps[activeStep].lineChart.width}
            />
          </Box>
          <JustifySpaceBetweenBox>
            <Grid>
              <StyledSliderValueTypography>
                {steps[activeStep].total} {steps[activeStep].unit}
              </StyledSliderValueTypography>
            </Grid>
            <TrendPercent value={steps[activeStep].value} preValue={steps[activeStep].preValue} />
          </JustifySpaceBetweenBox>
        </StyledSliderGrid>
        <StyledSliderMobileGrid>
          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              </Button>
            }
          />
        </StyledSliderMobileGrid>
      </Box>
    );
  }

  return <Loading />;
};
