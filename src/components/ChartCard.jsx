import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

export default function ChartCard({ title, subtitle, children, height = 300 }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ pb: 1.5, flexShrink: 0 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '0.9375rem', color: 'text.primary' }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
      <Divider />
      <CardContent sx={{ pt: 2, flex: 1, '&:last-child': { pb: 2 } }}>
        <Box sx={{ width: '100%', height }}>{children}</Box>
      </CardContent>
    </Card>
  );
}
