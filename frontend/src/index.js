import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Connect } from '@stacks/connect-react';
import { appDetails, userSession } from './components/Contract';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Connect
      authOptions={{
        appDetails,
        redirectTo: '/',
        onFinish: () => {
          window.location.reload();
        },
        userSession,
      }}
    >
      <App />
    </Connect>
  </React.StrictMode>
);