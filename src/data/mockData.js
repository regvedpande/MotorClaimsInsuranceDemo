import { calculateSettlement } from '../utils/settlementCalculator.js';

export const garages = [
  { garageCode: 'GRG-MUM-001', garageName: 'AutoCare Mumbai', city: 'Mumbai', region: 'Mumbai', locationId: 'MUM01', isEmpanelled: true, managerName: 'Rajesh Kumar', managerEmail: 'manager@autocare.com', phone: '022-28001234', address: 'Plot 45, MIDC Andheri East, Mumbai 400093', rating: 4.5, activeClaims: 8, totalClaims: 142, specialization: ['Cars', 'SUVs'], cashlessEnabled: true },
  { garageCode: 'GRG-MUM-002', garageName: 'Western Auto Works', city: 'Mumbai', region: 'Mumbai', locationId: 'MUM02', isEmpanelled: true, managerName: 'Farhan Shaikh', managerEmail: 'ops@westernauto.in', phone: '022-26004567', address: 'SV Road, Bandra West, Mumbai 400050', rating: 4.2, activeClaims: 5, totalClaims: 98, specialization: ['Cars', 'Luxury'], cashlessEnabled: true },
  { garageCode: 'GRG-PUN-001', garageName: 'Pune Motor Clinic', city: 'Pune', region: 'Pune', locationId: 'PUN01', isEmpanelled: true, managerName: 'Sneha Joshi', managerEmail: 'claims@punemotorclinic.in', phone: '020-24441234', address: 'Baner Road, Pune 411045', rating: 4.6, activeClaims: 6, totalClaims: 121, specialization: ['Cars', 'SUVs', 'EV'], cashlessEnabled: true },
  { garageCode: 'GRG-PUN-002', garageName: 'Deccan Body Shop', city: 'Pune', region: 'Pune', locationId: 'PUN02', isEmpanelled: true, managerName: 'Nikhil Bhosale', managerEmail: 'service@deccanbodyshop.in', phone: '020-25550111', address: 'Karve Road, Pune 411004', rating: 4.1, activeClaims: 3, totalClaims: 76, specialization: ['Two Wheelers', 'Cars'], cashlessEnabled: false },
  { garageCode: 'GRG-DEL-001', garageName: 'Capital Car Care', city: 'Delhi', region: 'Delhi', locationId: 'DEL01', isEmpanelled: true, managerName: 'Harpreet Singh', managerEmail: 'claims@capitalcarcare.in', phone: '011-40112233', address: 'Okhla Industrial Area Phase II, New Delhi 110020', rating: 4.4, activeClaims: 7, totalClaims: 134, specialization: ['Cars', 'Commercial'], cashlessEnabled: true },
  { garageCode: 'GRG-DEL-002', garageName: 'North Star Motors', city: 'Delhi', region: 'Delhi', locationId: 'DEL02', isEmpanelled: true, managerName: 'Meera Kapoor', managerEmail: 'desk@northstarmotors.in', phone: '011-27654321', address: 'Rohini Sector 18, Delhi 110089', rating: 4.0, activeClaims: 4, totalClaims: 83, specialization: ['SUVs'], cashlessEnabled: true },
  { garageCode: 'GRG-BLR-001', garageName: 'Bangalore Auto Hub', city: 'Bangalore', region: 'Bangalore', locationId: 'BLR01', isEmpanelled: true, managerName: 'Arjun Rao', managerEmail: 'claims@bangaloreautohub.in', phone: '080-41234567', address: 'Whitefield Main Road, Bengaluru 560066', rating: 4.7, activeClaims: 9, totalClaims: 156, specialization: ['Cars', 'EV', 'SUVs'], cashlessEnabled: true },
  { garageCode: 'GRG-BLR-002', garageName: 'South City Garage', city: 'Bangalore', region: 'Bangalore', locationId: 'BLR02', isEmpanelled: true, managerName: 'Priya Nair', managerEmail: 'service@southcitygarage.in', phone: '080-26661234', address: 'JP Nagar 6th Phase, Bengaluru 560078', rating: 4.3, activeClaims: 4, totalClaims: 91, specialization: ['Cars'], cashlessEnabled: true }
];

