import {
  List,
  ListItem,
  Button,
  ListItemText,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
  Grid,
} from '@mui/material';
import * as React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PreviewIcon from '@mui/icons-material/Preview';
import toast from 'react-hot-toast';

interface IObjectViewerProps {
  data: Object | string | undefined;
  mode?: 'inline' | 'dialog';
  ident?: number;
  rootKey?: string;
  allowCopy?: boolean;
}
function renderPropItem(key: string, value: any, parentKey = '', ident = 0) {
  if (typeof value === 'object') {
    return (
      <Grid
        key={`${parentKey}-${key}`}
        style={{ borderLeft: '1.5px dashed #ccc', paddingLeft: '8px' }}
      >
        <h3 style={{ color: '#92d050' }}>{key}</h3>
        <ObjectViewer
          data={value}
          ident={ident + 1}
          rootKey={parentKey + key}
          allowCopy={false}
        />
      </Grid>
    );
  }

  return (
    <ListItem
      style={{ borderLeft: '1.5px dashed #ccc', paddingLeft: '8px' }}
      key={`${parentKey}-${key}`}
    >
      <ListItemText
        disableTypography
        primary={
          <Typography variant="subtitle1" style={{ color: '#92d050' }}>
            {key}
          </Typography>
        }
        secondary={<Typography variant="subtitle1">{value}</Typography>}
      />
    </ListItem>
  );
}

export function ObjectViewer({
  data,
  ident = 0,
  rootKey = 'root',
  allowCopy = true,
  mode = 'inline',
}: IObjectViewerProps) {
  const [dialogData, setDialogData] = React.useState(null);
  let obj = data;
  if (typeof data === 'string') {
    try {
      obj = JSON.parse(data);
    } catch (e) {
      return <span>{data}</span>;
    }
  }

  const listProps = Object.entries(obj || {});
  if (listProps.length === 0) {
    return <span />;
  }

  return (
    <Box>
      {allowCopy && (
        <Button
          startIcon={<ContentCopyIcon />}
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(data, null, 4));
            toast.success('Content copied');
          }}
        >
          Copy
        </Button>
      )}
      {mode === 'dialog' && (
        <Button
          startIcon={<PreviewIcon />}
          onClick={() => {
            setDialogData(obj as any);
          }}
        >
          View
        </Button>
      )}
      <Box sx={{ ml: `${ident * 15}px` }}>
        {dialogData && (
          <Dialog open fullWidth maxWidth="xl">
            <DialogTitle id="alert-dialog-title" />
            <DialogContent>
              <List>
                {Object.entries(dialogData).map(([key, value]) =>
                  renderPropItem(key, value, rootKey, ident),
                )}
              </List>
            </DialogContent>
            <DialogActions>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(dialogData));
                  toast.success('Content copied');
                }}
              >
                Copy
              </Button>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => {
                  setDialogData(null);
                }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
        {mode === 'inline' && (
          <List>
            {listProps.map(([key, value]) =>
              renderPropItem(key, value, rootKey, ident),
            )}
          </List>
        )}
      </Box>
    </Box>
  );
}
