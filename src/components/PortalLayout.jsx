import { alpha, useTheme } from '@mui/material/styles';
import { AppBar, Avatar, Box, BottomNavigation, BottomNavigationAction, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link as RouterLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 252;

export default function PortalLayout({ title, subtitle, navItems, headerRight }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const active = navItems.findIndex((item) => location.pathname === item.to || location.pathname.startsWith(`${item.to}/`));

  const nav = (
    <List sx={{ px: 1.5, py: 2 }}>
      <Stack
        spacing={0.5}
        sx={{
          mx: 0.5,
          mb: 2,
          px: 2,
          py: 1.75,
          borderRadius: 2,
          bgcolor: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        <Typography variant="overline" sx={{ color: '#8ce6de', fontWeight: 800 }}>
          Claims platform
        </Typography>
        <Typography variant="h6" sx={{ color: '#ffffff' }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" sx={{ color: 'rgba(226,232,240,0.8)', lineHeight: 1.6 }}>
            {subtitle}
          </Typography>
        )}
      </Stack>
      <ListItemButton
        component={RouterLink}
        to="/"
        sx={{
          borderRadius: 2,
          mb: 1,
          px: 1.5,
          py: 1.15,
          color: '#e2e8f0',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' }
        }}
      >
        <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}><HomeIcon /></ListItemIcon>
        <ListItemText primary="Portal Select" secondary="Back to landing page" />
        <ArrowOutwardIcon sx={{ fontSize: 18, opacity: 0.7 }} />
      </ListItemButton>
      {navItems.map((item) => (
        <ListItemButton
          key={item.to}
          component={RouterLink}
          to={item.to}
          selected={location.pathname === item.to}
          sx={{
            borderRadius: 2,
            mb: 0.75,
            px: 1.5,
            py: 1.15,
            color: '#dbeafe',
            '& .MuiListItemText-primary': { fontWeight: 600 },
            '& .MuiListItemText-secondary': { color: 'rgba(226,232,240,0.62)' },
            '& .MuiListItemIcon-root': { color: 'rgba(226,232,240,0.84)' },
            '&.Mui-selected': {
              bgcolor: 'rgba(94,234,212,0.14)',
              color: '#ffffff',
              border: '1px solid rgba(94,234,212,0.22)',
              '& .MuiListItemIcon-root': { color: '#8ce6de' }
            },
            '&.Mui-selected:hover': { bgcolor: 'rgba(94,234,212,0.18)' },
            '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' }
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} secondary={item.shortLabel ? `Quick access: ${item.shortLabel}` : undefined} />
        </ListItemButton>
      ))}
    </List>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', pb: isMobile ? 8 : 0 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          borderBottom: '1px solid rgba(148,163,184,0.18)',
          backdropFilter: 'blur(18px)'
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 66, md: 80 }, px: { xs: 1.5, md: 3 } }}>
          <Stack direction="row" alignItems="center" spacing={{ xs: 1, md: 1.5 }} sx={{ flexGrow: 1, minWidth: 0 }}>
            <Avatar
              variant="rounded"
              sx={{
                width: { xs: 38, md: 42 },
                height: { xs: 38, md: 42 },
                bgcolor: alpha('#5eead4', 0.16),
                color: '#d5fff7',
                fontWeight: 800,
                borderRadius: 2
              }}
            >
              MC
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h6" sx={{ fontSize: { xs: '1.05rem', md: '1.25rem' }, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</Typography>
              {subtitle && <Typography variant="caption" sx={{ opacity: 0.78, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{subtitle}</Typography>}
            </Box>
          </Stack>
          {!isMobile && (
            <Box
              sx={{
                px: 1.5,
                py: 1,
                mr: 1.5,
                borderRadius: 2,
                border: '1px solid rgba(255,255,255,0.12)',
                bgcolor: 'rgba(255,255,255,0.07)'
              }}
            >
              <Typography variant="caption" sx={{ color: '#d5fff7', fontWeight: 700 }}>
                Operational workspace
              </Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {headerRight}
          </Box>
        </Toolbar>
      </AppBar>
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              pt: 10,
              bgcolor: '#102736',
              color: '#ffffff',
              backgroundImage: 'linear-gradient(180deg, #102736 0%, #13384a 58%, #134e4a 100%)',
              borderRight: 'none'
            }
          }}
        >
          {nav}
        </Drawer>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1.5, md: 3.5 },
          pt: { xs: 9, md: 12 },
          width: { md: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Outlet />
      </Box>
      {isMobile && (
        <BottomNavigation
          value={active}
          onChange={(_, value) => navigate(navItems[value]?.to || '/')}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1300,
            borderTop: '1px solid #dbe4ef',
            bgcolor: 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(18px)',
            boxShadow: '0 -8px 24px rgba(15,23,42,0.08)',
            '& .MuiBottomNavigationAction-root': {
              minWidth: 0,
              px: 0.15,
              pt: 0.75,
              minHeight: 58
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.64rem',
              lineHeight: 1.1
            }
          }}
        >
          {navItems.slice(0, 5).map((item) => <BottomNavigationAction key={item.to} label={item.shortLabel || item.label} icon={item.icon} />)}
        </BottomNavigation>
      )}
    </Box>
  );
}
