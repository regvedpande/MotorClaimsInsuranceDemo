import { Chip } from '@mui/material';

const map = {
  Approved: { bg: '#dcfce7', color: '#15803d' },
  PendingReview: { bg: '#ffedd5', color: '#c2410c' },
  Rejected: { bg: '#fee2e2', color: '#b91c1c' }
};

export default function DocumentStatusChip({ status }) {
  const style = map[status] || map.PendingReview;
  return <Chip size="small" label={status} sx={{ bgcolor: style.bg, color: style.color }} />;
}
