import { Card, CardContent, Typography } from '@mui/material';

export default function ChartCard({ title, children, height = 300 }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>{title}</Typography>
        <div style={{ width: '100%', height }}>{children}</div>
      </CardContent>
    </Card>
  );
}
