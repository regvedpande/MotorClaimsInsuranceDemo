import DashboardIcon from '@mui/icons-material/Dashboard';
import BuildIcon from '@mui/icons-material/Build';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import VerifiedIcon from '@mui/icons-material/Verified';
import PaymentsIcon from '@mui/icons-material/Payments';
import PortalLayout from '../../components/PortalLayout.jsx';

export default function GarageLayout() {
  return <PortalLayout title="Garage Portal" subtitle="AutoCare Mumbai | GRG-MUM-001 | Manager: Rajesh Kumar" navItems={[
    { label: 'Dashboard', to: '/garage', icon: <DashboardIcon /> },
    { label: 'Active Claims', shortLabel: 'Claims', to: '/garage/claims', icon: <BuildIcon /> },
    { label: 'Submit Estimate', shortLabel: 'Estimate', to: '/garage/estimate/MOT-2024-045231', icon: <RequestQuoteIcon /> },
    { label: 'Cashless Authorisations', shortLabel: 'Auths', to: '/garage/authorisations', icon: <VerifiedIcon /> },
    { label: 'Payment Status', shortLabel: 'Pay', to: '/garage/payments', icon: <PaymentsIcon /> }
  ]} />;
}
