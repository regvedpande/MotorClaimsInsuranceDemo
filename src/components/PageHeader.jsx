import { Box, Breadcrumbs, Button, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink } from 'react-router-dom';

export default function PageHeader({ title, subtitle, breadcrumbs = [], actions }) {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', md: 'center' }} spacing={2} sx={{ mb: 3.5 }}>
      <Box>
        <Button component={RouterLink} to="/" startIcon={<ArrowBackIcon />} size="small" sx={{ mb: 1, px: 0 }}>Back to Portal Select</Button>
        {breadcrumbs.length > 0 && <Breadcrumbs sx={{ mb: 1 }}>{breadcrumbs.map((item) => <Typography key={item} variant="caption">{item}</Typography>)}</Breadcrumbs>}
        <Typography variant="h4">{title}</Typography>
        {subtitle && <Typography color="text.secondary" sx={{ mt: 0.5 }}>{subtitle}</Typography>}
      </Box>
      {actions && <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ alignItems: 'center' }}>{actions}</Stack>}
    </Stack>
  );
}
