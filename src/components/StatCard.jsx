import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

export default function StatCard({ title, value, subtitle, icon, color = '#2563eb', trend }) {
  return (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', inset: 'auto 0 0 auto', width: 96, height: 96, bgcolor: `${color}12`, borderTopLeftRadius: 8 }} />
      <CardContent sx={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 166, gap: 2 }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>{title}</Typography>
            <Typography variant="h4" sx={{ mt: 0.75, lineHeight: 1.08, fontSize: '2rem', overflowWrap: 'normal' }}>{value}</Typography>
            {subtitle && <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>{subtitle}</Typography>}
            {trend && <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 0.5 }}>{trend}</Typography>}
          </Box>
          {icon && <Box sx={{ flex: '0 0 auto', width: 48, height: 48, borderRadius: 2, bgcolor: `${color}18`, color, display: 'grid', placeItems: 'center' }}>{icon}</Box>}
        </Stack>
      </CardContent>
    </Card>
  );
}
