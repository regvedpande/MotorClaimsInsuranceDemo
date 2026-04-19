import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PaidIcon from '@mui/icons-material/Paid';
import SpeedIcon from '@mui/icons-material/Speed';
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PageHeader from '../../components/PageHeader.jsx';
import StatCard from '../../components/StatCard.jsx';
import ChartCard from '../../components/ChartCard.jsx';
import StatusChip from '../../components/StatusChip.jsx';
import LoadingState from '../../components/LoadingState.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';
import useBriefLoading from '../../hooks/useBriefLoading.js';
import { formatClaimType } from '../../data/constants.js';

const group = (items, key) => Object.entries(items.reduce((acc, item) => ({ ...acc, [item[key]]: (acc[item[key]] || 0) + 1 }), {})).map(([name, value]) => ({ name: key === 'claimType' ? formatClaimType(name) : name, value }));
const colors = ['#0d1f35', '#2563eb', '#0d9488', '#d97706', '#7c3aed', '#dc2626'];

export default function Dashboard() {
  const { claims } = useApp();
  const loading = useBriefLoading();
  if (loading) return <><PageHeader title="Claims Desk Dashboard" subtitle="Operational snapshot across all motor claims" /><LoadingState rows={6} /></>;
  const openClaims = claims.filter((c) => !['Settled', 'Rejected'].includes(c.status));
  const settled = claims.filter((c) => c.status === 'Settled');
  const avgSettlement = Math.round(claims.reduce((sum, c) => sum + c.netPayable, 0) / claims.length);
  return (
    <>
      <PageHeader title="Claims Desk Dashboard" subtitle="Operational snapshot across all motor claims" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}><StatCard title="Total Claims" value={claims.length} subtitle="All time" icon={<AssignmentTurnedInIcon />} color="#0d1f35" /></Grid>
        <Grid item xs={12} md={3}><StatCard title="Open Claims" value={openClaims.length} subtitle="Active lifecycle" icon={<PendingActionsIcon />} color="#d97706" /></Grid>
        <Grid item xs={12} md={3}><StatCard title="Settled Today" value={settled.length} subtitle="Demo day batch" icon={<PaidIcon />} color="#16a34a" /></Grid>
        <Grid item xs={12} md={3}><StatCard title="Avg Settlement" value={formatCurrency(avgSettlement)} subtitle="Net payable" icon={<SpeedIcon />} color="#2563eb" /></Grid>
        <Grid item xs={12} md={4}><ChartCard title="Claims by Type"><ResponsiveContainer><PieChart><Pie data={group(claims, 'claimType')} dataKey="value" nameKey="name" outerRadius={95} label>{group(claims, 'claimType').map((_, i) => <Cell key={i} fill={colors[i]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></ChartCard></Grid>
        <Grid item xs={12} md={4}><ChartCard title="Claims by Status"><ResponsiveContainer><BarChart data={group(claims, 'status')}><XAxis dataKey="name" hide /><YAxis /><Tooltip /><Bar dataKey="value" fill="#2563eb" /></BarChart></ResponsiveContainer></ChartCard></Grid>
        <Grid item xs={12} md={4}><ChartCard title="Claims by Region"><ResponsiveContainer><BarChart data={group(claims, 'region')} layout="vertical"><XAxis type="number" /><YAxis dataKey="name" type="category" /><Tooltip /><Bar dataKey="value" fill="#0d9488" /></BarChart></ResponsiveContainer></ChartCard></Grid>
        <Grid item xs={12}>
          <Paper sx={{ overflow: 'hidden' }}>
            <Table>
              <TableHead><TableRow><TableCell>Claim No</TableCell><TableCell>Customer</TableCell><TableCell>Type</TableCell><TableCell>Status</TableCell><TableCell>Ageing Days</TableCell><TableCell>Region</TableCell></TableRow></TableHead>
              <TableBody>{claims.slice().sort((a, b) => b.ageingDays - a.ageingDays).slice(0, 10).map((claim) => <TableRow key={claim.claimNumber} sx={{ bgcolor: claim.ageingDays > 15 ? '#fee2e2' : claim.ageingDays >= 7 ? '#fef3c7' : 'inherit' }}><TableCell>{claim.claimNumber}</TableCell><TableCell>{claim.customerName}</TableCell><TableCell>{formatClaimType(claim.claimType)}</TableCell><TableCell><StatusChip status={claim.status} /></TableCell><TableCell>{claim.ageingDays}</TableCell><TableCell>{claim.region}</TableCell></TableRow>)}</TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
