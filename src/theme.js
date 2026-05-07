import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#0f2d48', contrastText: '#ffffff' },
    secondary: { main: '#2563eb' },
    success: { main: '#16a34a' },
    warning: { main: '#d97706' },
    error: { main: '#dc2626' },
    info: { main: '#0d9488' },
    background: { default: '#f1f5f9', paper: '#ffffff' },
    text: { primary: '#0f172a', secondary: '#64748b' }
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.025em' },
    h2: { fontWeight: 800, letterSpacing: '-0.02em' },
    h3: { fontWeight: 700, letterSpacing: '-0.015em' },
    h4: { fontWeight: 700, letterSpacing: '-0.01em' },
    h5: { fontWeight: 700, letterSpacing: '-0.005em' },
    h6: { fontWeight: 600, letterSpacing: 0 },
    overline: { fontWeight: 700, letterSpacing: '0.08em', fontSize: '0.7rem' },
    button: { fontWeight: 600, textTransform: 'none', letterSpacing: 0 }
  },
  shape: { borderRadius: 10 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.04)',
          backgroundImage: 'none'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: '0 1px 3px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.04)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' }
        },
        containedPrimary: {
          '&:hover': { boxShadow: '0 4px 12px rgba(15,45,72,0.24)' }
        },
        containedSecondary: {
          '&:hover': { boxShadow: '0 4px 12px rgba(37,99,235,0.28)' }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, borderRadius: 6 }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0f2d48',
          backgroundImage: 'none',
          color: '#ffffff',
          boxShadow: '0 1px 0 rgba(255,255,255,0.06)'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: '#f1f5f9'
        },
        head: {
          backgroundColor: '#f8fafc',
          color: '#64748b',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td, &:last-child th': { borderBottom: 0 }
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { height: 2 },
        root: { borderBottom: '1px solid #e2e8f0', minHeight: 44 }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.875rem',
          textTransform: 'none',
          letterSpacing: 0,
          minHeight: 44,
          paddingTop: 0,
          paddingBottom: 0,
          color: '#64748b',
          '&.Mui-selected': { color: '#0f2d48' }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 8 }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: 'none', fontWeight: 600 }
      }
    }
  }
});
