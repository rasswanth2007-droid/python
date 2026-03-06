import React, { useState } from 'react';
import Navigation from './components/Navigation';
import RecruiterDashboard from './pages/RecruiterDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import Companies from './pages/Companies';
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
  const [currentPage, setCurrentPage] = useState('recruiter');
  const [candidates, setCandidates] = useState([]);
  const [companies, setCompanies] = useState(DEFAULT_COMPANIES);

  // Callback to update candidates when recruiter uploads resumes
  const handleCandidatesUpdate = (newCandidates) => {
    setCandidates(newCandidates);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'recruiter':
        return <RecruiterDashboard onCandidatesUpdate={handleCandidatesUpdate} companies={companies} />;
      case 'candidate':
        return <CandidateDashboard candidates={candidates} currentUserEmail="user@example.com" />;
      case 'companies':
        return <Companies companies={companies} setCompanies={setCompanies} />;
      case 'about':
        return <About />;
      default:
        return <RecruiterDashboard onCandidatesUpdate={handleCandidatesUpdate} companies={companies} />;
    }
  };

  return (
    <div>
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  );
}
