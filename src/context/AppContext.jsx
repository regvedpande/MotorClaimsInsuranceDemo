import { createContext, useContext, useMemo, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { claims as initialClaims } from '../data/mockData.js';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [claims, setClaims] = useState(initialClaims);
  const [selectedClaimNumber, setSelectedClaimNumber] = useState(initialClaims[0]?.claimNumber);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const notify = (message, severity = 'success') => setToast({ open: true, message, severity });

  const updateClaimStatus = (claimNumber, status, changedBy = 'Claims Desk', source = 'ClaimsDesk') => {
    setClaims((current) => current.map((claim) => claim.claimNumber === claimNumber ? {
      ...claim,
      status,
      statusHistory: [
        ...claim.statusHistory,
        { status, changedAt: new Date().toISOString(), changedBy, source }
      ]
    } : claim));
  };

  const addClaim = (claim) => {
    setClaims((current) => [claim, ...current]);
    setSelectedClaimNumber(claim.claimNumber);
  };

  const value = useMemo(() => ({
    claims,
    selectedClaimNumber,
    selectedClaim: claims.find((claim) => claim.claimNumber === selectedClaimNumber) || claims[0],
    setSelectedClaimNumber,
    updateClaimStatus,
    addClaim,
    notify
  }), [claims, selectedClaimNumber]);

  return (
    <AppContext.Provider value={value}>
      {children}
      <Snackbar open={toast.open} autoHideDuration={3200} onClose={() => setToast((t) => ({ ...t, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={toast.severity} variant="filled" sx={{ width: '100%' }}>{toast.message}</Alert>
      </Snackbar>
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
