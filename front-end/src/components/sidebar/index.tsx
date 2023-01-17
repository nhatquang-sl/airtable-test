import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { sidebarWidth } from 'store/constants';
import { RootState } from 'store';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function Sidebar() {
  const sideBarOpen = useSelector((state: RootState) => state.settings.sideBarOpen);

  return (
    <Drawer
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={sideBarOpen}
    >
      <DrawerHeader></DrawerHeader>
      <Divider />
      <Divider />
      <List>
        {[
          { label: 'Models', path: '/' },
          { label: 'Drawings', path: '/drawings' },
          { label: 'Services', path: '/services' },
        ].map((route) => (
          <ListItem key={route.label} disablePadding button component={Link} to={route.path}>
            <ListItemButton>
              <ListItemText primary={route.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
