import { Alert, Button, Card, CardContent, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ConfirmDialog from '../../components/ConfirmDialog.jsx';
import PageHeader from '../../components/PageHeader.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';

export default function ActiveSurvey() {
  const { id } = useParams();
  const { claims, updateClaim, updateClaimStatus, notify } = useApp();
  const claim = claims.find((c) => c.claimNumber === id) || claims[0];
  const [photos, setPhotos] = useState(['Front', 'Rear', 'Left', 'Right', 'Engine']);
  const [report, setReport] = useState({ damage: '', preExisting: false, time: '3 days', remarks: '' });
  const [items, setItems] = useState(claim.lineItems.length ? claim.lineItems : []);
  const [confirm, setConfirm] = useState(false);
  const [reduceDraft, setReduceDraft] = useState(null);
  const [rejectDraft, setRejectDraft] = useState(null);
  const total = useMemo(() => items.reduce((sum, item) => sum + (item.status === 'Approved' ? item.admissible : 0), 0), [items]);
  const setStatus = (targetId, status, overrides = {}) => setItems((current) => current.map((item) => item.id === targetId ? {
    ...item,
    status,
    admissible: status === 'Rejected' ? 0 : overrides.admissible ?? item.billed,
    rejectionReason: status === 'Rejected' ? overrides.rejectionReason || 'Surveyor rejected item' : overrides.rejectionReason ?? item.rejectionReason
  } : item));
  const handleSubmitAttempt = () => {
    if (photos.length < 5) {
      notify('Upload at least 5 survey photos before submitting', 'error');
      return;
    }
    if (!report.damage.trim() || !report.remarks.trim()) {
      notify('Damage description and surveyor remarks are required', 'error');
      return;
    }
    setConfirm(true);
  };
  return (
    <>
      <PageHeader title="Active Survey" subtitle={`${claim.claimNumber} | ${claim.accidentLocation}`} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}><Card><CardContent><Typography variant="h6">Photo Upload</Typography><Typography color="text.secondary" sx={{ mb: 2 }}>{photos.length} of 7 photos uploaded</Typography><Grid container spacing={1}>{['Front', 'Rear', 'Left', 'Right', 'Engine', 'Interior', 'Damage Close-up'].map((slot) => <Grid item xs={6} key={slot}><Button fullWidth variant={photos.includes(slot) ? 'contained' : 'outlined'} sx={{ height: 76 }} onClick={() => { setPhotos((p) => p.includes(slot) ? p : [...p, slot]); notify(`${slot} photo uploaded`); }}>{slot}</Button></Grid>)}</Grid></CardContent></Card></Grid>
        <Grid item xs={12} md={7}><Card><CardContent><Stack spacing={2}><TextField label="Damage description" multiline rows={3} value={report.damage} onChange={(e) => setReport({ ...report, damage: e.target.value })} /><Stack direction="row" alignItems="center"><Checkbox checked={report.preExisting} onChange={(e) => setReport({ ...report, preExisting: e.target.checked })} />Pre-existing damage observed</Stack><TextField select label="Estimated repair time" value={report.time} onChange={(e) => setReport({ ...report, time: e.target.value })}>{['2 days', '3 days', '5 days', '7 days'].map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}</TextField><TextField label="Surveyor remarks" multiline rows={2} value={report.remarks} onChange={(e) => setReport({ ...report, remarks: e.target.value })} /></Stack></CardContent></Card></Grid>
        <Grid item xs={12}><Paper sx={{ overflowX: 'auto' }}><Table><TableHead><TableRow><TableCell>Item</TableCell><TableCell>Billed</TableCell><TableCell>Status</TableCell><TableCell>Admissible</TableCell><TableCell>Actions</TableCell></TableRow></TableHead><TableBody>{items.map((item) => <TableRow key={item.id}><TableCell>{item.description}</TableCell><TableCell>{formatCurrency(item.billed)}</TableCell><TableCell>{item.status}</TableCell><TableCell>{formatCurrency(item.admissible)}</TableCell><TableCell><Button onClick={() => setStatus(item.id, 'Approved', { admissible: item.billed, rejectionReason: null })}>Approve</Button><Button onClick={() => setReduceDraft({ id: item.id, description: item.description, billed: item.billed, admissible: item.admissible || item.billed })}>Reduce</Button><Button color="error" onClick={() => setRejectDraft({ id: item.id, description: item.description, reason: item.rejectionReason || '' })}>Reject</Button></TableCell></TableRow>)}</TableBody></Table></Paper><Alert severity="info" sx={{ mt: 2 }}>Running approved total: {formatCurrency(total)}</Alert><Button variant="contained" color="success" sx={{ mt: 2 }} onClick={handleSubmitAttempt}>Submit Survey Report</Button></Grid>
      </Grid>
      <ConfirmDialog open={confirm} title="Submit survey report" description="BizTalk will notify the claims desk and move the claim to Documents Complete." confirmLabel="Submit Report" onClose={() => setConfirm(false)} onConfirm={() => { updateClaim(claim.claimNumber, { lineItems: items, estimatedLoss: total }); updateClaimStatus(claim.claimNumber, 'DocumentsComplete', 'Amit Patel', 'SurveyorPortal'); notify('Survey report submitted. BizTalk will notify the claims desk.'); setConfirm(false); }} />
      <Dialog open={Boolean(reduceDraft)} onClose={() => setReduceDraft(null)} fullWidth maxWidth="xs">
        <DialogTitle>Reduce line item amount</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Typography>{reduceDraft?.description}</Typography>
            <Typography color="text.secondary">Billed amount: {formatCurrency(reduceDraft?.billed || 0)}</Typography>
            <TextField
              label="Approved amount"
              type="number"
              value={reduceDraft?.admissible ?? ''}
              onChange={(e) => setReduceDraft((current) => ({ ...current, admissible: Number(e.target.value) }))}
              inputProps={{ min: 0, max: reduceDraft?.billed || 0 }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReduceDraft(null)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              const amount = Math.min(Math.max(Number(reduceDraft?.admissible || 0), 0), Number(reduceDraft?.billed || 0));
              setStatus(reduceDraft.id, 'Approved', { admissible: amount, rejectionReason: null });
              notify('Line item reduced successfully');
              setReduceDraft(null);
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={Boolean(rejectDraft)} onClose={() => setRejectDraft(null)} fullWidth maxWidth="xs">
        <DialogTitle>Reject line item</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Typography>{rejectDraft?.description}</Typography>
            <TextField
              label="Rejection reason"
              value={rejectDraft?.reason ?? ''}
              onChange={(e) => setRejectDraft((current) => ({ ...current, reason: e.target.value }))}
              multiline
              rows={3}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectDraft(null)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              if (!rejectDraft?.reason?.trim()) {
                notify('Enter a rejection reason', 'error');
                return;
              }
              setStatus(rejectDraft.id, 'Rejected', { rejectionReason: rejectDraft.reason.trim() });
              notify('Line item rejected');
              setRejectDraft(null);
            }}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
