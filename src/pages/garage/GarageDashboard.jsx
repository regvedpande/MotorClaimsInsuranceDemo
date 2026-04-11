import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import PageHeader from '../../components/PageHeader.jsx';
import StatCard from '../../components/StatCard.jsx';
import StatusChip from '../../components/StatusChip.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';

export default function GarageDashboard() {
  const { claims } = useApp();
  const active = claims.filter((c) => c.garageCode === 'GRG-MUM-001' && !['Settled', 'Rejected'].includes(c.status));
  const columns = {
    'Estimate Submitted': active.filter((c) => ['DocumentsComplete', 'UnderAssessment'].includes(c.status)),
    'Approved/Authorised': active.filter((c) => ['Approved', 'CashlessAuthorised'].includes(c.status)),
    'Repair Complete': claims.filter((c) => c.garageCode === 'GRG-MUM-001' && c.status === 'Settled')
  };
  return (
    <>
      <PageHeader title="Garage Dashboard" subtitle="Cashless repair and estimate operations" />
      <Grid container spacing={2} sx={{ mb: 2 }}><Grid item xs={12} md={3}><StatCard title="Active Repairs" value={active.length} /></Grid><Grid item xs={12} md={3}><StatCard title="Pending Estimates" value={columns['Estimate Submitted'].length} /></Grid><Grid item xs={12} md={3}><StatCard title="Cashless Auth Pending" value={columns['Approved/Authorised'].length} /></Grid><Grid item xs={12} md={3}><StatCard title="Total Settled" value={formatCurrency(1240000)} subtitle="This month" /></Grid></Grid>
      <Grid container spacing={2}>{Object.entries(columns).map(([name, list]) => <Grid item xs={12} md={4} key={name}><Card><CardContent><Typography variant="h6" sx={{ mb: 2 }}>{name}</Typography><Stack spacing={1}>{list.map((claim) => <Card key={claim.claimNumber} sx={{ boxShadow: 'none', bgcolor: '#f8fafc' }}><CardContent><Typography fontWeight={800}>{claim.claimNumber}</Typography><Typography>{claim.vehicleReg}</Typography><StatusChip status={claim.status} /></CardContent></Card>)}</Stack></CardContent></Card></Grid>)}</Grid>
    </>
  );
}
