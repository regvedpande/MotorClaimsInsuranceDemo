import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PaymentsIcon from '@mui/icons-material/Payments';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PortalLayout from '../../components/PortalLayout.jsx';

export default function ClaimsDeskLayout() {
  const navItems = [
    { label: 'Dashboard', shortLabel: 'Home', to: '/claims-desk', icon: <DashboardIcon /> },
    { label: 'All Claims', shortLabel: 'Claims', to: '/claims-desk/claims', icon: <ListAltIcon /> },
    { label: 'Assessment Queue', shortLabel: 'Queue', to: '/claims-desk/assessment', icon: <FactCheckIcon /> },
    { label: 'Settlement Approval', shortLabel: 'Settle', to: '/claims-desk/settlement', icon: <PaymentsIcon /> },
    { label: 'Reports', shortLabel: 'Reports', to: '/claims-desk/reports', icon: <AssessmentIcon /> }
  ];
  return <PortalLayout title="Claims Desk" subtitle="Internal operations command centre" navItems={navItems} />;
}
