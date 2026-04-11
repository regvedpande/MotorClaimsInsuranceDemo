import { Card, CardContent, Chip, Grid, Slider, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import PageHeader from '../../components/PageHeader.jsx';
import SettlementBreakdown from '../../components/SettlementBreakdown.jsx';
import { calculateSettlement } from '../../utils/settlementCalculator.js';
import { formatCurrency } from '../../utils/formatCurrency.js';

export default function SettlementCalculator() {
  const [totalBill, setTotalBill] = useState(82500);
  const [vehicleAgeYears, setVehicleAgeYears] = useState(3);
  const [inadmissibleAmount, setInadmissibleAmount] = useState(8500);
  const [compulsoryExcess, setCompulsoryExcess] = useState(2000);
  const [settlementMode, setSettlementMode] = useState('Cashless');
  const calculation = useMemo(() => calculateSettlement({ totalBill, vehicleAgeYears, inadmissibleAmount, compulsoryExcess, settlementMode }), [totalBill, vehicleAgeYears, inadmissibleAmount, compulsoryExcess, settlementMode]);
  const calcClaim = { totalBill, vehicleAgeYears, inadmissibleAmount, compulsoryExcess, settlementMode, ...calculation };
  return (
    <>
      <PageHeader title="Settlement Calculator" subtitle="IRDAI-style motor OD settlement formula" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}><Card><CardContent><Stack spacing={3}>
          <Control label="Total Repair Bill" value={formatCurrency(totalBill)}><Slider min={10000} max={500000} step={2500} value={totalBill} onChange={(_, v) => setTotalBill(v)} /></Control>
          <Control label="Vehicle Age" value={`${vehicleAgeYears} years`}><Slider min={0} max={10} step={1} value={vehicleAgeYears} onChange={(_, v) => setVehicleAgeYears(v)} /></Control>
          <Control label="Inadmissible Amount" value={formatCurrency(inadmissibleAmount)}><Slider min={0} max={80000} step={1000} value={inadmissibleAmount} onChange={(_, v) => setInadmissibleAmount(v)} /></Control>
          <Control label="Compulsory Excess" value={formatCurrency(compulsoryExcess)}><Slider min={1000} max={15000} step={500} value={compulsoryExcess} onChange={(_, v) => setCompulsoryExcess(v)} /></Control>
          <ToggleButtonGroup exclusive value={settlementMode} onChange={(_, v) => v && setSettlementMode(v)}><ToggleButton value="Cashless">Cashless</ToggleButton><ToggleButton value="Reimbursement">Reimbursement</ToggleButton></ToggleButtonGroup>
        </Stack></CardContent></Card></Grid>
        <Grid item xs={12} md={6}><Card><CardContent><Stack direction="row" spacing={1} sx={{ mb: 2 }}><Chip label={`${Math.round(calculation.depreciationRate * 100)}% depreciation`} color="warning" /><Chip label={settlementMode} color="primary" /></Stack><SettlementBreakdown claim={calcClaim} calculation={calcClaim} /></CardContent></Card></Grid>
      </Grid>
    </>
  );
}

function Control({ label, value, children }) {
  return <div><Stack direction="row" justifyContent="space-between"><Typography fontWeight={800}>{label}</Typography><Typography>{value}</Typography></Stack>{children}</div>;
}
