import { Button, Dialog, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import PageHeader from '../../components/PageHeader.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { formatDate } from '../../utils/formatDate.js';

export default function CashlessAuths() {
  const { claims } = useApp();
  const [claim, setClaim] = useState(null);
  const auths = claims.filter((c) => c.settlementMode === 'Cashless');
  return (
    <>
      <PageHeader title="Cashless Authorisations" subtitle="Authorisation letters issued to garage partners" />
      <Paper sx={{ overflowX: 'auto' }}><Table><TableHead><TableRow><TableCell>Auth Code</TableCell><TableCell>Claim No</TableCell><TableCell>Customer</TableCell><TableCell>Amount</TableCell><TableCell>Valid Till</TableCell><TableCell>Status</TableCell><TableCell>Action</TableCell></TableRow></TableHead><TableBody>{auths.map((a, index) => <TableRow key={a.claimNumber}><TableCell>{a.authCode}</TableCell><TableCell>{a.claimNumber}</TableCell><TableCell>{a.customerName}</TableCell><TableCell>{formatCurrency(a.netPayable)}</TableCell><TableCell>{formatDate('2024-04-30')}</TableCell><TableCell>{index % 5 === 0 ? 'Used' : 'Active'}</TableCell><TableCell><Button onClick={() => setClaim(a)}>View Auth Letter</Button></TableCell></TableRow>)}</TableBody></Table></Paper>
      <Dialog open={Boolean(claim)} onClose={() => setClaim(null)} fullWidth maxWidth="md"><DialogTitle>Reliance General Insurance - Cashless Authorisation</DialogTitle><DialogContent>{claim && <><Typography variant="h5">{claim.authCode}</Typography><Typography>Claim: {claim.claimNumber} | Customer: {claim.customerName}</Typography><Typography sx={{ mt: 2 }}>Approved line items: {claim.lineItems.filter((i) => i.status === 'Approved').map((i) => i.description).join(', ')}</Typography><Typography variant="h6" sx={{ mt: 2 }}>Insurer shall pay: {formatCurrency(claim.netPayable)}</Typography><Typography>Customer to pay at delivery: {formatCurrency(claim.customerPays)} (excess + inadmissibles)</Typography><Typography>Valid till: 30-Apr-2024</Typography></>}</DialogContent></Dialog>
    </>
  );
}
