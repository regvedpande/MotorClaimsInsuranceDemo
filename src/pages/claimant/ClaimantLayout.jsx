import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TimelineIcon from '@mui/icons-material/Timeline';
import FolderIcon from '@mui/icons-material/Folder';
import PortalLayout from '../../components/PortalLayout.jsx';

export default function ClaimantLayout() {
  return <PortalLayout title="Claimant Portal" subtitle="Welcome, Rahul Sharma" navItems={[
    { label: 'My Claims', to: '/claimant', icon: <DirectionsCarIcon /> },
    { label: 'File New Claim', shortLabel: 'File', to: '/claimant/file-claim', icon: <AddCircleIcon /> },
    { label: 'Track Status', shortLabel: 'Track', to: '/claimant/track/MOT-2024-045231', icon: <TimelineIcon /> },
    { label: 'Documents', shortLabel: 'Docs', to: '/claimant/documents', icon: <FolderIcon /> }
  ]} />;
}
