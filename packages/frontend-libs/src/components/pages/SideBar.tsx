import { List, ListItemIcon, ListItemButton, Tooltip, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import type { ISideBarItem } from '@tymlez/platform-api-interfaces';
import { useAuth } from '../../contexts';
import { useBreakpoint } from '../../hooks/media/useBreakpointsQuery';
import { StyledListItem, StyledListItemText } from './styled-components';

interface SideBarProps {
  open?: boolean;
  items: ISideBarItem[];
}

export const SideBar: React.FC<SideBarProps> = ({ open, items }) => {
  const isSmallScreen = useBreakpoint('sm', 'down');
  const router = useRouter();

  const currentPage = router.pathname.includes('guardian')
    ? items.find((x) => x.path.includes('guardian'))
    : items.find((x) => x.path === router.pathname && !x.isAbsolute);

  const { user } = useAuth();

  const itemsWithPermission = items.filter((item) =>
    item.permissions.some((permission) => user?.permissions?.includes(permission))
  );

  return (
    <List sx={{ width: '100%' }}>
      {itemsWithPermission.map((item) => (
        <Grid key={item.tabName} sx={{ display: 'flex', alignItems: 'center' }}>
          <StyledListItem
            disablePadding
            sx={{
              ml: { xs: 0, sm: 'none' },
              width: { xs: 205, sm: 667 },
            }}
            onClick={() => {
              if (item.isAbsolute) {
                document.location.href = window.origin + item.path;
              } else {
                router.push(item.path);
              }
            }}
            selected={currentPage?.tabName === item.tabName}
          >
            <Tooltip title={item.tabName} enterDelay={open ? 60000 : 0} disableTouchListener>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: { xs: 0, sm: '2.5px' },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {currentPage?.tabName === item.tabName ? item.activeIcon : item.icon}
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
            {!isSmallScreen && <StyledListItemText primary={item.tabName} />}
          </StyledListItem>
        </Grid>
      ))}
    </List>
  );
};
