import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ClaimTypeIcon from '../../components/ClaimTypeIcon.jsx';
import PageHeader from '../../components/PageHeader.jsx';
import StatusChip from '../../components/StatusChip.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { formatDate } from '../../utils/formatDate.js';

export default function MyClaims() {
  const { claims, setSelectedClaimNumber } = useApp();
  const navigate = useNavigate();
  const mine = claims.filter((claim) => claim.customerName === 'Rahul Sharma' || claim.policyNumber === 'POL-2024-001');
  return (
    <>
      <PageHeader title="Welcome, Rahul Sharma" subtitle="Your policies, claims, and settlement progress" />
      <Grid container spacing={2}>{mine.map((claim) => <Grid item xs={12} md={4} key={claim.claimNumber}><Card><CardContent><Stack spacing={1}><Stack direction="row" justifyContent="space-between"><ClaimTypeIcon type={claim.claimType} sx={{ color: '#2563eb' }} /><StatusChip status={claim.status} /></Stack><Typography variant="h6">{claim.claimNumber}</Typography><Typography>{claim.vehicleMake} {claim.vehicleModel} | {claim.vehicleReg}</Typography><Typography color="text.secondary">Accident date: {formatDate(claim.accidentDate)}</Typography><Typography fontWeight={800}>Estimated settlement: {formatCurrency(claim.netPayable)}</Typography><Button variant="contained" onClick={() => { setSelectedClaimNumber(claim.claimNumber); navigate(`/claimant/track/${claim.claimNumber}`); }}>View Details</Button></Stack></CardContent></Card></Grid>)}</Grid>
    </>
  );
}
