

import React, { useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EventUploadPage from '../../pages/EventUploadPage';
import obviedo from '../../assets/logo.png'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Outlet } from 'react-router-dom';


import { pages } from '../../utils/constants';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showEventUpload, setShowEventUpload] = useState(false);
  // const [activeTab, setActiveTab] = useState('Overview');
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
     {showEventUpload ? (
        <EventUploadPage setShowEventUpload={setShowEventUpload} />
      ) : (
        <></>
      )}
    <AppBar position="static" sx={{ bgcolor: 'white', height: '88px', justifyContent: 'center', padding: '24px 50px', zIndex: -1 }}>
      <Toolbar sx={{ maxWidth: '1440px', width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box
            sx={{
              width: "88.85px",
              height: "30px",
            }}
          >
            <img src={obviedo} />
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', justifyItems: 'center', alignItems: 'center', gap: '40px' }}>
        {pages.map((page, index) => (
            <Link
              to={page.path}
              key={index}
              style={{
                textDecoration: "none",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <span style={{ color: page.icon === "active" ? "#830000" : "#000000" }}>
                {page.icon}
              </span>
              <span style={{ color: page.name === "active" ? "#830000" : "#000000" }}>
                {page.name}
              </span>
            </Link>
          ))}
        </Box>

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Upload Event Button */}
          <Button onClick={() => setShowEventUpload(true)} sx={{ textTransform: 'none', bgcolor: '#830000', color: 'white', borderRadius: "9px", fontSize: '16px', padding: "8px 20px" }}>
           <AddOutlinedIcon sx={{ fontSize:'15px'}}/> Create
          </Button>

          {/* Notifications Icon */}
          <IconButton>
            <NotificationsIcon sx={{ color: '#830000' }} />
          </IconButton>

          {/* User Profile */}
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Avatar sx={{ bgcolor: '#830000' }}>F</Avatar>
            <Typography sx={{ marginLeft: 1, color: 'black' }}>Florence Aina</Typography>
            <IconButton onClick={handleMenuOpen}>
              <ArrowDropDownIcon />
            </IconButton>
          </Box>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
    {/* <Box sx={{ padding: "16px" }}>
        <Outlet />
    </Box> */}
    </>
  );
};

export default Navbar;

