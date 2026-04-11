import { Alert, Box, Button, Card, CardContent, Grid, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClaimTypeIcon from '../../components/ClaimTypeIcon.jsx';
import PageHeader from '../../components/PageHeader.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { surveyors } from '../../data/mockData.js';
import { calculateSettlement } from '../../utils/settlementCalculator.js';
import { formatCurrency } from '../../utils/formatCurrency.js';

const steps = ['Claim Type', 'Accident Details', 'Verification', 'Confirmation'];

export default function FileNewClaim() {
  const { addClaim, notify } = useApp();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [claimType, setClaimType] = useState('OwnDamage');
  const [form, setForm] = useState({ policyNumber: 'POL-2024-001', accidentDate: '2024-04-11', accidentLocation: '', estimatedLoss: 85000, firNumber: '', description: '' });
  const [errors, setErrors] = useState({});
  const [newClaim, setNewClaim] = useState(null);
  const validate = () => {
    const next = {};
    if (!form.accidentLocation) next.accidentLocation = 'Accident location is required';
    if (!form.estimatedLoss || form.estimatedLoss < 1000) next.estimatedLoss = 'Estimated loss is required';
    if (claimType === 'Theft' && !form.firNumber) next.firNumber = 'FIR number is mandatory for theft';
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const submit = () => {
    const assigned = surveyors[0];
    const totalBill = Number(form.estimatedLoss);
    const settlement = calculateSettlement({ totalBill, inadmissibleAmount: 8500, vehicleAgeYears: 3, compulsoryExcess: 2000, settlementMode: 'Cashless' });
    const claimNumber = `MOT-2024-0${Math.floor(50000 + Math.random() * 39999)}`;
    const claim = {
      claimNumber, policyNumber: form.policyNumber, claimType, status: 'SurveyorAssigned', customerName: 'Rahul Sharma', customerPhone: '9876543210', customerEmail: 'rahul.sharma@email.com',
      vehicleReg: 'MH-01-AB-1234', vehicleMake: 'Maruti Suzuki', vehicleModel: 'Swift Dzire', vehicleYear: 2021, vehicleAgeYears: 3, accidentDate: form.accidentDate, accidentLocation: form.accidentLocation,
      accidentLatitude: 19.1136, accidentLongitude: 72.8697, estimatedLoss: totalBill, firNumber: form.firNumber || null, idv: 650000, hypothecation: null, coverage: ['Own Damage', 'Personal Accident', 'Third Party'],
      compulsoryExcess: 2000, settlementMode: 'Cashless', totalBill, inadmissibleAmount: 8500, ...settlement, assignedSurveyor: assigned.name, surveyorPhone: assigned.mobile, garageCode: 'GRG-MUM-001', garageName: 'AutoCare Mumbai',
      garageCity: 'Mumbai', region: 'Mumbai', documents: [{ type: 'ClaimForm', status: 'Approved', uploadedBy: 'Claimant' }, { type: 'RCBook', status: 'PendingReview', uploadedBy: 'Claimant' }, { type: 'DrivingLicence', status: 'PendingReview', uploadedBy: 'Claimant' }],
      statusHistory: [{ status: 'Registered', changedAt: new Date().toISOString(), changedBy: 'System', source: 'API' }, { status: 'SurveyorAssigned', changedAt: new Date().toISOString(), changedBy: 'BizTalk', source: 'BizTalk' }],
      lineItems: [], neftReference: null, authCode: 'AUTH-MUM-NEW', createdAt: new Date().toISOString(), ageingDays: 0
    };
    addClaim(claim);
    setNewClaim(claim);
    notify('Claim filed successfully');
    setActive(3);
  };
  return (
    <>
      <PageHeader title="File New Claim" subtitle="First notice of loss wizard" />
      <Stepper activeStep={active} sx={{ mb: 3 }}>{steps.map((step) => <Step key={step}><StepLabel>{step}</StepLabel></Step>)}</Stepper>
      {active === 0 && <Grid container spacing={2}>{['OwnDamage', 'Theft', 'PersonalAccident'].map((type) => <Grid item xs={12} md={4} key={type}><Card onClick={() => setClaimType(type)} sx={{ cursor: 'pointer', borderColor: claimType === type ? 'secondary.main' : '#e2e8f0' }}><CardContent><ClaimTypeIcon type={type} sx={{ color: '#2563eb', fontSize: 42 }} /><Typography variant="h6">{type === 'OwnDamage' ? 'Own Damage' : type === 'Theft' ? 'Theft' : 'Personal Accident'}</Typography><Typography color="text.secondary">{type === 'OwnDamage' ? 'Vehicle damaged in accident' : type === 'Theft' ? 'Vehicle stolen' : 'Injury or death'}</Typography></CardContent></Card></Grid>)}<Grid item xs={12}><Button variant="contained" onClick={() => setActive(1)}>Continue</Button></Grid></Grid>}
      {active === 1 && <Grid container spacing={2}><Grid item xs={12}>{claimType === 'Theft' && <Alert severity="error">FIR number is mandatory for theft claims.</Alert>}</Grid>{['policyNumber', 'accidentDate', 'accidentLocation', 'estimatedLoss', 'firNumber', 'description'].map((field) => <Grid item xs={12} md={field === 'description' ? 12 : 6} key={field}><TextField fullWidth multiline={field === 'description'} rows={field === 'description' ? 4 : 1} type={field === 'estimatedLoss' ? 'number' : field === 'accidentDate' ? 'date' : 'text'} label={field.replace(/([A-Z])/g, ' $1')} value={form[field]} error={Boolean(errors[field])} helperText={errors[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} InputLabelProps={field === 'accidentDate' ? { shrink: true } : undefined} disabled={field === 'policyNumber'} /></Grid>)}<Grid item xs={12}><Button variant="outlined" onClick={() => setActive(0)}>Back</Button><Button variant="contained" sx={{ ml: 1 }} onClick={() => validate() && setActive(2)}>Verify Policy</Button></Grid></Grid>}
      {active === 2 && <Card><CardContent><Typography variant="h6">Policy Verified</Typography><Alert severity="success" sx={{ my: 2 }}>Policy Status: Active</Alert><Typography>IDV: {formatCurrency(650000)}</Typography><Typography>Coverage: Own Damage, PA, Third Party</Typography><Typography>Compulsory Excess: {formatCurrency(2000)}</Typography><Typography>Policy Period: 01-Jan-2024 to 31-Dec-2024</Typography><Typography>Vehicle: Maruti Swift Dzire | MH-01-AB-1234</Typography><Button sx={{ mt: 2 }} variant="contained" onClick={submit}>Confirm and Submit</Button></CardContent></Card>}
      {active === 3 && newClaim && <Card><CardContent><Box sx={{ fontSize: 56, color: 'success.main' }}>✓</Box><Typography variant="h5">Claim submitted</Typography><Typography>Generated claim number: <b>{newClaim.claimNumber}</b></Typography><Typography>Surveyor will be assigned within 2 hours. You will receive an SMS confirmation.</Typography><Typography>Assigned surveyor: {newClaim.assignedSurveyor} | {newClaim.surveyorPhone}</Typography><Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate(`/claimant/track/${newClaim.claimNumber}`)}>Track My Claim</Button></CardContent></Card>}
    </>
  );
}
