import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from '@mui/material';
import { exportData } from '../../api/usePostForm';
import { commonStyle } from '../../styles/CommonStyle';

const dataList = [
  'User Management',
  'Root Authority',
  'Token Owner',
  'Guardian Policy',
  'Project',
  'Guardian Site',
  'Installer',
  'Device',
  'Site',
  'Meter',
  'Tenancy',
  'Meter Job',
];

export function ExportForm() {
  const classes = commonStyle();
  const [checked, setChecked] = React.useState(
    dataList.map((_, index) => index),
  );

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const onExport = async () => {
    const dataExport: string[] = checked.map((x) => dataList[x]);
    exportData(dataExport);
  };

  return (
    <form>
      <DialogTitle> Export Data</DialogTitle>
      <DialogContent sx={{ width: '100%' }}>
        <List dense sx={{ bgcolor: 'background.paper' }}>
          {dataList.map((value, index) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <>
                <ListItem
                  key={index}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(index)}
                      checked={checked.indexOf(index) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemText id={labelId} primary={`${value}`} />
                  </ListItemButton>
                </ListItem>
                <Divider component="li" />
              </>
            );
          })}
        </List>

        <DialogActions>
          <Button
            className={classes.actionBtn}
            size="large"
            variant="contained"
            color="primary"
            onClick={onExport}
          >
            Export
          </Button>
        </DialogActions>
      </DialogContent>
    </form>
  );
}
