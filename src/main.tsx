import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import theme from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material'
//import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

/*
const theme = createTheme({
  // Personaliza aqui seu tema se quiser
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})
*/


createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <App />
  </ThemeProvider>
)
