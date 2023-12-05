import { Dialog, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import type { FC } from 'react';
import { AlignItemsCenterGrid } from '../../common/styled-components';
import {
  StyledMetricLineGrid,
  StyledModalEnergyGrid,
  StyledModalSubTitleGrid,
  StyledModalTitle,
  StyledTimeLineDialog,
  StyledTitleEnergyGrid,
  StyledValueEnergyGrid,
} from '../styled-components';
import { capitalizeFirstLetter } from '../../../utils/ConvertText';

interface IDialogDataProps {
  open: boolean;
  data: any;
  mrvIconsList: any;
  handleOpenDialog: (status: boolean) => void;
}

const getUOM: Record<string, string> = {
  electricity: 'kWh',
  water: 'L/h',
  solar: 'kWh',
  hydrogen: 'kg',
  reduction: 'kg',
  panel: 'panels',
  CO2eq: 'kg',
  'Pig Iron': 't',
  Grid: 'kWh',
};

const MrvDataDialog: FC<IDialogDataProps> = ({ open, data, mrvIconsList, handleOpenDialog }) => {
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleOpenDialog(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {data && (
        <>
          <DialogTitle id="alert-dialog-title">MRV Data</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Grid container>
                {Object.keys(data).map((key) => {
                  return (
                    <StyledTimeLineDialog key={`category-${key}`} container>
                      <AlignItemsCenterGrid xs={12} item sx={{ width: 'max-content' }}>
                        {data[key].length > 0 && (
                          <>
                            {Object.keys(mrvIconsList).length > 0 && (
                              <img
                                src={mrvIconsList[key]?.icon}
                                alt="category-icon"
                                style={{
                                  color: '#4a4f52',
                                }}
                              />
                            )}

                            <StyledModalTitle>{capitalizeFirstLetter(key)}</StyledModalTitle>
                          </>
                        )}
                      </AlignItemsCenterGrid>
                      {data[key].map((item: any) => {
                        return (
                          <Grid key={`device-${item.key}`} container sx={{ px: 2, my: 1 }}>
                            <StyledModalSubTitleGrid item xs={12}>
                              {capitalizeFirstLetter(item.key, '_')}
                            </StyledModalSubTitleGrid>
                            <StyledModalEnergyGrid
                              item
                              xs={12}
                              sx={{
                                borderLeft: `4px solid ${mrvIconsList[key]?.color}`,
                              }}
                            >
                              {Object.keys(item.data).map((itemKey) => {
                                return (
                                  <StyledMetricLineGrid item key={`metric-${itemKey}`} xs={12}>
                                    <StyledTitleEnergyGrid item xs={4}>
                                      {capitalizeFirstLetter(itemKey)}
                                    </StyledTitleEnergyGrid>
                                    <StyledValueEnergyGrid item xs={8}>
                                      {item.data[itemKey]} {getUOM[itemKey]}
                                    </StyledValueEnergyGrid>
                                  </StyledMetricLineGrid>
                                );
                              })}
                            </StyledModalEnergyGrid>
                          </Grid>
                        );
                      })}
                    </StyledTimeLineDialog>
                  );
                })}
              </Grid>
            </DialogContentText>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default MrvDataDialog;
