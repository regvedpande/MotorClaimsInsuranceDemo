import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import PageHeader from '../../components/PageHeader.jsx';
import StatCard from '../../components/StatCard.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { formatDate } from '../../utils/formatDate.js';

export default function SurveyHistory() {
  const { claims } = useApp();
  const completed = claims.filter((claim) => ['DocumentsComplete', 'UnderAssessment', 'Approved', 'CashlessAuthorised', 'Settled'].includes(claim.status));
  return (
    <>
      <PageHeader title="Survey History" subtitle="Completed field inspections" />
      <Grid container spacing={2} sx={{ mb: 2 }}><Grid item xs={12} md={4}><StatCard title="Total Completed" value={completed.length} /></Grid><Grid item xs={12} md={4}><StatCard title="Avg Settlement" value={formatCurrency(Math.round(completed.reduce((s, c) => s + c.netPayable, 0) / completed.length))} /></Grid><Grid item xs={12} md={4}><StatCard title="Avg Turnaround" value="1.8 days" /></Grid></Grid>
      <Paper><Table><TableHead><TableRow><TableCell>Claim No</TableCell><TableCell>Vehicle</TableCell><TableCell>Date</TableCell><TableCell>Settlement</TableCell><TableCell>Rating</TableCell></TableRow></TableHead><TableBody>{completed.map((claim) => <TableRow key={claim.claimNumber}><TableCell>{claim.claimNumber}</TableCell><TableCell>{claim.vehicleReg}</TableCell><TableCell>{formatDate(claim.accidentDate)}</TableCell><TableCell>{formatCurrency(claim.netPayable)}</TableCell><TableCell>4.7</TableCell></TableRow>)}</TableBody></Table></Paper>
    </>
  );
}
