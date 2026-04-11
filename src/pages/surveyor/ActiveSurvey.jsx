import { Alert, Button, Card, CardContent, Checkbox, Grid, MenuItem, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ConfirmDialog from '../../components/ConfirmDialog.jsx';
import PageHeader from '../../components/PageHeader.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';

export default function ActiveSurvey() {
  const { id } = useParams();
  const { claims, updateClaimStatus, notify } = useApp();
  const claim = claims.find((c) => c.claimNumber === id) || claims[0];
  const [photos, setPhotos] = useState(['Front', 'Rear', 'Left', 'Right', 'Engine']);
  const [report, setReport] = useState({ damage: '', preExisting: false, time: '3 days', remarks: '' });
  const [items, setItems] = useState(claim.lineItems.length ? claim.lineItems : []);
  const [confirm, setConfirm] = useState(false);
  const total = useMemo(() => items.reduce((sum, item) => sum + (item.status === 'Approved' ? item.admissible : 0), 0), [items]);
  const setStatus = (id, status) => setItems((current) => current.map((item) => item.id === id ? { ...item, status, admissible: status === 'Rejected' ? 0 : item.billed } : item));
  return (
    <>
      <PageHeader title="Active Survey" subtitle={`${claim.claimNumber} | ${claim.accidentLocation}`} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}><Card><CardContent><Typography variant="h6">Photo Upload</Typography><Typography color="text.secondary" sx={{ mb: 2 }}>{photos.length} of 7 photos uploaded</Typography><Grid container spacing={1}>{['Front', 'Rear', 'Left', 'Right', 'Engine', 'Interior', 'Damage Close-up'].map((slot) => <Grid item xs={6} key={slot}><Button fullWidth variant={photos.includes(slot) ? 'contained' : 'outlined'} sx={{ height: 76 }} onClick={() => { setPhotos((p) => p.includes(slot) ? p : [...p, slot]); notify(`${slot} photo uploaded`); }}>{slot}</Button></Grid>)}</Grid></CardContent></Card></Grid>
        <Grid item xs={12} md={7}><Card><CardContent><Stack spacing={2}><TextField label="Damage description" multiline rows={3} value={report.damage} onChange={(e) => setReport({ ...report, damage: e.target.value })} /><Stack direction="row" alignItems="center"><Checkbox checked={report.preExisting} onChange={(e) => setReport({ ...report, preExisting: e.target.checked })} />Pre-existing damage observed</Stack><TextField select label="Estimated repair time" value={report.time} onChange={(e) => setReport({ ...report, time: e.target.value })}>{['2 days', '3 days', '5 days', '7 days'].map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}</TextField><TextField label="Surveyor remarks" multiline rows={2} value={report.remarks} onChange={(e) => setReport({ ...report, remarks: e.target.value })} /></Stack></CardContent></Card></Grid>
        <Grid item xs={12}><Paper sx={{ overflowX: 'auto' }}><Table><TableHead><TableRow><TableCell>Item</TableCell><TableCell>Billed</TableCell><TableCell>Status</TableCell><TableCell>Admissible</TableCell><TableCell>Actions</TableCell></TableRow></TableHead><TableBody>{items.map((item) => <TableRow key={item.id}><TableCell>{item.description}</TableCell><TableCell>{formatCurrency(item.billed)}</TableCell><TableCell>{item.status}</TableCell><TableCell>{formatCurrency(item.admissible)}</TableCell><TableCell><Button onClick={() => setStatus(item.id, 'Approved')}>Approve</Button><Button onClick={() => setStatus(item.id, 'Approved')}>Reduce</Button><Button color="error" onClick={() => setStatus(item.id, 'Rejected')}>Reject</Button></TableCell></TableRow>)}</TableBody></Table></Paper><Alert severity="info" sx={{ mt: 2 }}>Running approved total: {formatCurrency(total)}</Alert><Button variant="contained" color="success" sx={{ mt: 2 }} onClick={() => setConfirm(true)}>Submit Survey Report</Button></Grid>
      </Grid>
      <ConfirmDialog open={confirm} title="Submit survey report" description="BizTalk will notify the claims desk and move the claim to Documents Complete." confirmLabel="Submit Report" onClose={() => setConfirm(false)} onConfirm={() => { updateClaimStatus(claim.claimNumber, 'DocumentsComplete', 'Amit Patel', 'SurveyorPortal'); notify('Survey report submitted. BizTalk will notify the claims desk.'); setConfirm(false); }} />
    </>
  );
}
