import React from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import './styles.css';
import { HomePage } from './pages/HomePage';
import { NavBar } from './components/NavBar';
import { Container } from 'react-bootstrap';

const router = createHashRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/#',
    element: <HomePage />,
  },
  {
    path: '#results',
    element: <HomePage />,
  },
  {
    path: '/admin',
    element: <HomePage />,
  },
]);

const container = document.getElementById('index');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <NavBar />
    <Container className="main">
      <RouterProvider router={router} />
    </Container>
  </React.StrictMode>
);
