import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

export default function StatCard({ title, value, subtitle, icon, color = '#2563eb', trend }) {
  return (
    <Card sx={{ height: '100%', borderLeft: `3px solid ${color}` }}>
      <CardContent sx={{ p: { xs: 2.5, md: 3 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              sx={{
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'text.secondary',
                mb: 1,
                display: 'block'
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                lineHeight: 1.1,
                fontSize: { xs: '1.625rem', md: '1.875rem' },
                color: 'text.primary',
                overflowWrap: 'normal',
                wordBreak: 'keep-all'
              }}
            >
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                {subtitle}
              </Typography>
            )}
            {trend && (
              <Typography variant="caption" color="success.main" fontWeight={700} sx={{ display: 'block', mt: 0.5 }}>
                {trend}
              </Typography>
            )}
          </Box>
          {icon && (
            <Box
              sx={{
                flex: '0 0 auto',
                width: 44,
                height: 44,
                borderRadius: 2,
                bgcolor: `${color}14`,
                color,
                display: 'grid',
                placeItems: 'center',
                '& .MuiSvgIcon-root': { fontSize: 22 }
              }}
            >
              {icon}
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
