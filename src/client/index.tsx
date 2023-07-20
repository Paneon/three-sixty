import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';

import './styles.css';
import { HomePage } from './pages/HomePage';
import { NavBar } from './components/NavBar';
import { Container } from 'react-bootstrap';
import { ResultsPage } from './pages/ResultsPage';
import { AdminPage } from './pages/AdminPage';

const container = document.getElementById('index');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <HashRouter>
      <NavBar />
      <Container className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Container>
    </HashRouter>
  </React.StrictMode>,
);
