import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: 'Home', to: '/' },
    { label: 'CEDMO Trends', to: '/trends' },
    { label: 'CEDMO Index', to: '/index' },
    { label: 'CEDMO Tracking', to: '/tracking' },
    { label: 'About Us', to: '/about' },
    { label: 'Publications', to: '/publications' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: '#1b1c3a' }}>
        <Toolbar disableGutters>
          <Box
            sx={{
              width: '100%',
              maxWidth: 1200,
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: { xs: 2, md: 0 },
            }}
          >
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={Logo} alt="CEDMO Logo" style={{ height: 40 }} />
            </Box>

            {/* Desktop menu */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                {menuItems.map(({ label, to }) => {
                  const isActive = location.pathname === to;

                  return (
                    <Button
                      key={label}
                      component={Link}
                      to={to}
                      sx={{
                        color: isActive ? '#ffcd06' : '#e5e5e5',
                        borderRadius: 0,
                        fontWeight: isActive ? 'bold' : 'normal',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: '#ffcd06',
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      {label}
                    </Button>
                  );
                })}
              </Box>
            )}

            {/* Mobile menu */}
            {isMobile && (
              <>
                <IconButton
                  edge="end"
                  onClick={handleMenuOpen}
                  aria-controls="nav-menu"
                  aria-haspopup="true"
                  aria-label="menu"
                  sx={{
                    color: '#e5e5e5',
                    '&:hover': { color: '#ffcd06' },
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="nav-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  {menuItems.map(({ label, to }) => (
                    <MenuItem
                      key={label}
                      component={Link}
                      to={to}
                      onClick={handleMenuClose}
                      sx={{
                        color: location.pathname === to ? '#ffcd06' : '#1b1c3a',
                        fontWeight: location.pathname === to ? 'bold' : 'normal',
                        '&:hover': {
                          backgroundColor: '#ffcd06',
                          color: '#1b1c3a',
                        },
                      }}
                    >
                      {label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <AppBar position="static" sx={{ bgcolor: '#ffcd06', height: '8px' }} elevation={0} />
    </Box>
  );
};

export default Navbar;