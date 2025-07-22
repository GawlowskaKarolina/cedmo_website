// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Theme from './Theme.ts';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Trends from './pages/Trends';
import Index from './pages/Index';
import About from './pages/About';
import Publications from './pages/Publications';
import Cookies from './pages/Cookies';

// Přidáme import cookie consent
import CookieConsent from './components/CookieConsent';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/index" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/cookies" element={<Cookies />} />
        </Routes>
        <Footer />

        {/* Zde přidáme cookie banner */}
        <CookieConsent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
