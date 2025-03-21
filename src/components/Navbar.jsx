import { AppBar, Box, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MenuIcon from "@mui/icons-material/Menu"

export const Navbar = ({user,setuser}) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const openDrawer = () => {
        setDrawerOpen(true);
    };
    
      const closeDrawer = () => {
        setDrawerOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("userId");
        setuser(null);
        navigate("/");
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Mock Interviews
            </Typography>

            <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Stack direction="row" spacing={2}>
                <Button variant="outlined" color="inherit" component={Link} to="/matching">
                    Find Peer
                </Button>
                {user ? (
                    <Button variant="outlined" onClick={handleLogout}>Logout</Button>
                ) : (
                    <Button variant="outlined" color="inherit" component={Link} to="/login">
                    Login
                    </Button>
                )}
                </Stack>
            </Box>

            <Box sx={{ display: { xs: "block", md: "none" } }}>
                <IconButton edge="end" color="inherit" onClick={openDrawer}>
                <MenuIcon />
                </IconButton>
            </Box>
            </Toolbar>
        </AppBar>

        <Drawer anchor="left" open={drawerOpen} onClose={closeDrawer}>
            <Box sx={{ width: 250 }} role="presentation" onClick={closeDrawer} onKeyDown={closeDrawer}>
            <List>
                <ListItem disablePadding>
                <ListItemButton component={Link} to="/">
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                <ListItemButton component={Link} to="/matching">
                    <ListItemText primary="Find Peer" />
                </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                </ListItem>
                {user ? (
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                    <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
                ) : (
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/login">
                    <ListItemText primary="Login" />
                    </ListItemButton>
                </ListItem>
                )}
            </List>
            </Box>
        </Drawer>
    </Box>
  )
}



