import './global.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import ModalProvider from './context/ModalProvider';
import Router from './router';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ModalProvider>
    </QueryClientProvider>
  );
}

export default App;
