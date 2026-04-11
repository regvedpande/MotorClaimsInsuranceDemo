import { Card, CardContent, Grid, Skeleton, Stack } from '@mui/material';

export default function LoadingState({ rows = 3 }) {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: rows }).map((_, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Card><CardContent><Stack spacing={1.5}><Skeleton height={28} /><Skeleton height={48} /><Skeleton height={20} /></Stack></CardContent></Card>
        </Grid>
      ))}
    </Grid>
  );
}
