import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PageHeader from '../../components/PageHeader.jsx';
import ChartCard from '../../components/ChartCard.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { garages } from '../../data/mockData.js';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { groupBy } from './analyticsUtils.js';
import { formatClaimType } from '../../data/constants.js';

export default function ClaimsAnalysis() {
  const { claims } = useApp();
  const split = groupBy(claims, 'settlementMode').filter((x) => x.name !== 'null');
  const byType = groupBy(claims, 'claimType').map((row) => ({ ...row, name: formatClaimType(row.name), avg: Math.round(claims.filter((c) => formatClaimType(c.claimType) === formatClaimType(row.name)).reduce((s, c) => s + c.netPayable, 0) / row.value) }));
  return (
    <>
      <PageHeader title="Claims Analysis" subtitle="Status, garage, and claim-type mix" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}><ChartCard title="Claims by Status"><ResponsiveContainer><BarChart data={groupBy(claims, 'status')}><XAxis dataKey="name" hide /><YAxis /><Tooltip /><Bar dataKey="value" fill="#2563eb" /></BarChart></ResponsiveContainer></ChartCard></Grid>
        <Grid item xs={12} md={4}><ChartCard title="Top Garages by Claim Count"><ResponsiveContainer><BarChart data={garages.slice(0, 5).map((g) => ({ name: g.garageName, value: g.totalClaims }))} layout="vertical"><XAxis type="number" /><YAxis dataKey="name" type="category" hide /><Tooltip /><Bar dataKey="value" fill="#0d9488" /></BarChart></ResponsiveContainer></ChartCard></Grid>
        <Grid item xs={12} md={4}><ChartCard title="Cashless vs Reimbursement"><ResponsiveContainer><PieChart><Pie data={split} dataKey="value" nameKey="name" label>{['#16a34a', '#2563eb'].map((c) => <Cell key={c} fill={c} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></ChartCard></Grid>
        <Grid item xs={12}><Paper><Table><TableHead><TableRow><TableCell>Claim Type</TableCell><TableCell>Count</TableCell><TableCell>Avg Settlement</TableCell></TableRow></TableHead><TableBody>{byType.map((row) => <TableRow key={row.name}><TableCell>{row.name}</TableCell><TableCell>{row.value}</TableCell><TableCell>{formatCurrency(row.avg)}</TableCell></TableRow>)}</TableBody></Table></Paper></Grid>
      </Grid>
    </>
  );
}
