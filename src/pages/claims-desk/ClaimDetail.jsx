import { Box, Button, Card, CardContent, Chip, Dialog, DialogContent, Grid, Paper, Stack, Step, StepLabel, Stepper, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Typography } from '@mui/material';
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

function InfoRow({ label, value }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} sx={{ py: 1, borderBottom: '1px solid #f8fafc' }}>
      <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0, fontWeight: 500 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ textAlign: 'right', fontWeight: 600, color: 'text.primary' }}>
        {value}
      </Typography>
    </Stack>
  );
}

function InfoCard({ title, rows }) {
  return (
    <Card>
      <CardContent sx={{ pb: '16px !important' }}>
        <Typography variant="overline" color="text.secondary" sx={{ mb: 1.5, display: 'block' }}>
          {title}
        </Typography>
        {rows.map(([k, v]) => <InfoRow key={k} label={k} value={v} />)}
      </CardContent>
    </Card>
  );
}

export default function ClaimDetail() {
  const { id } = useParams();
  const { claims, updateClaimStatus, notify } = useApp();
  const claim = claims.find((c) => c.claimNumber === id) || claims[0];
  const [tab, setTab] = useState(0);
  const [docOpen, setDocOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <PageHeader
        title={claim.claimNumber}
        subtitle={`${claim.customerName} · ${claim.vehicleReg} · ${claim.vehicleMake} ${claim.vehicleModel}`}
        actions={<StatusChip status={claim.status} size="medium" />}
      />

      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        {['Overview', 'Timeline', 'Documents', 'Survey & Estimate', 'Settlement'].map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>

      {/* Tab 0 – Overview */}
      {tab === 0 && (
        <Grid container spacing={2.5}>
          <Grid item xs={12} sm={6} md={3}>
            <InfoCard
              title="Claim Info"
              rows={[
                ['Type', claim.claimType],
                ['Status', <StatusChip status={claim.status} key="status" />],
                ['Accident Date', formatDate(claim.accidentDate)],
                ['Ageing', `${claim.ageingDays} days`]
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoCard
              title="Customer"
              rows={[
                ['Name', claim.customerName],
                ['Phone', claim.customerPhone],
                ['Email', claim.customerEmail]
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoCard
              title="Vehicle"
              rows={[
                ['Registration', claim.vehicleReg],
                ['Make', claim.vehicleMake],
                ['Model', claim.vehicleModel],
                ['Year', claim.vehicleYear],
                ['IDV', formatCurrency(claim.idv)]
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoCard
              title="Policy"
              rows={[
                ['Policy No', claim.policyNumber],
                ['Coverage', claim.coverage.join(', ')],
                ['Excess', formatCurrency(claim.compulsoryExcess)],
                ['Hypothecation', claim.hypothecation || 'None']
              ]}
            />
          </Grid>
        </Grid>
      )}

      {/* Tab 1 – Timeline */}
      {tab === 1 && (
        <Card>
          <CardContent>
            <Stepper activeStep={claim.statusHistory.length - 1} orientation="vertical">
              {claim.statusHistory.map((item, index) => (
                <Step key={`${item.status}-${index}`} completed={index < claim.statusHistory.length - 1}>
                  <StepLabel
                    StepIconProps={{ className: index === claim.statusHistory.length - 1 ? 'pulse-dot' : '' }}
                  >
                    <Typography fontWeight={700}>{item.status}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDateTime(item.changedAt)} · {item.changedBy} · {item.source}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>
      )}

      {/* Tab 2 – Documents */}
      {tab === 2 && (
        <Paper>
          <Box sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Document Type</TableCell>
                  <TableCell>Uploaded By</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {claim.documents.map((doc) => (
                  <TableRow key={doc.type}>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.uploadedBy}</TableCell>
                    <TableCell><DocumentStatusChip status={doc.status} /></TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button size="small" onClick={() => setDocOpen(true)}>View</Button>
                        <Button size="small" variant="outlined" onClick={() => notify('Document uploaded successfully')}>Upload</Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      )}

      {/* Tab 3 – Survey & Estimate */}
      {tab === 3 && (
        <Grid container spacing={2.5}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="overline" color="text.secondary" sx={{ mb: 1.5, display: 'block' }}>
                  Assigned Surveyor
                </Typography>
                <Typography variant="h6" fontWeight={700}>{claim.assignedSurveyor}</Typography>
                <Typography color="text.secondary" sx={{ mt: 0.5 }}>{claim.surveyorPhone}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                  Assigned: {formatDateTime(claim.statusHistory[2]?.changedAt)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper>
              <Box sx={{ overflowX: 'auto' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item Description</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Billed</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Admissible</TableCell>
                      <TableCell>Reason</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {claim.lineItems.map((item) => (
                      <TableRow
                        key={item.id}
                        sx={{ bgcolor: item.status === 'Approved' ? 'rgba(240,253,244,0.7)' : 'rgba(254,242,242,0.5)' }}
                      >
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{formatCurrency(item.billed)}</TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={item.status}
                            color={item.status === 'Approved' ? 'success' : 'error'}
                          />
                        </TableCell>
                        <TableCell>{formatCurrency(item.admissible)}</TableCell>
                        <TableCell>{item.rejectionReason || 'Accident related'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <SettlementBreakdown claim={claim} />
          </Grid>
        </Grid>
      )}

      {/* Tab 4 – Settlement */}
      {tab === 4 && (
        <Grid container spacing={2.5}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="overline" color="text.secondary" sx={{ mb: 1.5, display: 'block' }}>
                  Settlement Mode
                </Typography>
                <Chip
                  label={claim.settlementMode}
                  color={claim.settlementMode === 'Cashless' ? 'secondary' : 'primary'}
                  sx={{ mb: 2.5, fontWeight: 700 }}
                />
                <SettlementBreakdown claim={claim} />
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setConfirmOpen(true)}
                    sx={{ fontWeight: 700 }}
                  >
                    Approve Settlement
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Document preview dialog */}
      <Dialog open={docOpen} onClose={() => setDocOpen(false)}>
        <DialogContent>
          <Box
            sx={{
              width: 420,
              maxWidth: '80vw',
              height: 260,
              bgcolor: '#f1f5f9',
              display: 'grid',
              placeItems: 'center',
              borderRadius: 2
            }}
          >
            <Typography color="text.secondary">Document Preview</Typography>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Settlement confirm dialog */}
      <ConfirmDialog
        open={confirmOpen}
        title="Approve settlement"
        description="This will move the claim to Approved and notify downstream systems."
        confirmLabel="Approve"
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          updateClaimStatus(claim.claimNumber, 'Approved');
          notify('Claim approved successfully');
          setConfirmOpen(false);
        }}
      />
    </>
  );
}
