import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import HubSpotTracking from './components/HubSpotTracking.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <HubSpotTracking />
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
