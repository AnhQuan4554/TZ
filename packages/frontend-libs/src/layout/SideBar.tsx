import { useRouter } from 'next/router';
import { List, ListItemIcon, ListItemButton, ListItem, ListItemText, Tooltip } from '@mui/material';
import { layoutStyle } from './styled-components';
import { Loading } from '../components/loading';

interface SideBarProps {
  data: any;
  open?: boolean;
}

export const SideBar: React.FC<SideBarProps> = ({ data, open }) => {
  const tabList = data;
  const router = useRouter();
  if (!router) {
    return <Loading />;
  }

  const tab = router.pathname.includes('guardian')
    ? tabList.find((x: any) => x.path.includes('guardian'))
    : tabList.find((x: any) => x.path === router.pathname);

  const classes = layoutStyle();

  return (
    <List>
      {tabList.map((item: any) => (
        <ListItem
          key={item.tabName}
          disablePadding
          className={open ? classes.sidebarOpen : classes.sidebarClose}
          sx={{}}
          onClick={() => {
            router.push(item.path);
          }}
          selected={tab?.tabName === item.tabName}
        >
          <Tooltip title={item.tabName} enterDelay={open ? 60000 : 0}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {tab?.tabName === item.tabName ? item.icon('#92D050') : item.icon()}
              </ListItemIcon>
              <ListItemText primary={item.tabName} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Tooltip>
        </ListItem>
      ))}
    </List>
  );
};
