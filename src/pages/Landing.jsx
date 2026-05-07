import { alpha } from '@mui/material/styles';
import { Box, Button, Card, CardActionArea, CardContent, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BuildIcon from '@mui/icons-material/Build';
import BarChartIcon from '@mui/icons-material/BarChart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import { Link as RouterLink } from 'react-router-dom';
import ArchitectureDiagram from '../components/ArchitectureDiagram.jsx';

const portals = [
  {
    title: 'Claims Desk',
    tag: 'Internal',
    to: '/claims-desk',
    icon: <DashboardIcon fontSize="large" />,
    accent: '#0f2d48',
    description: 'Full claims lifecycle — intake, assessment, settlement calculation, and approval workflow.'
  },
  {
    title: 'Claimant Portal',
    tag: 'Customer',
    to: '/claimant',
    icon: <DirectionsCarIcon fontSize="large" />,
    accent: '#2563eb',
    description: 'File FNOL, upload supporting documents, and track claim status in real time.'
  },
  {
    title: 'Surveyor Portal',
    tag: 'Field',
    to: '/surveyor',
    icon: <AssignmentIcon fontSize="large" />,
    accent: '#0d9488',
    description: 'Receive survey assignments, capture photos, submit reports and approve repair estimates.'
  },
  {
    title: 'Garage Portal',
    tag: 'Partner',
    to: '/garage',
    icon: <BuildIcon fontSize="large" />,
    accent: '#d97706',
    description: 'Submit repair estimates, receive cashless authorisations, manage repair progress.'
  },
  {
    title: 'Analytics Dashboard',
    tag: 'Management',
    to: '/analytics',
    icon: <BarChartIcon fontSize="large" />,
    accent: '#be123c',
    description: 'Regional KPIs, settlement trends, ageing analysis and claim type distribution.'
  }
];

const highlights = [
  { label: 'Role-based portals', value: '5 workflows', icon: <VerifiedUserOutlinedIcon fontSize="small" /> },
  { label: 'Real-time dashboard', value: 'Live metrics', icon: <AccessTimeOutlinedIcon fontSize="small" /> },
  { label: 'Partner network', value: 'Garage + surveyor', icon: <HandshakeOutlinedIcon fontSize="small" /> }
];

export default function Landing() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', overflowX: 'hidden' }}>
      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          color: '#ffffff',
          pt: { xs: 4, md: 6 },
          pb: { xs: 10, md: 20 },
          backgroundColor: '#08192e',
          backgroundImage: `
            linear-gradient(110deg, rgba(5,14,26,0.92) 0%, rgba(12,38,54,0.82) 50%, rgba(10,100,92,0.52) 100%),
            url("https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80")
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Top bar */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              justifyContent="space-between"
              spacing={2}
              sx={{ mb: { xs: 5, md: 10 } }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#5eead4', boxShadow: '0 0 0 4px rgba(94,234,212,0.2)' }} />
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a7f3d0' }}>
                  Motor Claims Platform Demo
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ maxWidth: '100%' }}>
                {['FNOL to Settlement', 'Multi-role Portals', 'Analytics'].map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.85)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      fontSize: '0.75rem',
                      fontWeight: 500
                    }}
                  />
                ))}
              </Stack>
            </Stack>

            {/* Headline */}
            <Typography
              variant="h1"
              sx={{
                maxWidth: 860,
                fontSize: { xs: '2.25rem', sm: '3.25rem', md: '4.5rem' },
                lineHeight: { xs: 1.1, md: 1.02 },
                fontWeight: 800,
                letterSpacing: { xs: '-0.02em', md: '-0.03em' }
              }}
            >
              End-to-end motor claims operations
            </Typography>

            <Typography
              sx={{
                mt: { xs: 2, md: 2.5 },
                opacity: 0.8,
                maxWidth: 680,
                lineHeight: 1.6,
                fontWeight: 400,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                color: '#cbd5e1'
              }}
            >
              From FNOL intake through surveyor dispatch, garage coordination, and settlement approval — all five stakeholder journeys in one unified platform.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: { xs: 3.5, md: 4.5 } }}>
              <Button
                component={RouterLink}
                to="/claims-desk"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 3,
                  py: 1.25,
                  bgcolor: '#ffffff',
                  color: '#0f172a',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  '&:hover': { bgcolor: '#f0f9ff', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }
                }}
              >
                Open Claims Desk
              </Button>
              <Button
                component={RouterLink}
                to="/analytics"
                variant="outlined"
                sx={{
                  px: 3,
                  py: 1.25,
                  borderColor: 'rgba(255,255,255,0.25)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  bgcolor: 'rgba(255,255,255,0.06)',
                  '&:hover': {
                    borderColor: 'rgba(255,255,255,0.4)',
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                View Analytics
              </Button>
            </Stack>

            {/* Highlights */}
            <Grid container spacing={{ xs: 1.5, md: 2 }} sx={{ mt: { xs: 4, md: 6 } }}>
              {highlights.map((item) => (
                <Grid item xs={12} sm={4} key={item.label}>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    sx={{
                      px: 2,
                      py: 1.75,
                      borderRadius: 2,
                      bgcolor: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <Box sx={{
                      width: 36, height: 36, borderRadius: 1.5,
                      bgcolor: 'rgba(255,255,255,0.1)',
                      display: 'grid', placeItems: 'center',
                      flexShrink: 0
                    }}>
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '0.75rem', color: '#94d5f5', fontWeight: 500 }}>{item.label}</Typography>
                      <Typography sx={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.2 }}>{item.value}</Typography>
                    </Box>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Portal cards */}
      <Container maxWidth="lg" sx={{ mt: { xs: -5, md: -12 }, position: 'relative', zIndex: 2, pb: 8 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'flex-end' }}
          spacing={2}
          sx={{ mb: { xs: 3, md: 4 } }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: '0.72rem', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'secondary.main', mb: 0.75
              }}
            >
              Portal directory
            </Typography>
            <Typography variant="h4">
              Navigate by role
            </Typography>
          </Box>
          <Typography color="text.secondary" sx={{ maxWidth: 460, lineHeight: 1.7, fontSize: '0.9375rem', pb: { md: 0.5 } }}>
            Each portal is built for a specific participant in the claims journey — distinct entry points, clear data scope, tailored actions.
          </Typography>
        </Stack>

        <Grid container spacing={{ xs: 2, md: 2.5 }}>
          {portals.map((portal) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={portal.title === 'Analytics Dashboard' ? 12 : 3}
              key={portal.title}
            >
              <Card
                sx={{
                  height: '100%',
                  borderTop: `3px solid ${portal.accent}`,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 160ms ease, box-shadow 160ms ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 36px rgba(15,23,42,0.10)'
                  }
                }}
              >
                <CardActionArea
                  component={RouterLink}
                  to={portal.to}
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'stretch', alignItems: 'stretch' }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      px: { xs: 2.5, md: 3 },
                      py: { xs: 2.5, md: 3 },
                      gap: 2
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box
                        sx={{
                          color: portal.accent,
                          width: 52,
                          height: 52,
                          borderRadius: 2,
                          bgcolor: alpha(portal.accent, 0.1),
                          display: 'grid',
                          placeItems: 'center',
                          flexShrink: 0
                        }}
                      >
                        {portal.icon}
                      </Box>
                      <Chip
                        label={portal.tag}
                        size="small"
                        sx={{
                          bgcolor: '#f8fafc',
                          color: '#475569',
                          fontWeight: 600,
                          border: '1px solid #e2e8f0',
                          fontSize: '0.75rem'
                        }}
                      />
                    </Stack>

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.75, fontSize: '1.25rem' }}>
                        {portal.title}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.65,
                          fontSize: '0.9rem',
                          minHeight: portal.title === 'Analytics Dashboard' ? 0 : { md: 60 }
                        }}
                      >
                        {portal.description}
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 'auto' }}>
                      <Button
                        variant="text"
                        endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                        sx={{
                          color: portal.accent,
                          fontWeight: 600,
                          px: 0,
                          fontSize: '0.875rem',
                          '&:hover': { bgcolor: 'transparent', gap: 0.5 }
                        }}
                      >
                        Enter portal
                      </Button>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6 }}>
          <ArchitectureDiagram />
        </Box>

        <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Motor Claims Platform · React 18 + MUI 5 · Full-stack insurance operations demo
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
