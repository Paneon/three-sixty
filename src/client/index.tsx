import React from 'react';
import { createRoot, Root } from 'react-dom/client';

import './styles.css';
import { App } from './app';

const container = document.getElementById('index');
if (container) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
