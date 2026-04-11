import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import StatusChip from '../../components/StatusChip.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';

export default function ActiveClaims() {
  const { claims } = useApp();
  const navigate = useNavigate();
  const active = claims.filter((claim) => claim.garageCode === 'GRG-MUM-001');
  return (
    <>
      <PageHeader title="Active Claims" subtitle="Vehicles currently mapped to AutoCare Mumbai" />
      <Paper sx={{ overflowX: 'auto' }}><Table><TableHead><TableRow><TableCell>Claim</TableCell><TableCell>Customer</TableCell><TableCell>Vehicle</TableCell><TableCell>Status</TableCell><TableCell>Estimate</TableCell><TableCell>Action</TableCell></TableRow></TableHead><TableBody>{active.map((claim) => <TableRow key={claim.claimNumber}><TableCell>{claim.claimNumber}</TableCell><TableCell>{claim.customerName}</TableCell><TableCell>{claim.vehicleReg}</TableCell><TableCell><StatusChip status={claim.status} /></TableCell><TableCell>{formatCurrency(claim.totalBill)}</TableCell><TableCell><Button variant="contained" onClick={() => navigate(`/garage/estimate/${claim.claimNumber}`)}>Submit Estimate</Button></TableCell></TableRow>)}</TableBody></Table></Paper>
    </>
  );
}
