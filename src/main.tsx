import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress benign ResizeObserver loop limit errors
const isResizeObserverError = (msg?: string) =>
  msg &&
  (msg.includes('ResizeObserver loop completed with undelivered notifications') ||
   msg.includes('ResizeObserver loop limit exceeded'));

window.addEventListener('error', (e) => {
  if (isResizeObserverError(e.message)) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
});

window.addEventListener('unhandledrejection', (e) => {
  if (e.reason && isResizeObserverError(e.reason.message || String(e.reason))) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

