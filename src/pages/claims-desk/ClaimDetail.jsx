import { Box, Button, Card, CardContent, Chip, Dialog, DialogContent, Grid, Paper, Step, StepLabel, Stepper, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import StatusChip from '../../components/StatusChip.jsx';
import DocumentStatusChip from '../../components/DocumentStatusChip.jsx';
import ConfirmDialog from '../../components/ConfirmDialog.jsx';
import SettlementBreakdown from '../../components/SettlementBreakdown.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { formatDate, formatDateTime } from '../../utils/formatDate.js';

export default function ClaimDetail() {
  const { id } = useParams();
  const { claims, updateClaimStatus, notify } = useApp();
  const claim = claims.find((c) => c.claimNumber === id) || claims[0];
  const [tab, setTab] = useState(0);
  const [docOpen, setDocOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  return (
    <>
      <PageHeader title={claim.claimNumber} subtitle={`${claim.customerName} | ${claim.vehicleReg}`} actions={<StatusChip status={claim.status} />} />
      <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" sx={{ mb: 2 }}>
        {['Overview', 'Timeline', 'Documents', 'Survey & Estimate', 'Settlement Calculation'].map((label) => <Tab key={label} label={label} />)}
      </Tabs>
      {tab === 0 && <Grid container spacing={2}>{[
        ['Claim Info', [['Type', claim.claimType], ['Status', <StatusChip status={claim.status} />], ['Accident Date', formatDate(claim.accidentDate)], ['Ageing', `${claim.ageingDays} days`]]],
        ['Customer Info', [['Name', claim.customerName], ['Phone', claim.customerPhone], ['Email', claim.customerEmail]]],
        ['Vehicle Info', [['Reg', claim.vehicleReg], ['Make', claim.vehicleMake], ['Model', claim.vehicleModel], ['Year', claim.vehicleYear], ['IDV', formatCurrency(claim.idv)]]],
        ['Policy Info', [['Policy', claim.policyNumber], ['Coverage', claim.coverage.join(', ')], ['Excess', formatCurrency(claim.compulsoryExcess)], ['Hypothecation', claim.hypothecation || 'None']]]
      ].map(([title, rows]) => <Grid item xs={12} md={3} key={title}><Card><CardContent><Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>{rows.map(([k, v]) => <Typography key={k} sx={{ mb: 1 }}><b>{k}:</b> {v}</Typography>)}</CardContent></Card></Grid>)}</Grid>}
      {tab === 1 && <Card><CardContent><Stepper activeStep={claim.statusHistory.length - 1} orientation="vertical">{claim.statusHistory.map((item, index) => <Step key={`${item.status}-${index}`} completed={index < claim.statusHistory.length - 1}><StepLabel StepIconProps={{ className: index === claim.statusHistory.length - 1 ? 'pulse-dot' : '' }}><Typography fontWeight={800}>{item.status}</Typography><Typography variant="body2" color="text.secondary">{formatDateTime(item.changedAt)} | {item.changedBy} | {item.source}</Typography></StepLabel></Step>)}</Stepper></CardContent></Card>}
      {tab === 2 && <Paper sx={{ overflowX: 'auto' }}><Table><TableHead><TableRow><TableCell>Document Type</TableCell><TableCell>Uploaded By</TableCell><TableCell>Status</TableCell><TableCell>Action</TableCell></TableRow></TableHead><TableBody>{claim.documents.map((doc) => <TableRow key={doc.type}><TableCell>{doc.type}</TableCell><TableCell>{doc.uploadedBy}</TableCell><TableCell><DocumentStatusChip status={doc.status} /></TableCell><TableCell><Button onClick={() => setDocOpen(true)}>View</Button><Button onClick={() => notify('Document uploaded successfully')}>Upload</Button></TableCell></TableRow>)}</TableBody></Table></Paper>}
      {tab === 3 && <Grid container spacing={2}><Grid item xs={12} md={4}><Card><CardContent><Typography variant="h6">Surveyor</Typography><Typography>{claim.assignedSurveyor}</Typography><Typography>{claim.surveyorPhone}</Typography><Typography>Assigned: {formatDateTime(claim.statusHistory[2]?.changedAt)}</Typography></CardContent></Card></Grid><Grid item xs={12} md={8}><Paper sx={{ overflowX: 'auto' }}><Table><TableHead><TableRow><TableCell>Item Description</TableCell><TableCell>Category</TableCell><TableCell>Billed</TableCell><TableCell>Status</TableCell><TableCell>Admissible</TableCell><TableCell>Reason</TableCell></TableRow></TableHead><TableBody>{claim.lineItems.map((item) => <TableRow key={item.id} sx={{ bgcolor: item.status === 'Approved' ? '#f0fdf4' : '#fef2f2' }}><TableCell>{item.description}</TableCell><TableCell>{item.category}</TableCell><TableCell>{formatCurrency(item.billed)}</TableCell><TableCell><Chip size="small" label={item.status} color={item.status === 'Approved' ? 'success' : 'error'} /></TableCell><TableCell>{formatCurrency(item.admissible)}</TableCell><TableCell>{item.rejectionReason || 'Accident related'}</TableCell></TableRow>)}</TableBody></Table></Paper></Grid><Grid item xs={12}><SettlementBreakdown claim={claim} /></Grid></Grid>}
      {tab === 4 && <Card><CardContent><Typography variant="h6" sx={{ mb: 1 }}>Settlement Formula</Typography><Chip label={claim.settlementMode} color={claim.settlementMode === 'Cashless' ? 'secondary' : 'primary'} sx={{ mb: 2 }} /><SettlementBreakdown claim={claim} /><Button variant="contained" sx={{ mt: 2 }} onClick={() => setConfirmOpen(true)}>Approve Settlement</Button></CardContent></Card>}
      <Dialog open={docOpen} onClose={() => setDocOpen(false)}><DialogContent><Box sx={{ width: 420, maxWidth: '80vw', height: 260, bgcolor: '#e2e8f0', display: 'grid', placeItems: 'center', borderRadius: 2 }}><Typography>Document Preview</Typography></Box></DialogContent></Dialog>
      <ConfirmDialog open={confirmOpen} title="Approve settlement" description="This will move the claim to Approved and notify downstream systems." confirmLabel="Approve" onClose={() => setConfirmOpen(false)} onConfirm={() => { updateClaimStatus(claim.claimNumber, 'Approved'); notify('Claim approved successfully'); setConfirmOpen(false); }} />
    </>
  );
}
