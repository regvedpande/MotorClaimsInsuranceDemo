import { Chip } from '@mui/material';
import { STATUS_LABELS } from '../data/constants.js';

const statusStyles = {
  Registered: { bg: '#e5e7eb', color: '#374151' },
  EligibilityPassed: { bg: '#dbeafe', color: '#1d4ed8' },
  SurveyorAssigned: { bg: '#cffafe', color: '#0e7490' },
  UnderSurvey: { bg: '#ede9fe', color: '#6d28d9' },
  DocumentsComplete: { bg: '#e0e7ff', color: '#4338ca' },
  UnderAssessment: { bg: '#ffedd5', color: '#c2410c' },
  QueryRaised: { bg: '#fef3c7', color: '#b45309' },
  Approved: { bg: '#dcfce7', color: '#15803d' },
  CashlessAuthorised: { bg: '#ccfbf1', color: '#0f766e' },
  Settled: { bg: '#bbf7d0', color: '#166534' },
  PendingNonTraceable: { bg: '#ede0d4', color: '#7c2d12' },
  Rejected: { bg: '#fee2e2', color: '#b91c1c' }
};

export default function StatusChip({ status, size = 'small' }) {
  const style = statusStyles[status] || statusStyles.Registered;
  return <Chip label={STATUS_LABELS[status] || status} size={size} sx={{ bgcolor: style.bg, color: style.color }} />;
}
