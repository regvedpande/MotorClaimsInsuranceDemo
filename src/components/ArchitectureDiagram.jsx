import { Box, Card, CardContent, Grid, Tooltip, Typography } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const layers = [
  { title: 'Layer 1 - Presentation', color: '#0d1f35', text: 'React Portals: Claimant | Surveyor | Garage | Claims Desk | Analytics', tip: 'Role-based React 18 portals with responsive navigation and client-side routing.' },
  { title: 'Layer 2 - Business Logic', color: '#2563eb', text: 'CQRS Commands | MediatR | Eligibility Engine | Settlement Calculator', tip: 'Command/query workflows, eligibility rules, claim validation, and settlement computation.' },
  { title: 'Layer 3 - Integration', color: '#7c3aed', text: 'BizTalk 2020 | WCF/SOAP Services | XSLT Maps | Orchestrations', tip: 'Enterprise integrations for surveyor assignment, garage authorisations, and legacy policy systems.' },
  { title: 'Layer 4 - Data', color: '#d97706', text: 'SQL Server | EF Core | Dapper | Azure Blob | Redis Cache', tip: 'Operational claims store, document storage, fast reads, and cached reference data.' }
];

export default function ArchitectureDiagram() {
  return (
    <Card sx={{ mt: 5 }}>
      <CardContent sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h5" sx={{ mb: 1 }}>System Architecture</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>A four-layer enterprise design for high-volume motor claim processing.</Typography>
        <Grid container spacing={2}>
          {layers.map((layer, index) => (
            <Grid item xs={12} key={layer.title}>
              <Tooltip title={layer.tip} arrow placement="top">
                <Box sx={{ p: 2.5, bgcolor: layer.color, color: '#ffffff', borderRadius: 2, cursor: 'pointer', boxShadow: '0 16px 36px rgba(15,23,42,0.12)' }}>
                  <Typography variant="h6">{layer.title}</Typography>
                  <Typography sx={{ opacity: 0.92 }}>{layer.text}</Typography>
                </Box>
              </Tooltip>
              {index < layers.length - 1 && <Box sx={{ display: 'grid', placeItems: 'center', color: '#64748b', py: 0.5 }}><KeyboardDoubleArrowDownIcon /></Box>}
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
