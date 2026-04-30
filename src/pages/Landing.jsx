import { alpha } from '@mui/material/styles';
import { Box, Button, Card, CardActionArea, CardContent, Chip, Container, Divider, Grid, Stack, Typography } from '@mui/material';
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
  { title: 'Claims Desk', tag: 'Internal', to: '/claims-desk', icon: <DashboardIcon fontSize="large" />, accent: '#10243f', description: 'Full claims lifecycle management, assessment, settlement calculation and approval' },
  { title: 'Claimant Portal', tag: 'Customer', to: '/claimant', icon: <DirectionsCarIcon fontSize="large" />, accent: '#2563eb', description: 'File FNOL, upload documents, track claim status in real time' },
  { title: 'Surveyor Portal', tag: 'Field', to: '/surveyor', icon: <AssignmentIcon fontSize="large" />, accent: '#0d9488', description: 'Receive survey assignments, upload photos, submit survey reports and approve estimates' },
  { title: 'Garage Portal', tag: 'Partner', to: '/garage', icon: <BuildIcon fontSize="large" />, accent: '#d97706', description: 'Submit repair estimates, receive cashless authorisation, manage repair status' },
  { title: 'Analytics Dashboard', tag: 'Management', to: '/analytics', icon: <BarChartIcon fontSize="large" />, accent: '#be123c', description: 'Regional KPIs, settlement trends, ageing analysis and claim type distribution' }
];

const highlights = [
  { label: 'Role-based journeys', value: '5 portals', icon: <VerifiedUserOutlinedIcon fontSize="small" /> },
  { label: 'Decision speed', value: 'Live dashboard', icon: <AccessTimeOutlinedIcon fontSize="small" /> },
  { label: 'Partner workflow', value: 'Garage + surveyor', icon: <HandshakeOutlinedIcon fontSize="small" /> }
];

