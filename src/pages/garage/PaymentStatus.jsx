import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import PageHeader from '../../components/PageHeader.jsx';
import { payments } from '../../data/mockData.js';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { formatDate } from '../../utils/formatDate.js';

export default function PaymentStatus() {
  return (
    <>
      <PageHeader title="Payment Status" subtitle="Settled claims and NEFT references" />
      <Paper sx={{ overflowX: 'auto' }}><Table><TableHead><TableRow><TableCell>Claim No</TableCell><TableCell>Customer</TableCell><TableCell>Amount Received</TableCell><TableCell>Transaction Date</TableCell><TableCell>Bank Reference</TableCell></TableRow></TableHead><TableBody>{payments.map((p) => <TableRow key={p.claimNumber}><TableCell>{p.claimNumber}</TableCell><TableCell>{p.customerName}</TableCell><TableCell>{formatCurrency(p.amount)}</TableCell><TableCell>{formatDate(p.transactionDate)}</TableCell><TableCell>{p.bankReference}</TableCell></TableRow>)}</TableBody></Table></Paper>
    </>
  );
}
