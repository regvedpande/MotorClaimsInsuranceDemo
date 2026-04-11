import { Box, Divider, Stack, Typography } from '@mui/material';
import { formatCurrency } from '../utils/formatCurrency.js';

export default function SettlementBreakdown({ claim, calculation }) {
  const c = calculation || claim;
  const afterDepreciation = c.afterDepreciation ?? Math.max((c.admissibleAmount || 0) - (c.depreciationAmount || 0), 0);
  return (
    <Box sx={{ p: 2, bgcolor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 2 }}>
      <Stack spacing={1}>
        <Line label="Total Bill" value={formatCurrency(c.totalBill)} />
        <Line label="Less Inadmissibles" value={`-${formatCurrency(c.inadmissibleAmount)}`} />
        <Line label="Admissible Amount" value={formatCurrency(c.admissibleAmount)} />
        <Line label={`Depreciation (${Math.round((c.depreciationRate || 0) * 100)}%)`} value={`-${formatCurrency(c.depreciationAmount)}`} />
        <Line label="After Depreciation" value={formatCurrency(afterDepreciation)} />
        {claim?.settlementMode !== 'Cashless' && <Line label="Less Excess" value={`-${formatCurrency(c.compulsoryExcess)}`} />}
        <Divider />
        <Line label={claim?.settlementMode === 'Cashless' ? 'Insurer Pays Garage' : 'Net Payable'} value={formatCurrency(c.netPayable)} strong />
        {claim?.settlementMode === 'Cashless' && <Line label="Customer Pays at Delivery" value={formatCurrency(c.customerPays)} />}
      </Stack>
    </Box>
  );
}

function Line({ label, value, strong }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant={strong ? 'subtitle1' : 'body2'} fontWeight={strong ? 800 : 500}>{label}</Typography>
      <Typography variant={strong ? 'h6' : 'body2'} fontWeight={strong ? 800 : 700}>{value}</Typography>
    </Stack>
  );
}