export default function Landing() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', overflowX: 'hidden' }}>
      <Box
        sx={{
          position: 'relative',
          color: '#ffffff',
          pt: { xs: 3, md: 5 },
          pb: { xs: 9, md: 18 },
          backgroundColor: '#10243f',
          backgroundImage: `
            linear-gradient(105deg, rgba(7, 18, 34, 0.9) 0%, rgba(14, 45, 61, 0.8) 48%, rgba(12, 118, 110, 0.58) 100%),
            url("https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80")
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(9,15,28,0.18) 0%, rgba(9,15,28,0.54) 100%)'
          }}
        />
        <Container maxWidth="lg">
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              justifyContent="space-between"
              spacing={2}
              sx={{ mb: { xs: 4, md: 9 } }}
            >
              <Stack direction="row" spacing={1.25} alignItems="center">
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#5eead4', boxShadow: '0 0 0 6px rgba(94,234,212,0.16)' }} />
                <Typography variant="overline" sx={{ color: '#d5fff7', fontWeight: 800 }}>
                  Motor Claims Experience Demo
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                sx={{ maxWidth: '100%', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}
              >
                {['Claims', 'Settlement', 'Analytics'].map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    sx={{
                      maxWidth: '100%',
                      bgcolor: 'rgba(255,255,255,0.12)',
                      color: '#ffffff',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.16)'
                    }}
                  />
                ))}
              </Stack>
            </Stack>

            <Typography
              variant="h1"
              sx={{
                maxWidth: 900,
                fontSize: { xs: '2.2rem', sm: '3.5rem', md: '5rem' },
                lineHeight: { xs: 1.03, md: 1 },
                fontWeight: 800,
                textWrap: 'balance',
                overflowWrap: 'anywhere'
              }}
            >
              A sharper front door for motor claims operations
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mt: { xs: 1.75, md: 2.5 },
                opacity: 0.95,
                maxWidth: 760,
                lineHeight: 1.48,
                fontWeight: 500,
                fontSize: { xs: '0.96rem', sm: '1.15rem', md: '1.5rem' }
              }}
            >
              Move through FNOL intake, survey, garage coordination, settlement approval and executive reporting in one streamlined portfolio build.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} sx={{ mt: { xs: 3, md: 4 } }}>
              <Button
                component={RouterLink}
                to="/claims-desk"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: { xs: 2.25, md: 3 },
                  py: { xs: 1.15, md: 1.4 },
                  bgcolor: '#ffffff',
                  color: '#0f172a',
                  '&:hover': { bgcolor: '#ecfeff' }
                }}
              >
                Open Claims Desk
              </Button>
              <Button
                component={RouterLink}
                to="/analytics"
                variant="outlined"
                sx={{
                  px: { xs: 2.25, md: 3 },
                  py: { xs: 1.15, md: 1.4 },
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: '#ffffff',
                  bgcolor: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    borderColor: 'rgba(255,255,255,0.45)',
                    bgcolor: 'rgba(255,255,255,0.12)'
                  }
                }}
              >
                View Analytics
              </Button>
            </Stack>

            <Grid container spacing={{ xs: 1.25, md: 2 }} sx={{ mt: { xs: 3, md: 5 } }}>
              {highlights.map((item) => (
                <Grid item xs={12} sm={4} key={item.label}>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    sx={{
                      px: { xs: 1.5, md: 2 },
                      py: { xs: 1.25, md: 1.75 },
                      borderRadius: 2,
                      bgcolor: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.14)',
                      backdropFilter: 'blur(12px)'
                    }}
                  >
                    <Box sx={{ display: 'grid', placeItems: 'center', width: { xs: 32, md: 36 }, height: { xs: 32, md: 36 }, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.14)' }}>
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: '#dbeafe', fontSize: { xs: '0.8rem', md: '0.875rem' } }}>{item.label}</Typography>
                      <Typography variant="h6" sx={{ fontSize: { xs: '1.35rem', md: '1.5rem' } }}>{item.value}</Typography>
                    </Box>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ mt: { xs: -5, md: -12 }, position: 'relative', zIndex: 2, pb: 6 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={2}
          sx={{ mb: { xs: 2.5, md: 3.5 } }}
        >
          <Box>
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 800 }}>
              Choose a workflow
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.5, fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
              Navigate the platform by role
            </Typography>
          </Box>
          <Typography color="text.secondary" sx={{ maxWidth: 520, lineHeight: 1.7, fontSize: { xs: '0.96rem', md: '1rem' } }}>
            Each portal is tuned for a different participant in the claims journey, with clearer entry points and a stronger visual hierarchy.
          </Typography>
        </Stack>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {portals.map((portal) => (
            <Grid item xs={12} sm={6} md={portal.title === 'Analytics Dashboard' ? 12 : 3} key={portal.title}>
              <Card
                sx={{
                  height: '100%',
                  minHeight: { xs: portal.title === 'Analytics Dashboard' ? 208 : 252, md: portal.title === 'Analytics Dashboard' ? 220 : 296 },
                  borderTop: `5px solid ${portal.accent}`,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  transition: 'transform 180ms ease, box-shadow 180ms ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 24px 52px rgba(15,23,42,0.12)'
                  }
                }}
              >
                <CardActionArea component={RouterLink} to={portal.to} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'stretch', alignItems: 'stretch' }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: { xs: 1.5, md: 2 }, px: { xs: 2.25, md: 3 }, py: { xs: 2.25, md: 3 } }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                      <Box
                        sx={{
                          color: portal.accent,
                          width: { xs: 48, md: 56 },
                          height: { xs: 48, md: 56 },
                          borderRadius: 2,
                          bgcolor: alpha(portal.accent, 0.12),
                          display: 'grid',
                          placeItems: 'center'
                        }}
                      >
                        {portal.icon}
                      </Box>
                      <Chip label={portal.tag} size="small" sx={{ bgcolor: '#f8fafc', color: '#111827', fontWeight: 700, border: '1px solid #e2e8f0' }} />
                    </Stack>
                    <Divider />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, flexGrow: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: 800, fontSize: { xs: '1.45rem', md: '1.5rem' } }}>{portal.title}</Typography>
                      <Typography color="text.secondary" sx={{ lineHeight: 1.65, fontSize: { xs: '0.95rem', md: '1rem' }, minHeight: { md: portal.title === 'Analytics Dashboard' ? 0 : 116 } }}>
                        {portal.description}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 'auto' }}>
                      <Button variant="outlined" endIcon={<ArrowForwardIcon />} sx={{ borderColor: alpha(portal.accent, 0.3), color: portal.accent }}>
                        Enter Portal
                      </Button>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ py: 4 }}>
          <ArchitectureDiagram />
        </Box>
        <Typography align="center" color="text.secondary" sx={{ py: 2 }}>
          Built for portfolio review | React 18 + MUI 5
        </Typography>
      </Container>
    </Box>
  );
}
