import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import PageHeader from '../../components/PageHeader.jsx';
import StatusChip from '../../components/StatusChip.jsx';
import ConfirmDialog from '../../components/ConfirmDialog.jsx';
import SettlementBreakdown from '../../components/SettlementBreakdown.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';

export default function AssessmentQueue() {
  const { claims, updateClaimStatus, notify } = useApp();
  const [action, setAction] = useState(null);
  const queue = claims.filter((claim) => ['UnderAssessment', 'DocumentsComplete'].includes(claim.status));
  const run = () => {
    updateClaimStatus(action.claim.claimNumber, action.status);
    notify(action.status === 'Approved' ? 'Claim approved successfully' : action.status === 'Rejected' ? 'Claim rejected successfully' : 'Query raised successfully', action.status === 'Rejected' ? 'error' : 'success');
    setAction(null);
  };
  return (
    <>
      <PageHeader title="Assessment Queue" subtitle="Claims awaiting desk decision" />
      <Grid container spacing={2}>{queue.map((claim) => <Grid item xs={12} md={6} key={claim.claimNumber}><Card><CardContent><Stack spacing={1}><Stack direction="row" justifyContent="space-between"><Typography variant="h6">{claim.claimNumber}</Typography><StatusChip status={claim.status} /></Stack><Typography>{claim.customerName} | {claim.vehicleReg} | {claim.claimType}</Typography><Typography color={claim.ageingDays > 15 ? 'error.main' : 'text.secondary'}>Ageing: {claim.ageingDays} days | Surveyor: {claim.assignedSurveyor}</Typography><Typography>Documents: {claim.documents.filter((d) => d.status === 'Approved').length}/{claim.documents.length} approved | Estimated settlement {formatCurrency(claim.netPayable)}</Typography><SettlementBreakdown claim={claim} /><Stack direction="row" spacing={1}><Button variant="contained" color="success" onClick={() => setAction({ claim, status: 'Approved' })}>Approve</Button><Button variant="contained" color="warning" onClick={() => setAction({ claim, status: 'QueryRaised' })}>Query</Button><Button variant="contained" color="error" onClick={() => setAction({ claim, status: 'Rejected' })}>Reject</Button></Stack></Stack></CardContent></Card></Grid>)}</Grid>
      <ConfirmDialog open={Boolean(action)} title={`${action?.status || ''} claim`} description={`Confirm action for ${action?.claim?.claimNumber || ''}.`} confirmLabel="Confirm" color={action?.status === 'Rejected' ? 'error' : 'primary'} onClose={() => setAction(null)} onConfirm={run} />
    </>
  );
}
