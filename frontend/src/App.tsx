import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import { Toaster } from './components/shadcn/toaster';
import HistoryModal from './components/HistoryModal';
import HistoryPage from './pages/History';
import BetPage from './pages/Bet';

function App() {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <Router>
        <Layout>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<BetPage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
            <Toaster  />
          </ErrorBoundary>
        </Layout>
      </Router>
  );
}

export default App;