export const surveyors = [
  { id: 'SUR-001', name: 'Amit Patel', mobile: '9988776655', email: 'amit.patel@surveyor.com', region: 'Mumbai', city: 'Mumbai', latitude: 19.076, longitude: 72.8777, isAvailable: true, activeSurveys: 3, completedSurveys: 287, rating: 4.7, specialization: ['OwnDamage', 'Theft'] },
  { id: 'SUR-002', name: 'Neha Kulkarni', mobile: '9877001122', email: 'neha.kulkarni@surveyor.com', region: 'Pune', city: 'Pune', latitude: 18.5204, longitude: 73.8567, isAvailable: true, activeSurveys: 2, completedSurveys: 214, rating: 4.6, specialization: ['OwnDamage', 'PersonalAccident'] },
  { id: 'SUR-003', name: 'Vikram Sethi', mobile: '9811122233', email: 'vikram.sethi@surveyor.com', region: 'Delhi', city: 'Delhi', latitude: 28.6139, longitude: 77.209, isAvailable: false, activeSurveys: 5, completedSurveys: 341, rating: 4.5, specialization: ['Theft', 'OwnDamage'] },
  { id: 'SUR-004', name: 'Kavya Reddy', mobile: '9900887766', email: 'kavya.reddy@surveyor.com', region: 'Bangalore', city: 'Bangalore', latitude: 12.9716, longitude: 77.5946, isAvailable: true, activeSurveys: 4, completedSurveys: 265, rating: 4.8, specialization: ['OwnDamage', 'EV'] },
  { id: 'SUR-005', name: 'Sanjay Menon', mobile: '9933445566', email: 'sanjay.menon@surveyor.com', region: 'Mumbai', city: 'Navi Mumbai', latitude: 19.033, longitude: 73.0297, isAvailable: true, activeSurveys: 1, completedSurveys: 188, rating: 4.4, specialization: ['PersonalAccident', 'Theft'] }
];

export const repairLineItems = [
  { id: 1, description: 'Front Bumper Replacement (OEM)', category: 'Bodywork', billed: 18000, status: 'Approved', admissible: 15300, rejectionReason: null, depreciationApplied: 0.15 },
  { id: 2, description: 'Hood Panel Repair', category: 'Bodywork', billed: 12000, status: 'Approved', admissible: 10200, rejectionReason: null, depreciationApplied: 0.15 },
  { id: 3, description: 'Engine Oil + Coolant', category: 'Consumable', billed: 4500, status: 'Rejected', admissible: 0, rejectionReason: 'Consumables not covered under policy', depreciationApplied: 0 },
  { id: 4, description: 'Wheel Alignment & Balancing', category: 'Maintenance', billed: 1200, status: 'Rejected', admissible: 0, rejectionReason: 'Routine maintenance not accident related', depreciationApplied: 0 },
  { id: 5, description: 'Left Fender Paint and Denting', category: 'Painting', billed: 15800, status: 'Approved', admissible: 13430, rejectionReason: null, depreciationApplied: 0.15 }
];

