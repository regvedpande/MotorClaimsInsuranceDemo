import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LockIcon from '@mui/icons-material/Lock';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

export default function ClaimTypeIcon({ type, sx }) {
  if (type === 'Theft') return <LockIcon sx={sx} />;
  if (type === 'PersonalAccident') return <LocalHospitalIcon sx={sx} />;
  return <DirectionsCarIcon sx={sx} />;
}
