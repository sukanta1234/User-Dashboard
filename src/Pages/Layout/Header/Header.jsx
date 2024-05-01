import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogOut } from '../../../Toolkit/authSlice';



const drawerWidth = 240;
const navItems = ['Product', 'Contact'];

export default function Header(props) {
  const dispatch=useDispatch()
  const data=useSelector((state)=>state.auth)
  const hello=()=>{
    dispatch(handleLogOut())
  }
  // console.log(data.isLoggedIn,"islogggedin");
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        User Dashboard
      </Typography>
      <Divider />
      <List>
        <ListItem component={Link} to={`/Home`} sx={{ justifyContent: 'center' }}>
          Home
        </ListItem>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding component={Link} to={`/${item}`}>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        {data.isLoggedIn?(<>
              <ListItem component={Link} to="/" onClick={hello} sx={{ justifyContent: 'center' }}>
                LogOut
              </ListItem></>):(<>
                <ListItem component={Link} to="/" sx={{ justifyContent: 'center' }}>
                Login
              </ListItem>
              </>)}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            User Dashboard
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button sx={{ color: '#fff' }} component={Link} to="/home">
                Home
              </Button>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }} component={Link} to={`/${item}`}>
                {item}
              </Button>
            ))}
            {data.isLoggedIn?(<>
              <Button sx={{ color: '#fff' }} component={Link} to="/" onClick={hello}>
                LogOut
              </Button></>):(<>
                <Button sx={{ color: '#fff' }} component={Link} to="/">
                Login
              </Button>
              </>)}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main">
        <Toolbar />
        
      </Box>
    </Box>
  );
}