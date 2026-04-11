import InsightsIcon from '@mui/icons-material/Insights';
import BarChartIcon from '@mui/icons-material/BarChart';
import PaidIcon from '@mui/icons-material/Paid';
import MapIcon from '@mui/icons-material/Map';
import WarningIcon from '@mui/icons-material/Warning';
import PortalLayout from '../../components/PortalLayout.jsx';

export default function AnalyticsLayout() {
  return <PortalLayout title="Analytics Dashboard" subtitle="Management KPIs and portfolio signals" navItems={[
    { label: 'Overview', to: '/analytics', icon: <InsightsIcon /> },
    { label: 'Claims Analysis', shortLabel: 'Claims', to: '/analytics/claims', icon: <BarChartIcon /> },
    { label: 'Settlement Analysis', shortLabel: 'Settle', to: '/analytics/settlement', icon: <PaidIcon /> },
    { label: 'Regional Performance', shortLabel: 'Region', to: '/analytics/regional', icon: <MapIcon /> },
    { label: 'Ageing Report', shortLabel: 'Ageing', to: '/analytics/ageing', icon: <WarningIcon /> }
  ]} />;
}
