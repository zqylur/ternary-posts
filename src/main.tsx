import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';
import { ConfigProvider } from 'antd';

import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: '#93A8AC',
            borderRadius: 2,
          },
        }}
      >
        <App />
      </ConfigProvider>
    </Router>
  </StrictMode>,
);
