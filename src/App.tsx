import './global.css';

import { BrowserRouter } from 'react-router-dom';

import ModalProvider from './context/ModalProvider';
import Router from './router';

function App() {
  return (
    <>
      <ModalProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ModalProvider>
    </>
  );
}

export default App;
