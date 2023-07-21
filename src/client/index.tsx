import React from 'react';
import { createRoot } from 'react-dom/client';

import './styles.css';
import { App } from './app';

const container = document.getElementById('index');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
