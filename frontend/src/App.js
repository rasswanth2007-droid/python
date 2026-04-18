import React, { useState } from 'react';
import { ThemeProvider } from './ThemeContext';
import Navigation from './components/Navigation';
import Dashboard from './pages/RecruiterDashboard';
import About from './pages/About';

const DEFAULT_COMPANIES = [
  {
    id: 1,
    name: 'TechCorp',
    description: 'Leading software development company',
    recruiters: 5,
    openings: 12,
    registered: true,
  },
  {
    id: 2,
    name: 'DataFlow',
    description: 'Big data and analytics solutions',
    recruiters: 3,
    openings: 8,
    registered: true,
  },
  {
    id: 3,
    name: 'CloudScale',
    description: 'Cloud infrastructure services',
    recruiters: 2,
    openings: 5,
    registered: true,
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [companies] = useState(DEFAULT_COMPANIES);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard companies={companies} />;
      case 'about':
        return <About />;
      default:
        return <Dashboard companies={companies} />;
    }
  };

  return (
    <ThemeProvider>
      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
        {renderPage()}
      </div>
    </ThemeProvider>
  );
}
