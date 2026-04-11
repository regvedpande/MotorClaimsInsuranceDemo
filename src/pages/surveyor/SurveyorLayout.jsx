import AssignmentIcon from '@mui/icons-material/Assignment';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import HistoryIcon from '@mui/icons-material/History';
import PortalLayout from '../../components/PortalLayout.jsx';

export default function SurveyorLayout() {
  return <PortalLayout title="Surveyor Portal" subtitle="Amit Patel | Surveyor ID: SUR-001 | Mumbai Region" navItems={[
    { label: 'My Assignments', shortLabel: 'Jobs', to: '/surveyor', icon: <AssignmentIcon /> },
    { label: 'Active Survey', shortLabel: 'Survey', to: '/surveyor/active/MOT-2024-045231', icon: <CameraAltIcon /> },
    { label: 'Submit Report', shortLabel: 'Report', to: '/surveyor/active/MOT-2024-045231', icon: <AssignmentIcon /> },
    { label: 'History', to: '/surveyor/history', icon: <HistoryIcon /> }
  ]} />;
}
