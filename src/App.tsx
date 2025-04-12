
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SuccessPage } from './pages/SuccessPage';
import { DashboardPage } from './pages/DashboardPage';
import { motion, AnimatePresence } from 'framer-motion';

// Wrapper component for page transitions
function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <PageTransition>
            <HomePage />
          </PageTransition>
        } />
        <Route path="/success/:id" element={
          <PageTransition>
            <SuccessPage />
          </PageTransition>
        } />
        <Route path="/dashboard/:id" element={
          <PageTransition>
            <DashboardPage />
          </PageTransition>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;