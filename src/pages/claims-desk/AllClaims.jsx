import { Button, Grid, MenuItem, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
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

  const filtered = useMemo(() => {
    return claims.filter((claim) => {
      const text = `${claim.claimNumber} ${claim.customerName} ${claim.vehicleReg}`.toLowerCase();
      const matchText = text.includes(query.toLowerCase());
      const matchType = type === 'All' || claim.claimType === type;
      const matchStatus = status === 'All' || claim.status === status;
      const matchRegion = region === 'All' || claim.region === region;
      return matchText && matchType && matchStatus && matchRegion;
    });
  }, [claims, query, type, status, region]);

  return (
    <>
      <PageHeader title="All Claims" subtitle="Search, filter, and inspect motor claim lifecycles" />

      <Paper sx={{ p: 2.5, mb: 2.5 }}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              size="small"
              label="Search by claim number, customer or vehicle"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              size="small"
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="All">All statuses</MenuItem>
              {CLAIM_STATUSES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              select
              fullWidth
              size="small"
              label="Region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <MenuItem value="All">All regions</MenuItem>
              {REGIONS.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <ToggleButtonGroup
              exclusive
              fullWidth
              value={type}
              onChange={(_, v) => v && setType(v)}
              size="small"
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                '& .MuiToggleButton-root': { py: 0.875, fontSize: '0.8rem' }
              }}
            >
              <ToggleButton value="All">All</ToggleButton>
              <ToggleButton value="OwnDamage">OD</ToggleButton>
              <ToggleButton value="Theft">Theft</ToggleButton>
              <ToggleButton value="PersonalAccident">PA</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Paper>

      <Paper>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2.5, py: 2, borderBottom: '1px solid #f1f5f9' }}>
          <Typography variant="body2" color="text.secondary">
            Showing <strong style={{ color: '#0f172a' }}>{filtered.length}</strong> of {claims.length} claims
          </Typography>
        </Stack>
        <Stack sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Claim No</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Vehicle</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ageing</TableCell>
                <TableCell>Region</TableCell>
                <TableCell>Surveyor</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((claim) => (
                <TableRow key={claim.claimNumber}>
                  <TableCell>{claim.claimNumber}</TableCell>
                  <TableCell>{claim.customerName}</TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>{claim.vehicleReg}</Typography>
                    <Typography variant="caption" color="text.secondary">{claim.vehicleMake} {claim.vehicleModel}</Typography>
                  </TableCell>
                  <TableCell>{formatClaimType(claim.claimType)}</TableCell>
                  <TableCell><StatusChip status={claim.status} /></TableCell>
                  <TableCell sx={{ color: claim.ageingDays > 15 ? '#dc2626' : claim.ageingDays >= 7 ? '#b45309' : 'text.secondary', fontWeight: 600 }}>
                    {claim.ageingDays}d
                  </TableCell>
                  <TableCell>{claim.region}</TableCell>
                  <TableCell>{claim.assignedSurveyor}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setSelectedClaimNumber(claim.claimNumber);
                        navigate(`/claims-desk/claims/${claim.claimNumber}`);
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Stack>
      </Paper>
    </>
  );
}
