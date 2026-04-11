import { Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import StatCard from '../../components/StatCard.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';

export default function MyAssignments() {
  const { claims, notify } = useApp();
  const navigate = useNavigate();
  const assigned = claims.filter((claim) => claim.assignedSurveyor === 'Amit Patel' && !['Settled', 'Rejected'].includes(claim.status));
  return (
    <>
      <PageHeader title="My Assignments" subtitle="● Available" />
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}><StatCard title="Active" value={assigned.length} /></Grid>
        <Grid item xs={12} md={4}><StatCard title="Completed This Week" value="7" /></Grid>
        <Grid item xs={12} md={4}><StatCard title="Avg Rating" value="4.7" /></Grid>
      </Grid>
      <Grid container spacing={2}>{assigned.map((claim) => <Grid item xs={12} md={6} key={claim.claimNumber}><Card><CardContent><Stack spacing={1}><Stack direction="row" justifyContent="space-between"><Typography variant="h6">{claim.claimNumber}</Typography><Chip label={claim.claimType} /></Stack><Typography>{claim.customerName} | {claim.customerPhone}</Typography><Typography>{claim.vehicleMake} {claim.vehicleModel} | {claim.vehicleReg}</Typography><Typography color="text.secondary">{claim.accidentLocation}</Typography><Typography>Estimated loss {formatCurrency(claim.estimatedLoss)}</Typography><Card sx={{ bgcolor: '#e2e8f0', boxShadow: 'none' }}><CardContent>Map placeholder: {claim.accidentLatitude}, {claim.accidentLongitude}</CardContent></Card><Stack direction="row" spacing={1}><Button variant="contained" onClick={() => navigate(`/surveyor/active/${claim.claimNumber}`)}>Start Survey</Button><Button variant="outlined" onClick={() => notify('Directions opened in field app')}>Get Directions</Button></Stack></Stack></CardContent></Card></Grid>)}</Grid>
    </>
  );
}
