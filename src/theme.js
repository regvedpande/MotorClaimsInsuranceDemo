import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#123247', contrastText: '#ffffff' },
    secondary: { main: '#2563eb' },
    success: { main: '#16a34a' },
    warning: { main: '#d97706' },
    error: { main: '#dc2626' },
    info: { main: '#0d9488' },
    background: { default: '#f4f8fb', paper: '#ffffff' },
    text: { primary: '#0f172a', secondary: '#475569' }
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
    h1: { fontWeight: 800, letterSpacing: 0 },
    h2: { fontWeight: 800, letterSpacing: 0 },
    h3: { fontWeight: 800, letterSpacing: 0 },
    h4: { fontWeight: 800, letterSpacing: 0 },
    h5: { fontWeight: 700, letterSpacing: 0 },
    h6: { fontWeight: 700, letterSpacing: 0 },
    button: { fontWeight: 700, textTransform: 'none', letterSpacing: 0 }
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #e2e8f0',
          boxShadow: '0 18px 40px rgba(15,23,42,0.08)',
          backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #fbfdff 100%)'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, boxShadow: 'none' }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 700 }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#123247',
          color: '#ffffff',
          backgroundImage: 'linear-gradient(90deg, #123247 0%, #14556b 52%, #0f766e 100%)'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: '#e2e8f0'
        },
        head: {
          backgroundColor: '#f1f5f9',
          color: '#0f172a',
          fontWeight: 800,
          whiteSpace: 'nowrap'
        }
      }
    }
  }
});
