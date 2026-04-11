import { Button, Chip, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import PageHeader from '../../components/PageHeader.jsx';
import StatusChip from '../../components/StatusChip.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function AgeingReport() {
  const { claims, notify } = useApp();
  const open = claims.filter((claim) => !['Settled', 'Rejected'].includes(claim.status)).sort((a, b) => b.ageingDays - a.ageingDays);
  return (
    <>
      <PageHeader title="Ageing Report" subtitle="Open claims sorted by operational ageing" actions={<Button variant="contained" onClick={() => notify('Report exported')}>Export</Button>} />
      <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
        <Chip color="error" label={`>15 days: ${open.filter((c) => c.ageingDays > 15).length}`} />
        <Chip color="warning" label={`7-15 days: ${open.filter((c) => c.ageingDays >= 7 && c.ageingDays <= 15).length}`} />
        <Chip color="success" label={`<7 days: ${open.filter((c) => c.ageingDays < 7).length}`} />
      </Stack>
      <Paper sx={{ overflowX: 'auto' }}><Table><TableHead><TableRow><TableCell>Claim No</TableCell><TableCell>Customer</TableCell><TableCell>Type</TableCell><TableCell>Status</TableCell><TableCell>Ageing</TableCell><TableCell>Region</TableCell></TableRow></TableHead><TableBody>{open.map((claim) => <TableRow key={claim.claimNumber} sx={{ bgcolor: claim.ageingDays > 15 ? '#fee2e2' : claim.ageingDays >= 7 ? '#fef3c7' : 'inherit' }}><TableCell>{claim.claimNumber}</TableCell><TableCell>{claim.customerName}</TableCell><TableCell>{claim.claimType}</TableCell><TableCell><StatusChip status={claim.status} /></TableCell><TableCell>{claim.ageingDays} days</TableCell><TableCell>{claim.region}</TableCell></TableRow>)}</TableBody></Table></Paper>
    </>
  );
}
