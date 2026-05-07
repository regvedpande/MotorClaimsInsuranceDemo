import { Grid, MenuItem, TextField } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PaymentsIcon from '@mui/icons-material/Payments';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimerIcon from '@mui/icons-material/Timer';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useState } from 'react';
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PageHeader from '../../components/PageHeader.jsx';
import StatCard from '../../components/StatCard.jsx';
import ChartCard from '../../components/ChartCard.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { groupBy, sumBy } from './analyticsUtils.js';
import { formatClaimType } from '../../data/constants.js';

const TYPE_COLORS = ['#2563eb', '#d97706', '#0d9488'];

export default function Overview() {
  const { claims } = useApp();
  const [range, setRange] = useState('30');

  const settled = claims.filter((c) => c.status === 'Settled');
  const rejected = claims.filter((c) => c.status === 'Rejected');

  const timeline = Array.from({ length: 8 }).map((_, i) => ({
    date: `Mar ${i + 1}`,
    Registered: 2 + (i % 4),
    Settled: i % 3
  }));

  const claimTypes = groupBy(claims, 'claimType').map((row) => ({
    ...row,
    name: formatClaimType(row.name)
  }));

  return (
    <>
      <PageHeader
        title="Analytics Overview"
        subtitle="Portfolio performance and claims throughput"
        actions={
          <TextField
            select
            size="small"
            label="Date range"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="7">Last 7 days</MenuItem>
            <MenuItem value="30">Last 30 days</MenuItem>
            <MenuItem value="90">Last 90 days</MenuItem>
          </TextField>
        }
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} md={4} xl={2}>
          <StatCard title="Total Claims" value={claims.length} icon={<AssignmentTurnedInIcon />} color="#0f2d48" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={2}>
          <StatCard title="Settled" value={settled.length} icon={<DoneAllIcon />} color="#16a34a" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={2}>
          <StatCard title="Total Settlement" value={formatCurrency(sumBy(claims, 'netPayable'))} icon={<PaymentsIcon />} color="#0d9488" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={2}>
          <StatCard title="Avg Settlement" value={formatCurrency(Math.round(sumBy(claims, 'netPayable') / claims.length))} icon={<TrendingUpIcon />} color="#2563eb" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={2}>
          <StatCard title="Avg TAT" value={`8 days`} subtitle="Turnaround time" icon={<TimerIcon />} color="#d97706" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={2}>
          <StatCard title="Rejection Rate" value={`${Math.round((rejected.length / claims.length) * 100)}%`} icon={<ReportProblemIcon />} color="#dc2626" />
        </Grid>

        <Grid item xs={12} md={7}>
          <ChartCard title="Claims Registered vs Settled" subtitle="Daily activity over selected period">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeline} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ stroke: '#e2e8f0' }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '0.8125rem' }} />
                <Line dataKey="Registered" stroke="#2563eb" strokeWidth={2.5} dot={false} />
                <Line dataKey="Settled" stroke="#16a34a" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={5}>
          <ChartCard title="Claim Type Distribution" subtitle="Breakdown by claim category">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={claimTypes}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                >
                  {claimTypes.map((_, i) => <Cell key={i} fill={TYPE_COLORS[i % TYPE_COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '0.8125rem' }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </>
  );
}