const customers = [
  ['Rahul Sharma', '9876543210', 'rahul.sharma@email.com', 'MH-01-AB-1234', 'Maruti Suzuki', 'Swift Dzire', 2021, 3, 'Andheri West, Mumbai', 19.1136, 72.8697, 'Mumbai'],
  ['Ananya Gupta', '9820011122', 'ananya.gupta@email.com', 'MH-12-CD-5621', 'Hyundai', 'Creta', 2020, 4, 'Baner, Pune', 18.559, 73.7868, 'Pune'],
  ['Suresh Iyer', '9818877665', 'suresh.iyer@email.com', 'DL-03-EF-9012', 'Honda', 'City', 2019, 5, 'Saket, Delhi', 28.5245, 77.2066, 'Delhi'],
  ['Meera Nair', '9900112233', 'meera.nair@email.com', 'KA-05-GH-7788', 'Tata', 'Nexon EV', 2022, 2, 'Indiranagar, Bangalore', 12.9719, 77.6412, 'Bangalore'],
  ['Prakash Verma', '9765432109', 'prakash.verma@email.com', 'MH-02-JK-3344', 'Mahindra', 'XUV700', 2023, 1, 'Powai, Mumbai', 19.1176, 72.906, 'Mumbai'],
  ['Nitin Deshmukh', '9881122334', 'nitin.deshmukh@email.com', 'MH-14-LM-4455', 'Toyota', 'Innova Crysta', 2018, 6, 'Hinjewadi, Pune', 18.5913, 73.7389, 'Pune'],
  ['Karan Malhotra', '9899988877', 'karan.malhotra@email.com', 'DL-08-NP-2233', 'Kia', 'Seltos', 2021, 3, 'Dwarka, Delhi', 28.5921, 77.046, 'Delhi'],
  ['Divya Rao', '9845012345', 'divya.rao@email.com', 'KA-03-QR-9900', 'Volkswagen', 'Polo', 2017, 7, 'Koramangala, Bangalore', 12.9352, 77.6245, 'Bangalore'],
  ['Imran Khan', '9867012345', 'imran.khan@email.com', 'MH-04-ST-1001', 'Renault', 'Kiger', 2022, 2, 'Thane West, Mumbai', 19.2183, 72.9781, 'Mumbai'],
  ['Pooja Shah', '9922445566', 'pooja.shah@email.com', 'MH-12-UV-2121', 'Skoda', 'Slavia', 2023, 1, 'Kalyani Nagar, Pune', 18.5481, 73.9033, 'Pune'],
  ['Rohit Bansal', '9810101010', 'rohit.bansal@email.com', 'DL-01-WX-3434', 'Maruti Suzuki', 'Baleno', 2020, 4, 'Karol Bagh, Delhi', 28.6517, 77.1907, 'Delhi'],
  ['Lakshmi Rao', '9886655443', 'lakshmi.rao@email.com', 'KA-04-YZ-5656', 'Hyundai', 'i20', 2019, 5, 'Hebbal, Bangalore', 13.0358, 77.597, 'Bangalore'],
  ['Rakesh Jain', '9876509876', 'rakesh.jain@email.com', 'MH-01-AA-6754', 'Honda', 'Amaze', 2021, 3, 'Lower Parel, Mumbai', 18.9986, 72.8303, 'Mumbai'],
  ['Snehal Patil', '9860776655', 'snehal.patil@email.com', 'MH-14-BB-8881', 'Tata', 'Altroz', 2022, 2, 'Wakad, Pune', 18.597, 73.7898, 'Pune'],
  ['Gaurav Arora', '9871234590', 'gaurav.arora@email.com', 'DL-10-CC-7712', 'Mahindra', 'Thar', 2020, 4, 'Noida Sector 62', 28.627, 77.373, 'Delhi'],
  ['Asha Menon', '9986001122', 'asha.menon@email.com', 'KA-01-DD-6432', 'Maruti Suzuki', 'Ertiga', 2018, 6, 'Electronic City, Bangalore', 12.8452, 77.6602, 'Bangalore'],
  ['Manish Agarwal', '9819554433', 'manish.agarwal@email.com', 'MH-03-EE-9011', 'MG', 'Astor', 2023, 1, 'Chembur, Mumbai', 19.0622, 72.9005, 'Mumbai'],
  ['Kritika Singh', '9766002211', 'kritika.singh@email.com', 'MH-12-FF-4200', 'Honda', 'Jazz', 2019, 5, 'Viman Nagar, Pune', 18.5679, 73.9143, 'Pune'],
  ['Aditya Chawla', '9891002200', 'aditya.chawla@email.com', 'DL-05-GG-3098', 'Toyota', 'Fortuner', 2022, 2, 'Vasant Kunj, Delhi', 28.5244, 77.1585, 'Delhi'],
  ['Nandita Bose', '9902004455', 'nandita.bose@email.com', 'KA-02-HH-1188', 'Ford', 'EcoSport', 2017, 7, 'Malleshwaram, Bangalore', 13.0031, 77.5643, 'Bangalore']
];

