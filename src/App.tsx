import './global.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { BrowserRouter } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import ModalProvider from './context/ModalProvider';
import Router from './router';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ModalProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
