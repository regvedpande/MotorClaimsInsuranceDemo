import { Grid, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import { Area, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PageHeader from '../../components/PageHeader.jsx';
import StatCard from '../../components/StatCard.jsx';
import ChartCard from '../../components/ChartCard.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { groupBy, sumBy } from './analyticsUtils.js';

export default function Overview() {
  const { claims } = useApp();
  const [range, setRange] = useState('30');
  const settled = claims.filter((c) => c.status === 'Settled');
  const rejected = claims.filter((c) => c.status === 'Rejected');
  const timeline = Array.from({ length: 8 }).map((_, i) => ({ date: `Mar ${i + 1}`, registered: 2 + (i % 4), settled: i % 3 }));
  return (
    <>
      <PageHeader title="Analytics Overview" subtitle="Portfolio performance and claims throughput" actions={<TextField select size="small" label="Date range" value={range} onChange={(e) => setRange(e.target.value)}><MenuItem value="7">Last 7 days</MenuItem><MenuItem value="30">Last 30 days</MenuItem><MenuItem value="90">Last 90 days</MenuItem></TextField>} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={2}><StatCard title="Total Claims" value={claims.length} /></Grid>
        <Grid item xs={12} md={2}><StatCard title="Claims Settled" value={settled.length} /></Grid>
        <Grid item xs={12} md={2}><StatCard title="Total Settlement" value={formatCurrency(sumBy(claims, 'netPayable'))} /></Grid>
        <Grid item xs={12} md={2}><StatCard title="Avg Settlement" value={formatCurrency(Math.round(sumBy(claims, 'netPayable') / claims.length))} /></Grid>
        <Grid item xs={12} md={2}><StatCard title="Avg TAT" value={8} subtitle="days" /></Grid>
        <Grid item xs={12} md={2}><StatCard title="Rejection Rate" value={`${Math.round((rejected.length / claims.length) * 100)}%`} /></Grid>
        <Grid item xs={12} md={7}><ChartCard title="Claims Registered vs Settled"><ResponsiveContainer><LineChart data={timeline}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Legend /><Line dataKey="registered" stroke="#2563eb" strokeWidth={3} /><Line dataKey="settled" stroke="#16a34a" strokeWidth={3} /></LineChart></ResponsiveContainer></ChartCard></Grid>
        <Grid item xs={12} md={5}><ChartCard title="Claim Type Distribution"><ResponsiveContainer><PieChart><Pie data={groupBy(claims, 'claimType')} dataKey="value" nameKey="name" innerRadius={55} outerRadius={100} label>{['#0d1f35', '#2563eb', '#d97706'].map((c) => <Cell key={c} fill={c} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></ChartCard></Grid>
      </Grid>
    </>
  );
}