const statuses = ['UnderAssessment', 'DocumentsComplete', 'Settled', 'PendingNonTraceable', 'Rejected', 'SurveyorAssigned', 'UnderSurvey', 'CashlessAuthorised', 'Approved', 'QueryRaised', 'Registered', 'EligibilityPassed'];
const types = ['OwnDamage', 'Theft', 'PersonalAccident'];

const buildDocuments = (type, status) => {
  const base = [
    { type: 'ClaimForm', status: status === 'Rejected' ? 'Rejected' : 'Approved', uploadedBy: 'Claimant' },
    { type: 'RCBook', status: 'Approved', uploadedBy: 'Claimant' },
    { type: 'DrivingLicence', status: type === 'PersonalAccident' ? 'PendingReview' : 'Approved', uploadedBy: 'Claimant' },
    { type: 'SurveyReport', status: ['UnderSurvey', 'SurveyorAssigned', 'Registered'].includes(status) ? 'PendingReview' : 'Approved', uploadedBy: 'Surveyor' },
    { type: 'VehiclePhotos', status: 'Approved', uploadedBy: 'Surveyor' },
    { type: 'RepairEstimate', status: ['UnderAssessment', 'DocumentsComplete', 'QueryRaised'].includes(status) ? 'PendingReview' : 'Approved', uploadedBy: 'Garage' }
  ];
  if (type === 'Theft') base.push({ type: 'FIRCopy', status: status === 'PendingNonTraceable' ? 'Approved' : 'PendingReview', uploadedBy: 'Claimant' });
  if (type === 'PersonalAccident') base.push({ type: 'MedicalCertificate', status: 'Approved', uploadedBy: 'Claimant' });
  return base;
};

const statusHistoryFor = (status, createdAt, surveyorName) => {
  const flow = ['Registered', 'EligibilityPassed', 'SurveyorAssigned', 'UnderSurvey', 'DocumentsComplete', 'UnderAssessment', 'Approved', 'Settled'];
  const exceptional = status === 'Rejected' ? [...flow.slice(0, 6), 'Rejected'] : status === 'PendingNonTraceable' ? ['Registered', 'EligibilityPassed', 'SurveyorAssigned', 'UnderSurvey', 'PendingNonTraceable'] : status === 'QueryRaised' ? [...flow.slice(0, 6), 'QueryRaised'] : flow.slice(0, Math.max(flow.indexOf(status) + 1, 1));
  return exceptional.map((item, index) => ({
    status: item,
    changedAt: new Date(new Date(createdAt).getTime() + index * 5 * 60 * 60 * 1000).toISOString(),
    changedBy: index < 2 ? 'System' : index === 2 ? 'BizTalk' : index === 3 ? surveyorName : index === exceptional.length - 1 ? 'Claims Desk' : 'BizTalk',
    source: index < 2 ? 'API' : index === 2 || index === 4 ? 'BizTalk' : index === 3 ? 'SurveyorPortal' : 'ClaimsDesk'
  }));
};

