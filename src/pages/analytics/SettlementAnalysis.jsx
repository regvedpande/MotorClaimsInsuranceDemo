import { Grid, Stack, Typography } from '@mui/material';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PageHeader from '../../components/PageHeader.jsx';
import ChartCard from '../../components/ChartCard.jsx';
import StatCard from '../../components/StatCard.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { byRegion, sumBy } from './analyticsUtils.js';

export default function SettlementAnalysis() {
  const { claims } = useApp();
  const regions = byRegion(claims);
  const avg = (key) => Math.round(sumBy(claims, key) / claims.length);
  const trend = claims.slice(0, 12).map((c, i) => ({ date: `D${i + 1}`, amount: c.netPayable }));
  return (
    <>
      <PageHeader title="Settlement Analysis" subtitle="Amounts, deductions, and settlement modes" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}><ChartCard title="Settlement Amounts Over Time"><ResponsiveContainer><AreaChart data={trend}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Area dataKey="amount" stroke="#2563eb" fill="#bfdbfe" /></AreaChart></ResponsiveContainer></ChartCard></Grid>
        <Grid item xs={12} md={5}><ChartCard title="Settlement by Region"><ResponsiveContainer><BarChart data={regions}><XAxis dataKey="region" /><YAxis /><Tooltip /><Bar dataKey="settlement" fill="#16a34a" /></BarChart></ResponsiveContainer></ChartCard></Grid>
        <Grid item xs={12}><Stack direction={{ xs: 'column', md: 'row' }} spacing={2}><StatCard title="Avg Gross" value={formatCurrency(avg('totalBill'))} /><StatCard title="Avg Inadmissible" value={formatCurrency(avg('inadmissibleAmount'))} /><StatCard title="Avg Depreciation" value={formatCurrency(avg('depreciationAmount'))} /><StatCard title="Avg Excess" value={formatCurrency(avg('compulsoryExcess'))} /><StatCard title="Avg Net Payable" value={formatCurrency(avg('netPayable'))} /></Stack></Grid>
        <Grid item xs={12}><ChartCard title="Cashless vs Reimbursement by Region"><ResponsiveContainer><BarChart data={regions.map((r) => ({ region: r.region, Cashless: claims.filter((c) => c.region === r.region && c.settlementMode === 'Cashless').length, Reimbursement: claims.filter((c) => c.region === r.region && c.settlementMode === 'Reimbursement').length }))}><XAxis dataKey="region" /><YAxis /><Tooltip /><Legend /><Bar dataKey="Cashless" stackId="a" fill="#0d9488" /><Bar dataKey="Reimbursement" stackId="a" fill="#2563eb" /></BarChart></ResponsiveContainer></ChartCard></Grid>
      </Grid>
    </>
  );
}
