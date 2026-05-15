import { Suspense, lazy } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const Landing = lazy(() => import('./pages/Landing.jsx'));
const ClaimsDeskLayout = lazy(() => import('./pages/claims-desk/ClaimsDeskLayout.jsx'));
const ClaimsDeskDashboard = lazy(() => import('./pages/claims-desk/Dashboard.jsx'));
const AllClaims = lazy(() => import('./pages/claims-desk/AllClaims.jsx'));
const ClaimDetail = lazy(() => import('./pages/claims-desk/ClaimDetail.jsx'));
const AssessmentQueue = lazy(() => import('./pages/claims-desk/AssessmentQueue.jsx'));
const SettlementCalculator = lazy(() => import('./pages/claims-desk/SettlementCalculator.jsx'));
const ClaimantLayout = lazy(() => import('./pages/claimant/ClaimantLayout.jsx'));
const MyClaims = lazy(() => import('./pages/claimant/MyClaims.jsx'));
const FileNewClaim = lazy(() => import('./pages/claimant/FileNewClaim.jsx'));
const TrackClaim = lazy(() => import('./pages/claimant/TrackClaim.jsx'));
const MyDocuments = lazy(() => import('./pages/claimant/MyDocuments.jsx'));
const SurveyorLayout = lazy(() => import('./pages/surveyor/SurveyorLayout.jsx'));
const MyAssignments = lazy(() => import('./pages/surveyor/MyAssignments.jsx'));
const ActiveSurvey = lazy(() => import('./pages/surveyor/ActiveSurvey.jsx'));
const SurveyHistory = lazy(() => import('./pages/surveyor/SurveyHistory.jsx'));
const GarageLayout = lazy(() => import('./pages/garage/GarageLayout.jsx'));
const GarageDashboard = lazy(() => import('./pages/garage/GarageDashboard.jsx'));
const ActiveClaims = lazy(() => import('./pages/garage/ActiveClaims.jsx'));
const SubmitEstimate = lazy(() => import('./pages/garage/SubmitEstimate.jsx'));
const CashlessAuths = lazy(() => import('./pages/garage/CashlessAuths.jsx'));
const PaymentStatus = lazy(() => import('./pages/garage/PaymentStatus.jsx'));
const AnalyticsLayout = lazy(() => import('./pages/analytics/AnalyticsLayout.jsx'));
const Overview = lazy(() => import('./pages/analytics/Overview.jsx'));
const ClaimsAnalysis = lazy(() => import('./pages/analytics/ClaimsAnalysis.jsx'));
const SettlementAnalysis = lazy(() => import('./pages/analytics/SettlementAnalysis.jsx'));
const RegionalPerformance = lazy(() => import('./pages/analytics/RegionalPerformance.jsx'));
const AgeingReport = lazy(() => import('./pages/analytics/AgeingReport.jsx'));

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/claims-desk" element={<ClaimsDeskLayout />}>
            <Route index element={<ClaimsDeskDashboard />} />
            <Route path="claims" element={<AllClaims />} />
            <Route path="claims/:id" element={<ClaimDetail />} />
            <Route path="assessment" element={<AssessmentQueue />} />
            <Route path="settlement" element={<SettlementCalculator />} />
            <Route path="reports" element={<AgeingReport />} />
          </Route>
          <Route path="/claimant" element={<ClaimantLayout />}>
            <Route index element={<MyClaims />} />
            <Route path="file-claim" element={<FileNewClaim />} />
            <Route path="track/:id" element={<TrackClaim />} />
            <Route path="documents" element={<MyDocuments />} />
          </Route>
          <Route path="/surveyor" element={<SurveyorLayout />}>
            <Route index element={<MyAssignments />} />
            <Route path="active/:id" element={<ActiveSurvey />} />
            <Route path="history" element={<SurveyHistory />} />
          </Route>
          <Route path="/garage" element={<GarageLayout />}>
            <Route index element={<GarageDashboard />} />
            <Route path="claims" element={<ActiveClaims />} />
            <Route path="estimate/:id" element={<SubmitEstimate />} />
            <Route path="authorisations" element={<CashlessAuths />} />
            <Route path="payments" element={<PaymentStatus />} />
          </Route>
          <Route path="/analytics" element={<AnalyticsLayout />}>
            <Route index element={<Overview />} />
            <Route path="claims" element={<ClaimsAnalysis />} />
            <Route path="settlement" element={<SettlementAnalysis />} />
            <Route path="regional" element={<RegionalPerformance />} />
            <Route path="ageing" element={<AgeingReport />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

function RouteFallback() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', bgcolor: 'background.default' }}>
      <CircularProgress />
    </Box>
  );
}
