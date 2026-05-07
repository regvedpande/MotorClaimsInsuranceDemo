import { Box, Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link as RouterLink } from 'react-router-dom';

export default function PageHeader({ title, subtitle, breadcrumbs = [], actions }) {
  return (
    <Box sx={{ mb: 3.5 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', md: 'flex-start' }}
        spacing={2}
      >
        <Box>
          <Breadcrumbs
            separator={<NavigateNextIcon sx={{ fontSize: 14 }} />}
            sx={{ mb: 1.25, '& .MuiBreadcrumbs-separator': { color: 'text.disabled', mx: 0.5 } }}
          >
            <Link
              component={RouterLink}
              to="/"
              underline="hover"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'text.secondary',
                fontSize: '0.8125rem',
                fontWeight: 500,
                '&:hover': { color: 'primary.main' }
              }}
            >
              <HomeIcon sx={{ fontSize: 14 }} />
              Home
            </Link>
            {breadcrumbs.map((item) => (
              <Typography key={item} sx={{ fontSize: '0.8125rem', color: 'text.secondary', fontWeight: 500 }}>
                {item}
              </Typography>
            ))}
            <Typography sx={{ fontSize: '0.8125rem', color: 'text.primary', fontWeight: 600 }}>
              {title}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography color="text.secondary" sx={{ mt: 0.5, fontSize: '0.9375rem' }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {actions && (
          <Stack
            direction="row"
            spacing={1.5}
            flexWrap="wrap"
            useFlexGap
            sx={{ alignItems: 'center', pt: { md: 0.5 } }}
          >
            {actions}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