export const claims = customers.map((c, index) => {
  const [customerName, customerPhone, customerEmail, vehicleReg, vehicleMake, vehicleModel, vehicleYear, vehicleAgeYears, accidentLocation, accidentLatitude, accidentLongitude, region] = c;
  const claimType = index % 5 === 3 ? 'Theft' : index % 7 === 4 ? 'PersonalAccident' : types[index % types.length];
  const status = statuses[index % statuses.length];
  const garage = garages.find((g) => g.region === region) || garages[0];
  const surveyor = surveyors.find((s) => s.region === region) || surveyors[0];
  const totalBill = claimType === 'Theft' ? 0 : 52000 + index * 6400;
  const inadmissibleAmount = claimType === 'Theft' ? 0 : 4500 + (index % 5) * 2100;
  const compulsoryExcess = vehicleAgeYears >= 5 ? 3000 : 2000;
  const settlementMode = claimType === 'Theft' ? 'Reimbursement' : index % 3 === 0 ? 'Cashless' : 'Reimbursement';
  const settlement = claimType === 'Theft'
    ? { depreciationRate: 0, admissibleAmount: 0, depreciationAmount: 0, afterDepreciation: 0, netPayable: status === 'Settled' ? 425000 : 0, customerPays: 0 }
    : calculateSettlement({ totalBill, inadmissibleAmount, vehicleAgeYears, compulsoryExcess, settlementMode });
  const createdAt = `2024-03-${String(1 + (index % 25)).padStart(2, '0')}T${String(9 + (index % 8)).padStart(2, '0')}:30:00`;
  const claimNo = `MOT-2024-${String(45231 + index).padStart(6, '0')}`;
  return {
    claimNumber: claimNo,
    policyNumber: `POL-2024-${String(index + 1).padStart(3, '0')}`,
    claimType,
    status,
    customerName,
    customerPhone,
    customerEmail,
    vehicleReg,
    vehicleMake,
    vehicleModel,
    vehicleYear,
    vehicleAgeYears,
    accidentDate: createdAt.slice(0, 10),
    accidentLocation,
    accidentLatitude,
    accidentLongitude,
    estimatedLoss: claimType === 'PersonalAccident' ? 150000 + index * 5000 : claimType === 'Theft' ? 480000 + index * 7000 : totalBill + 12000,
    firNumber: claimType === 'Theft' || index % 6 === 0 ? `FIR/2024/${String(45 + index).padStart(4, '0')}` : null,
    idv: 650000 + index * 25000,
    hypothecation: index % 4 === 0 ? 'HDFC Bank Ltd.' : index % 6 === 0 ? 'ICICI Bank Ltd.' : null,
    coverage: ['Own Damage', 'Personal Accident', 'Third Party'],
    compulsoryExcess,
    settlementMode,
    totalBill,
    inadmissibleAmount,
    admissibleAmount: settlement.admissibleAmount,
    depreciationRate: settlement.depreciationRate,
    depreciationAmount: settlement.depreciationAmount,
    netPayable: settlement.netPayable,
    customerPays: settlement.customerPays,
    assignedSurveyor: surveyor.name,
    surveyorPhone: surveyor.mobile,
    garageCode: garage.garageCode,
    garageName: garage.garageName,
    garageCity: garage.city,
    region,
    documents: buildDocuments(claimType, status),
    statusHistory: statusHistoryFor(status, createdAt, surveyor.name),
    lineItems: repairLineItems.map((item) => ({ ...item, id: item.id + index * 10, billed: Math.round(item.billed * (1 + (index % 4) * 0.08)), admissible: item.status === 'Approved' ? Math.round(item.admissible * (1 + (index % 4) * 0.08)) : 0 })),
    neftReference: ['Settled', 'Approved'].includes(status) ? `RGI${createdAt.slice(5, 7)}${String(875421 + index)}` : null,
    authCode: settlementMode === 'Cashless' ? `AUTH-${region.slice(0, 3).toUpperCase()}-${String(1000 + index)}` : null,
    createdAt,
    ageingDays: status === 'Settled' || status === 'Rejected' ? 2 + (index % 6) : 3 + index
  };
});

export const payments = claims.filter((claim) => claim.status === 'Settled').map((claim, index) => ({
  claimNumber: claim.claimNumber,
  customerName: claim.customerName,
  amount: claim.netPayable,
  transactionDate: `2024-04-${String(5 + index).padStart(2, '0')}`,
  bankReference: claim.neftReference || `NEFT${index + 100}`
}));
