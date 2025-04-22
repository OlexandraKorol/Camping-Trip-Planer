import { Tabs, Tab, AppBar, Toolbar, Box, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { doSignOut } from "../services/auth";
import { useAuth } from "../context/AuthContext";

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

  const handleLogOut = () => {
    doSignOut();
    setIsUserLoggedIn(false)
  }

  return (
    <AppBar position="static" color="default" component="nav">
      <Toolbar sx={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Box>
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
        <Button onClick={handleLogOut} type="button" variant="text" color="primary">log out</Button>
      </Toolbar>
    </AppBar>
  );
};
