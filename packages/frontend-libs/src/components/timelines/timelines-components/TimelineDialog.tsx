import { Dialog, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import type { FC } from 'react';
import { StyledTimeLineDialog } from '../styled-components';

interface IDialogDataProps {
  open: boolean;
  data: any;
  handleOpenDialog: (status: boolean) => void;
}

const TokenTimelineDetailsDialog: FC<IDialogDataProps> = ({ open, data, handleOpenDialog }) => {
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
          <DialogTitle id="alert-dialog-title">{data.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Grid container>
                {Object.keys(data).map((key) => {
                  return (
                    <StyledTimeLineDialog key={`item-${key}`} container>
                      <Grid item sx={{ width: 'max-content' }}>
                        <b>{key} : </b>
                      </Grid>
                      <Grid item sx={{ wordBreak: 'break-all', pl: 1 }}>
                        {' '}
                        {JSON.stringify(data[key])}
                      </Grid>
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

export default TokenTimelineDetailsDialog;
