import { createTheme } from '@mui/material/styles'
import { red, grey } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 40
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: '40px !important'
        }
      }
    }
  },
  palette: {
    mode: 'dark',
    background: {
      paper: '#1D2120',
      default: '#1D2120'
    },
    primary: {
      main: '#6EC069'
    },
    secondary: {
      main: grey.A400
    },
    error: {
      main: red.A100
    }
  },
  typography: {
    fontFamily: 'Lato, sans-serif'
  }
})

export default theme
