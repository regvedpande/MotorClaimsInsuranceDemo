import { Box, Button, Typography } from '@mui/material';

export default function EmptyState({ icon, title, description, actionButton }) {
  return (
    <Box sx={{ py: 8, textAlign: 'center', color: 'text.secondary' }}>
      <Box sx={{ fontSize: 48, mb: 1 }}>{icon}</Box>
      <Typography variant="h6" color="text.primary">{title}</Typography>
      <Typography sx={{ maxWidth: 420, mx: 'auto', mt: 1 }}>{description}</Typography>
      {actionButton && <Box sx={{ mt: 2 }}>{actionButton}</Box>}
    </Box>
  );
}
