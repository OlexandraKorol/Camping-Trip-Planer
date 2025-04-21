import { Tabs, Tab, AppBar, Toolbar, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const tabs = [
  { label: "Trip Planning", path: "/" },
  { label: "Packing Checklist", path: "/packing-checklist" },
  { label: "Weather", path: "/weather" },
  { label: "Budget", path: "/budget" },
];

export const NavBar = () => {
  const location = useLocation();
  const currentTab = tabs.findIndex(tab => tab.path === location.pathname);

  return (
    <AppBar position="static" color="default" component="nav">
      <Toolbar sx={{ justifyContent: "space-between" }}>
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
      </Toolbar>
    </AppBar>
  );
};
