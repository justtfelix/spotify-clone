import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { StateProvider } from './contexts';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>
);