import { Box, Grid, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PaidIcon from '@mui/icons-material/Paid';
import SpeedIcon from '@mui/icons-material/Speed';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PageHeader from '../../components/PageHeader.jsx';
import StatCard from '../../components/StatCard.jsx';
import ChartCard from '../../components/ChartCard.jsx';
import StatusChip from '../../components/StatusChip.jsx';
import LoadingState from '../../components/LoadingState.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';
import useBriefLoading from '../../hooks/useBriefLoading.js';
import { formatClaimType } from '../../data/constants.js';

const CHART_COLORS = ['#2563eb', '#d97706', '#0d9488', '#7c3aed', '#dc2626', '#ea580c'];

function groupBy(items, key) {
  const counts = items.reduce((acc, item) => {
    const k = item[key];
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).map(([name, value]) => ({
    name: key === 'claimType' ? formatClaimType(name) : name,
    value
  }));
}

export default function Dashboard() {
  const { claims } = useApp();
  const loading = useBriefLoading();

  if (loading) {
    return (
      <>
        <PageHeader title="Claims Dashboard" subtitle="Operational snapshot across all motor claims" />
        <LoadingState rows={6} />
      </>
    );
  }

  const openClaims = claims.filter((c) => !['Settled', 'Rejected'].includes(c.status));
  const settled = claims.filter((c) => c.status === 'Settled');
  const avgSettlement = Math.round(claims.reduce((sum, c) => sum + c.netPayable, 0) / claims.length);

  const claimsByType = groupBy(claims, 'claimType');
  const claimsByStatus = groupBy(claims, 'status');
  const claimsByRegion = groupBy(claims, 'region');
  const ageingClaims = claims.slice().sort((a, b) => b.ageingDays - a.ageingDays).slice(0, 10);

  return (
    <>
      <PageHeader title="Claims Dashboard" subtitle="Operational snapshot across all motor claims" />

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Claims"
            value={claims.length}
            subtitle="All time"
            icon={<AssignmentTurnedInIcon />}
            color="#0f2d48"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Open Claims"
            value={openClaims.length}
            subtitle="Active lifecycle"
            icon={<PendingActionsIcon />}
            color="#d97706"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Settled"
            value={settled.length}
            subtitle="Completed claims"
            icon={<PaidIcon />}
            color="#16a34a"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Avg Settlement"
            value={formatCurrency(avgSettlement)}
            subtitle="Net payable"
            icon={<SpeedIcon />}
            color="#2563eb"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <ChartCard title="Claims by Type">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={claimsByType}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                >
                  {claimsByType.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v, n) => [v, n]} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '0.8125rem' }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <ChartCard title="Claims by Status">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={claimsByStatus} barSize={16} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  angle={-30}
                  textAnchor="end"
                  height={40}
                />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'rgba(37,99,235,0.05)' }} />
                <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <ChartCard title="Claims by Region">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={claimsByRegion}
                layout="vertical"
                margin={{ top: 4, right: 16, bottom: 4, left: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fontSize: 12, fill: '#475569' }}
                  tickLine={false}
                  axisLine={false}
                  width={70}
                />
                <Tooltip cursor={{ fill: 'rgba(13,148,136,0.05)' }} />
                <Bar dataKey="value" fill="#0d9488" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid item xs={12}>
          <Paper>
            <Box sx={{ px: 3, py: 2.5, borderBottom: '1px solid #f1f5f9' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                    Ageing Report — Top 10
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Claims sorted by days outstanding
                  </Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                  <Stack direction="row" spacing={0.75} alignItems="center">
                    <Box sx={{ width: 10, height: 10, borderRadius: 0.5, bgcolor: '#fca5a5' }} />
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>&gt;15 days</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.75} alignItems="center">
                    <Box sx={{ width: 10, height: 10, borderRadius: 0.5, bgcolor: '#fcd34d' }} />
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>7–15 days</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.75} alignItems="center">
                    <Box sx={{ width: 10, height: 10, borderRadius: 0.5, bgcolor: '#e2e8f0' }} />
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>&lt;7 days</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
            <Box sx={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Claim No</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Ageing Days</TableCell>
                    <TableCell>Region</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ageingClaims.map((claim) => (
                    <TableRow
                      key={claim.claimNumber}
                      sx={{
                        bgcolor: claim.ageingDays > 15
                          ? 'rgba(254,226,226,0.55)'
                          : claim.ageingDays >= 7
                            ? 'rgba(254,243,199,0.5)'
                            : 'inherit'
                      }}
                    >
                      <TableCell>{claim.claimNumber}</TableCell>
                      <TableCell>{claim.customerName}</TableCell>
                      <TableCell>{formatClaimType(claim.claimType)}</TableCell>
                      <TableCell><StatusChip status={claim.status} /></TableCell>
                      <TableCell sx={{ fontWeight: 600, color: claim.ageingDays > 15 ? '#dc2626' : claim.ageingDays >= 7 ? '#b45309' : 'text.primary' }}>
                        {claim.ageingDays}
                      </TableCell>
                      <TableCell>{claim.region}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
