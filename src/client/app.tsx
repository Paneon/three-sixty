import { NavBar, Page } from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ResultsPage } from './pages/ResultsPage';
import { AdminPage } from './pages/AdminPage';
import React, { useState } from 'react';

export const App = () => {
  const [activePage, setActivePage] = useState(Page.HOME);
  return (
    <>
      <NavBar
        onSwitchPage={(page) => {
          setActivePage(page);
        }}
      />
      <Container className="main">
        {activePage === Page.ADMIN && <AdminPage />}
        {activePage === Page.RESULTS && <ResultsPage />}
        {activePage === Page.HOME && <HomePage />}
      </Container>
    </>
  );
};
