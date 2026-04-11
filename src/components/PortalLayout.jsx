import { AppBar, Box, BottomNavigation, BottomNavigationAction, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 252;

export default function PortalLayout({ title, subtitle, navItems, headerRight }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const active = navItems.findIndex((item) => location.pathname === item.to || location.pathname.startsWith(`${item.to}/`));

  const nav = (
    <List sx={{ px: 1 }}>
      <ListItemButton component={RouterLink} to="/" sx={{ borderRadius: 2, mb: 1 }}>
        <ListItemIcon><HomeIcon /></ListItemIcon>
        <ListItemText primary="Portal Select" />
      </ListItemButton>
      {navItems.map((item) => (
        <ListItemButton key={item.to} component={RouterLink} to={item.to} selected={location.pathname === item.to} sx={{ borderRadius: 2, mb: 0.5 }}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', pb: isMobile ? 8 : 0 }}>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{title}</Typography>
            {subtitle && <Typography variant="caption" sx={{ opacity: 0.8 }}>{subtitle}</Typography>}
          </Box>
          {headerRight}
        </Toolbar>
      </AppBar>
      {!isMobile && (
        <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', pt: 9, bgcolor: '#ffffff' } }}>
          {nav}
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, pt: { xs: 10, md: 11 }, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
        <Outlet />
      </Box>
      {isMobile && (
        <BottomNavigation value={active} onChange={(_, value) => navigate(navItems[value]?.to || '/')} showLabels sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1300, borderTop: '1px solid #e2e8f0' }}>
          {navItems.slice(0, 5).map((item) => <BottomNavigationAction key={item.to} label={item.shortLabel || item.label} icon={item.icon} />)}
        </BottomNavigation>
      )}
    </Box>
  );
}
