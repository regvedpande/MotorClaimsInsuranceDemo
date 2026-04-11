import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import ClaimsDeskLayout from './pages/claims-desk/ClaimsDeskLayout.jsx';
import ClaimsDeskDashboard from './pages/claims-desk/Dashboard.jsx';
import AllClaims from './pages/claims-desk/AllClaims.jsx';
import ClaimDetail from './pages/claims-desk/ClaimDetail.jsx';
import AssessmentQueue from './pages/claims-desk/AssessmentQueue.jsx';
import SettlementCalculator from './pages/claims-desk/SettlementCalculator.jsx';
import ClaimantLayout from './pages/claimant/ClaimantLayout.jsx';
import MyClaims from './pages/claimant/MyClaims.jsx';
import FileNewClaim from './pages/claimant/FileNewClaim.jsx';
import TrackClaim from './pages/claimant/TrackClaim.jsx';
import MyDocuments from './pages/claimant/MyDocuments.jsx';
import SurveyorLayout from './pages/surveyor/SurveyorLayout.jsx';
import MyAssignments from './pages/surveyor/MyAssignments.jsx';
import ActiveSurvey from './pages/surveyor/ActiveSurvey.jsx';
import SurveyHistory from './pages/surveyor/SurveyHistory.jsx';
import GarageLayout from './pages/garage/GarageLayout.jsx';
import GarageDashboard from './pages/garage/GarageDashboard.jsx';
import ActiveClaims from './pages/garage/ActiveClaims.jsx';
import SubmitEstimate from './pages/garage/SubmitEstimate.jsx';
import CashlessAuths from './pages/garage/CashlessAuths.jsx';
import PaymentStatus from './pages/garage/PaymentStatus.jsx';
import AnalyticsLayout from './pages/analytics/AnalyticsLayout.jsx';
import Overview from './pages/analytics/Overview.jsx';
import ClaimsAnalysis from './pages/analytics/ClaimsAnalysis.jsx';
import SettlementAnalysis from './pages/analytics/SettlementAnalysis.jsx';
import RegionalPerformance from './pages/analytics/RegionalPerformance.jsx';
import AgeingReport from './pages/analytics/AgeingReport.jsx';

export default function App() {
  return (
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
  );
}
