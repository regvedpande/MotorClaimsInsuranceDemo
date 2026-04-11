import { Box, Button, Card, CardActionArea, CardContent, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BuildIcon from '@mui/icons-material/Build';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Link as RouterLink } from 'react-router-dom';
import ArchitectureDiagram from '../components/ArchitectureDiagram.jsx';

const portals = [
  { title: 'Claims Desk', tag: 'Internal', to: '/claims-desk', icon: <DashboardIcon fontSize="large" />, accent: '#0d1f35', description: 'Full claims lifecycle management, assessment, settlement calculation and approval' },
  { title: 'Claimant Portal', tag: 'Customer', to: '/claimant', icon: <DirectionsCarIcon fontSize="large" />, accent: '#2563eb', description: 'File FNOL, upload documents, track claim status in real time' },
  { title: 'Surveyor Portal', tag: 'Field', to: '/surveyor', icon: <AssignmentIcon fontSize="large" />, accent: '#0d9488', description: 'Receive survey assignments, upload photos, submit survey reports and approve estimates' },
  { title: 'Garage Portal', tag: 'Partner', to: '/garage', icon: <BuildIcon fontSize="large" />, accent: '#d97706', description: 'Submit repair estimates, receive cashless authorisation, manage repair status' },
  { title: 'Analytics Dashboard', tag: 'Management', to: '/analytics', icon: <BarChartIcon fontSize="large" />, accent: '#7c3aed', description: 'Regional KPIs, settlement trends, ageing analysis and claim type distribution' }
];

export default function Landing() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ bgcolor: '#0d1f35', color: '#ffffff', py: { xs: 5, md: 7 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ maxWidth: 860 }}>Reliance Motor Claims Platform</Typography>
          <Typography variant="h6" sx={{ mt: 1, opacity: 0.9 }}>Enterprise Motor Insurance Claims Processing System</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 3 }}>
            {['ASP.NET Core 8', 'WCF/SOAP', 'BizTalk', 'CQRS', 'Azure Functions', 'SQL Server', 'Azure Blob'].map((item) => <Chip key={item} label={item} sx={{ bgcolor: '#ffffff18', color: '#ffffff' }} />)}
          </Stack>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={2.5}>
          {portals.map((portal) => (
            <Grid item xs={12} sm={6} md={portal.title === 'Analytics Dashboard' ? 12 : 3} key={portal.title}>
              <Card sx={{ height: '100%', borderTop: `5px solid ${portal.accent}` }}>
                <CardActionArea component={RouterLink} to={portal.to} sx={{ height: '100%' }}>
                  <CardContent sx={{ minHeight: 212 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box sx={{ color: portal.accent }}>{portal.icon}</Box>
                      <Chip label={portal.tag} size="small" />
                    </Stack>
                    <Typography variant="h5" sx={{ mt: 2 }}>{portal.title}</Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>{portal.description}</Typography>
                    <Button sx={{ mt: 2 }} variant="outlined">Enter Portal</Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <ArchitectureDiagram />
        <Typography align="center" color="text.secondary" sx={{ py: 4 }}>Built by Your Name | ASP.NET Core 8 + React 18</Typography>
      </Container>
    </Box>
  );
}
