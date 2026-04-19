import { Button, Grid, MenuItem, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import StatusChip from '../../components/StatusChip.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { CLAIM_STATUSES, REGIONS, formatClaimType } from '../../data/constants.js';

export default function AllClaims() {
  const { claims, setSelectedClaimNumber } = useApp();
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');
  const [status, setStatus] = useState('All');
  const [region, setRegion] = useState('All');
  const navigate = useNavigate();
  const filtered = useMemo(() => claims.filter((claim) => {
    const text = `${claim.claimNumber} ${claim.customerName} ${claim.vehicleReg}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (type === 'All' || claim.claimType === type) && (status === 'All' || claim.status === status) && (region === 'All' || claim.region === region);
  }), [claims, query, type, status, region]);
  return (
    <>
      <PageHeader title="All Claims" subtitle="Search, filter, and inspect motor claim lifecycles" />
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={5}><TextField fullWidth label="Search by claim number, customer, vehicle" value={query} onChange={(e) => setQuery(e.target.value)} /></Grid>
        <Grid item xs={12} md={3}><TextField select fullWidth label="Status" value={status} onChange={(e) => setStatus(e.target.value)}><MenuItem value="All">All statuses</MenuItem>{CLAIM_STATUSES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}</TextField></Grid>
        <Grid item xs={12} md={2}><TextField select fullWidth label="Region" value={region} onChange={(e) => setRegion(e.target.value)}><MenuItem value="All">All regions</MenuItem>{REGIONS.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}</TextField></Grid>
        <Grid item xs={12} md={2}><ToggleButtonGroup exclusive fullWidth value={type} onChange={(_, v) => v && setType(v)}><ToggleButton value="All">All</ToggleButton><ToggleButton value="OwnDamage">OD</ToggleButton><ToggleButton value="Theft">Theft</ToggleButton><ToggleButton value="PersonalAccident">PA</ToggleButton></ToggleButtonGroup></Grid>
      </Grid>
      <Paper sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead><TableRow><TableCell>Claim No</TableCell><TableCell>Customer</TableCell><TableCell>Vehicle</TableCell><TableCell>Type</TableCell><TableCell>Status</TableCell><TableCell>Ageing</TableCell><TableCell>Region</TableCell><TableCell>Surveyor</TableCell><TableCell>Action</TableCell></TableRow></TableHead>
          <TableBody>{filtered.map((claim) => <TableRow key={claim.claimNumber}><TableCell>{claim.claimNumber}</TableCell><TableCell>{claim.customerName}</TableCell><TableCell>{claim.vehicleReg}<br />{claim.vehicleMake} {claim.vehicleModel}</TableCell><TableCell>{formatClaimType(claim.claimType)}</TableCell><TableCell><StatusChip status={claim.status} /></TableCell><TableCell>{claim.ageingDays} days</TableCell><TableCell>{claim.region}</TableCell><TableCell>{claim.assignedSurveyor}</TableCell><TableCell><Stack direction="row"><Button variant="contained" size="small" onClick={() => { setSelectedClaimNumber(claim.claimNumber); navigate(`/claims-desk/claims/${claim.claimNumber}`); }}>View Details</Button></Stack></TableCell></TableRow>)}</TableBody>
        </Table>
      </Paper>
    </>
  );
}
