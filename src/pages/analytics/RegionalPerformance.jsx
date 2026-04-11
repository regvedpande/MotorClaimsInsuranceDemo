import { Card, CardContent, Chip, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import PageHeader from '../../components/PageHeader.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { garages } from '../../data/mockData.js';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { byRegion } from './analyticsUtils.js';

export default function RegionalPerformance() {
  const { claims } = useApp();
  const regions = byRegion(claims);
  return (
    <>
      <PageHeader title="Regional Performance" subtitle="Operational health across core motor regions" />
      <Grid container spacing={2} sx={{ mb: 2 }}>{regions.map((r) => <Grid item xs={12} md={3} key={r.region}><Card><CardContent><Typography variant="h6">{r.region}</Typography><Typography>Active claims: <b>{r.active}</b></Typography><Typography>Settled: <b>{r.settled}</b></Typography><Typography>Rejection rate: <b>{Math.round((r.rejected / Math.max(r.active + r.settled + r.rejected, 1)) * 100)}%</b></Typography><Typography>Avg TAT: <b>{r.avgTat} days</b></Typography><Chip label="View Details" sx={{ mt: 1 }} /></CardContent></Card></Grid>)}</Grid>
      <Paper sx={{ overflowX: 'auto' }}><Table><TableHead><TableRow><TableCell>Garage Name</TableCell><TableCell>Region</TableCell><TableCell>Active Claims</TableCell><TableCell>Avg Settlement</TableCell><TableCell>Rating</TableCell><TableCell>Cashless %</TableCell></TableRow></TableHead><TableBody>{garages.map((garage) => <TableRow key={garage.garageCode}><TableCell>{garage.garageName}</TableCell><TableCell>{garage.region}</TableCell><TableCell>{garage.activeClaims}</TableCell><TableCell>{formatCurrency(62000 + garage.activeClaims * 1800)}</TableCell><TableCell>{garage.rating}</TableCell><TableCell>{garage.cashlessEnabled ? '82%' : '34%'}</TableCell></TableRow>)}</TableBody></Table></Paper>
    </>
  );
}
