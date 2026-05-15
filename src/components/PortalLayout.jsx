import { alpha, useTheme } from '@mui/material/styles';
import { AppBar, Avatar, Box, BottomNavigation, BottomNavigationAction, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link as RouterLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 248;

export default function PortalLayout({ title, subtitle, navItems, headerRight }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const isItemActive = (item) => location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
  const active = navItems.findIndex((item) => isItemActive(item));

  const nav = (
    <List sx={{ px: 1.5, pt: 2, pb: 3 }}>
      <Box
        sx={{
          mx: 0.5,
          mb: 2.5,
          px: 2,
          py: 2,
          borderRadius: 2,
          bgcolor: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        <Typography
          sx={{
            fontSize: '0.65rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'rgba(94,234,212,0.9)',
            mb: 0.5
          }}
        >
          Claims Platform
        </Typography>
        <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600, lineHeight: 1.2 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" sx={{ color: 'rgba(226,232,240,0.65)', mt: 0.5, display: 'block', lineHeight: 1.5 }}>
            {subtitle}
          </Typography>
        )}
      </Box>

      <ListItemButton
        component={RouterLink}
        to="/"
        sx={{
          borderRadius: 2,
          mb: 1,
          px: 1.5,
          py: 1,
          color: 'rgba(226,232,240,0.75)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.07)', color: '#e2e8f0' }
        }}
      >
        <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
          <HomeIcon sx={{ fontSize: 20 }} />
        </ListItemIcon>
      <ListItemText
          primary="All Portals"
          primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }}
        />
        <ArrowOutwardIcon sx={{ fontSize: 15, opacity: 0.5 }} />
      </ListItemButton>

      <Box sx={{ my: 1, borderTop: '1px solid rgba(255,255,255,0.06)' }} />

      {navItems.map((item) => {
        const isSelected = isItemActive(item);
        return (
          <ListItemButton
            key={item.to}
            component={RouterLink}
            to={item.to}
            selected={isSelected}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              px: 1.5,
              py: 1,
              color: isSelected ? '#ffffff' : 'rgba(203,213,225,0.8)',
              '& .MuiListItemIcon-root': { color: isSelected ? '#5eead4' : 'rgba(203,213,225,0.6)', minWidth: 36 },
              '&.Mui-selected': {
                bgcolor: 'rgba(94,234,212,0.12)',
                border: '1px solid rgba(94,234,212,0.18)',
                '&:hover': { bgcolor: 'rgba(94,234,212,0.16)' }
              },
              '&:hover': { bgcolor: 'rgba(255,255,255,0.07)' }
            }}
          >
            <ListItemIcon>
              <Box sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}>{item.icon}</Box>
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: isSelected ? 600 : 500 }}
            />
          </ListItemButton>
        );
      })}
    </List>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', pb: isMobile ? 8 : 0 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)'
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, md: 72 }, px: { xs: 1.5, md: 3 } }}>
          <Stack direction="row" alignItems="center" spacing={{ xs: 1, md: 1.5 }} sx={{ flexGrow: 1, minWidth: 0 }}>
            <Avatar
              variant="rounded"
              sx={{
                width: { xs: 36, md: 40 },
                height: { xs: 36, md: 40 },
                bgcolor: alpha('#5eead4', 0.14),
                color: '#a7f3d0',
                fontWeight: 800,
                fontSize: '0.875rem',
                borderRadius: 2,
                border: '1px solid rgba(94,234,212,0.2)'
              }}
            >
              MC
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: { xs: '0.9375rem', md: '1rem' },
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineHeight: 1.3
                }}
              >
                {title}
              </Typography>
              {subtitle && (
                <Typography
                  variant="caption"
                  sx={{ opacity: 0.6, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.2 }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Stack>
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
              pt: { md: 9 },
              bgcolor: '#0a1e30',
              backgroundImage: 'linear-gradient(180deg, #081726 0%, #0e2840 60%, #0f2d48 100%)',
              color: '#ffffff',
              borderRight: 'none',
              boxShadow: '1px 0 0 rgba(255,255,255,0.04)'
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
          p: { xs: 2, md: 3.5 },
          pt: { xs: 10, md: 12 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minWidth: 0
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
            borderTop: '1px solid #e2e8f0',
            bgcolor: 'rgba(255,255,255,0.96)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 -4px 16px rgba(15,23,42,0.06)',
            height: 60,
            '& .MuiBottomNavigationAction-root': {
              minWidth: 0,
              px: 0,
              py: 0.5,
              gap: 0.5
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.625rem',
              fontWeight: 600,
              lineHeight: 1
            },
            '& .Mui-selected': { color: '#0f2d48' }
          }}
        >
          {navItems.slice(0, 5).map((item) => (
            <BottomNavigationAction key={item.to} label={item.shortLabel || item.label} icon={item.icon} />
          ))}
        </BottomNavigation>
      )}
    </Box>
  );
}
