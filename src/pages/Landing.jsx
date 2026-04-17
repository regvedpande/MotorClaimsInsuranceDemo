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
          <Typography variant="h2" sx={{ maxWidth: 860, fontWeight: 700 }}>Motor Claims Platform</Typography>
          <Typography variant="h6" sx={{ mt: 1, opacity: 0.9 }}>Enterprise motor insurance claims workflow and analytics</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 3 }}>
            {['ASP.NET Core 8', 'WCF/SOAP', 'BizTalk', 'CQRS', 'Azure Functions', 'SQL Server', 'Azure Blob'].map((item) => <Chip key={item} label={item} sx={{ bgcolor: '#ffffff18', color: '#ffffff' }} />)}
          </Stack>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {portals.map((portal) => (
            <Grid item xs={12} sm={6} md={portal.title === 'Analytics Dashboard' ? 12 : 3} key={portal.title}>
              <Card sx={{ height: '100%', borderTop: `5px solid ${portal.accent}`, display: 'flex', flexDirection: 'column' }}>
                <CardActionArea component={RouterLink} to={portal.to} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'stretch' }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 2, px: 3, py: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                      <Box sx={{ color: portal.accent }}>{portal.icon}</Box>
                      <Chip label={portal.tag} size="small" sx={{ bgcolor: '#f3f4f6', color: '#111827', fontWeight: 600 }} />
                    </Stack>
                    <Box>
                      <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>{portal.title}</Typography>
                      <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.6 }}>{portal.description}</Typography>
                    </Box>
                    <Box sx={{ mt: 'auto' }}>
                      <Button variant="outlined">Enter Portal</Button>
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
        <Typography align="center" color="text.secondary" sx={{ py: 4 }}>Built for portfolio review | React 18 + MUI 5</Typography>
      </Container>
    </Box>
  );
}
