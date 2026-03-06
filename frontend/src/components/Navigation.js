import React from 'react';
import logoImg from '../assets/hiresense-logo.png';

const s = {
  nav: {
    background: '#fff',
    borderBottom: '1px solid #e2e8f0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  container: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '0 28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
  },
  logo: {
    fontSize: 22,
    fontWeight: 700,
    color: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    letterSpacing: '-0.02em',
    cursor: 'pointer',
  },
  logoImg: {
    height: 36,
    width: 36,
    objectFit: 'cover',
    objectPosition: 'center 30%',
    borderRadius: 6,
  },
  logoAccent: {
    color: '#0f172a',
    fontWeight: 300,
  },
  menu: {
    display: 'flex',
    gap: 0,
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  menuItem: (active) => ({
    padding: '10px 20px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 13,
    color: active ? '#0f172a' : '#64748b',
    borderBottom: active ? '3px solid #0f172a' : '3px solid transparent',
    transition: 'all 0.2s',
    marginBottom: -3,
    letterSpacing: '0.01em',
  }),
};

export default function Navigation({ currentPage, onPageChange }) {
  const pages = [
    { key: 'about', label: 'About' },
    { key: 'candidate', label: 'Candidate' },
    { key: 'recruiter', label: 'Recruiter' },
    { key: 'companies', label: 'Companies' },
  ];

  return (
    <nav style={s.nav}>
      <div style={s.container}>
        <div style={s.logo} onClick={() => onPageChange('about')}>
          <img src={logoImg} alt="HireSense Logo" style={s.logoImg} />
          Hire<span style={s.logoAccent}>Sense</span>
        </div>
        <ul style={s.menu}>
          {pages.map(page => (
            <li key={page.key}>
              <div
                style={s.menuItem(currentPage === page.key)}
                onClick={() => onPageChange(page.key)}
                onMouseOver={(e) => {
                  if (currentPage !== page.key) {
                    e.target.style.color = '#334155';
                  }
                }}
                onMouseOut={(e) => {
                  if (currentPage !== page.key) {
                    e.target.style.color = '#64748b';
                  }
                }}
              >
                {page.label}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

