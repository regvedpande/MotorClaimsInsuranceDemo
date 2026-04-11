import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import PageHeader from '../../components/PageHeader.jsx';
import DocumentStatusChip from '../../components/DocumentStatusChip.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function MyDocuments() {
  const { selectedClaim, notify } = useApp();
  const required = selectedClaim?.documents || [];
  return (
    <>
      <PageHeader title="My Documents" subtitle={`Required documents for ${selectedClaim?.claimNumber}`} />
      <Grid container spacing={2}>{required.map((doc) => <Grid item xs={12} md={4} key={doc.type}><Card><CardContent><Stack spacing={1}><Typography variant="h6">{doc.type}</Typography><Typography color="text.secondary">Uploaded by {doc.uploadedBy}</Typography><DocumentStatusChip status={doc.status} /><Button variant="outlined" onClick={() => notify('Document uploaded successfully')}>Upload</Button></Stack></CardContent></Card></Grid>)}</Grid>
    </>
  );
}
