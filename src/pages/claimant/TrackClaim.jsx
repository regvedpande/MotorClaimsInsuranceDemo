import { Card, CardContent, Step, StepLabel, Stepper, Typography, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import PageHeader from '../../components/PageHeader.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { STATUS_FLOW } from '../../data/constants.js';
import { formatDateTime } from '../../utils/formatDate.js';

const labels = ['Filed', 'Eligibility Check', 'Surveyor Assigned', 'Survey Done', 'Documents Complete', 'Under Assessment', 'Approved', 'Settled'];

export default function TrackClaim() {
  const { id } = useParams();
  const { claims } = useApp();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const claim = claims.find((c) => c.claimNumber === id) || claims[0];
  const active = Math.max(STATUS_FLOW.indexOf(claim.status), 0);
  return (
    <>
      <PageHeader title="Track Claim Status" subtitle={`${claim.claimNumber} | ${claim.vehicleReg}`} />
      <Card><CardContent><Stepper activeStep={active} orientation={mobile ? 'vertical' : 'horizontal'} alternativeLabel={!mobile}>{labels.map((label, index) => {
        const history = claim.statusHistory.find((h) => h.status === STATUS_FLOW[index]);
        return <Step key={label}><StepLabel StepIconProps={{ className: index === active ? 'pulse-dot' : '' }}><Typography fontWeight={800}>{label}</Typography>{history && <Typography variant="caption">{formatDateTime(history.changedAt)}</Typography>}</StepLabel></Step>;
      })}</Stepper></CardContent></Card>
    </>
  );
}
