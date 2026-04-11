import { Alert, Button, Card, CardContent, Grid, IconButton, MenuItem, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';

const categories = ['Bodywork', 'Mechanical', 'Electrical', 'Consumable', 'Maintenance', 'Painting'];

export default function SubmitEstimate() {
  const { id } = useParams();
  const { claims, notify } = useApp();
  const claim = claims.find((c) => c.claimNumber === id) || claims[0];
  const [rows, setRows] = useState([{ description: 'Front bumper replacement', category: 'Bodywork', labour: 6000, parts: 18000 }]);
  const totals = useMemo(() => rows.reduce((acc, r) => ({ labour: acc.labour + Number(r.labour || 0), parts: acc.parts + Number(r.parts || 0) }), { labour: 0, parts: 0 }), [rows]);
  const update = (i, key, value) => setRows((current) => current.map((row, index) => index === i ? { ...row, [key]: value } : row));
  return (
    <>
      <PageHeader title="Submit Estimate" subtitle={`${claim.claimNumber} | ${claim.customerName} | ${claim.vehicleReg}`} />
      <Alert severity="warning" sx={{ mb: 2 }}>Consumables and routine maintenance items will not be covered by insurance.</Alert>
      <Paper sx={{ overflowX: 'auto', mb: 2 }}><Table><TableHead><TableRow><TableCell>Description</TableCell><TableCell>Category</TableCell><TableCell>Labour</TableCell><TableCell>Parts</TableCell><TableCell>Total</TableCell><TableCell /></TableRow></TableHead><TableBody>{rows.map((row, i) => <TableRow key={i}><TableCell><TextField value={row.description} onChange={(e) => update(i, 'description', e.target.value)} /></TableCell><TableCell><TextField select value={row.category} onChange={(e) => update(i, 'category', e.target.value)}>{categories.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}</TextField></TableCell><TableCell><TextField type="number" value={row.labour} onChange={(e) => update(i, 'labour', e.target.value)} /></TableCell><TableCell><TextField type="number" value={row.parts} onChange={(e) => update(i, 'parts', e.target.value)} /></TableCell><TableCell>{formatCurrency(Number(row.labour) + Number(row.parts))}</TableCell><TableCell><IconButton onClick={() => setRows((r) => r.filter((_, idx) => idx !== i))}><DeleteIcon /></IconButton></TableCell></TableRow>)}</TableBody></Table></Paper>
      <Grid container spacing={2}><Grid item xs={12} md={4}><Card><CardContent><Typography>Labour Total: <b>{formatCurrency(totals.labour)}</b></Typography><Typography>Parts Total: <b>{formatCurrency(totals.parts)}</b></Typography><Typography variant="h6">Grand Total: {formatCurrency(totals.labour + totals.parts)}</Typography></CardContent></Card></Grid><Grid item xs={12} md={8}><Stack direction="row" spacing={1}><Button variant="outlined" onClick={() => setRows([...rows, { description: '', category: 'Bodywork', labour: 0, parts: 0 }])}>Add Line Item</Button><Button variant="contained" onClick={() => notify('Estimate submitted to surveyor')}>Submit Estimate</Button></Stack></Grid></Grid>
    </>
  );
}
