import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

export default function StatCard({ title, value, subtitle, icon, color = '#2563eb', trend }) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Box>
            <Typography variant="body2" color="text.secondary">{title}</Typography>
            <Typography variant="h4" sx={{ mt: 0.5 }}>{value}</Typography>
            {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
            {trend && <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 0.5 }}>{trend}</Typography>}
          </Box>
          <Box sx={{ width: 46, height: 46, borderRadius: 2, bgcolor: `${color}18`, color, display: 'grid', placeItems: 'center' }}>{icon}</Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
