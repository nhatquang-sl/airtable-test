import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Slide, Toolbar, Typography } from '@mui/material';
import { sidebarWidth } from 'store/constants';
import { RootState } from 'store';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: any) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${sidebarWidth}px)`,
    marginLeft: `${sidebarWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function Header() {
  const navigate = useNavigate();

  const { sideBarOpen, headerOpen } = useSelector((state: RootState) => state.settings);

  return (
    <Slide in={headerOpen}>
      <AppBar position="fixed" open={sideBarOpen}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Application
          </Typography>
          <Typography sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </Slide>
  );
}

export default Header;
