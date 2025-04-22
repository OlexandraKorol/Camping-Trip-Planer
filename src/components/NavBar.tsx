import { Tabs, Tab, AppBar, Toolbar, Box, Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import { doSignOut } from "../services/auth";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const tabs = [
  { label: "Trip Planning", path: "/" },
  { label: "Packing Checklist", path: "/packing-checklist" },
  { label: "Weather", path: "/weather" },
  { label: "Budget", path: "/budget" },
];

export const NavBar = () => {
  const location = useLocation();
  const { setIsUserLoggedIn } = useAuth();
  const currentTab = tabs.findIndex(tab => tab.path === location.pathname);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogOut = () => {
    doSignOut();
    setIsUserLoggedIn(false);
  };

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <AppBar position="static" color="default" component="nav">
      <Toolbar sx={{ justifyContent: "space-between", flexDirection: "row" }}>
        <IconButton
          edge="start"
          color="primary"
          aria-label="menu"
          sx={{ display: { xs: "block", md: "none" } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {tabs.map((tab, index) => (
                <ListItem key={index} component={Link} to={tab.path} color="primary">
                  <ListItemText primary={tab.label} disableTypography={true} sx={{ color: "text.secondary", fontSize: "h6", mb: 1.5 }}/>
                </ListItem>
              ))}
              <ListItem component="button" onClick={handleLogOut}>
                <ListItemText primary="Log out" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Tabs
            value={currentTab !== -1 ? currentTab : false}
            textColor="primary"
            indicatorColor="primary"
            aria-label="Navigation Tabs"
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                component={Link}
                to={tab.path}
              />
            ))}
          </Tabs>
        </Box>


        <Button
          onClick={handleLogOut}
          type="button"
          variant="text"
          color="primary"
          sx={{ display: { xs: "none", md: "block" } }} 
        >
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
};