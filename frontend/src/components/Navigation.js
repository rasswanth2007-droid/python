import React, { useState } from 'react';
import logoImg from '../assets/hiresense-sq-logo.png';
import useIsMobile from '../hooks/useIsMobile';
import { useTheme } from '../ThemeContext';

export default function Navigation({ currentPage, onPageChange }) {
  const isMobile = useIsMobile();
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredPage, setHoveredPage] = useState(null);

  const pages = [
    { key: 'about', label: 'About' },
    { key: 'candidate', label: 'Candidate' },
    { key: 'recruiter', label: 'Recruiter' },
    { key: 'companies', label: 'Companies' },
  ];

  const handlePageChange = (key) => {
    onPageChange(key);
    setMenuOpen(false);
  };

  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        background: 'var(--surface-hover)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all var(--transition)',
        color: 'var(--text-secondary)',
        flexShrink: 0,
      }}
    >
      {isDark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );

  return (
    <nav style={{
      background: 'var(--surface-glass)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderBottom: '1px solid var(--border-light)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow-xs)',
    }}>
      <div style={{
        maxWidth: 'var(--content-max)',
        margin: '0 auto',
        padding: isMobile ? '0 16px' : '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 'var(--nav-height)',
      }}>
        {/* Logo */}
        <div
          onClick={() => handlePageChange('about')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            transition: 'opacity var(--transition)',
          }}
        >
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            overflow: 'hidden',
            boxShadow: 'var(--shadow-accent)',
            transition: 'transform var(--transition)',
          }}>
            <img src={logoImg} alt="HireSense" style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 30%',
            }} />
          </div>
          {!isMobile && (
            <span style={{
              fontSize: 19,
              fontWeight: 700,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
            }}>
              Hire<span style={{ color: 'var(--accent)', fontWeight: 800 }}>Sense</span>
            </span>
          )}
        </div>

        {/* Desktop Menu */}
        {!isMobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{
              display: 'flex',
              background: 'var(--surface-hover)',
              borderRadius: 12,
              padding: 4,
              gap: 2,
            }}>
              {pages.map(page => {
                const isActive = currentPage === page.key;
                const isHovered = hoveredPage === page.key;
                return (
                  <div
                    key={page.key}
                    onClick={() => handlePageChange(page.key)}
                    onMouseEnter={() => setHoveredPage(page.key)}
                    onMouseLeave={() => setHoveredPage(null)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: 9,
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 600,
                      color: isActive ? 'var(--accent)' : isHovered ? 'var(--text)' : 'var(--text-muted)',
                      background: isActive ? 'var(--surface)' : 'transparent',
                      boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                      transition: 'all var(--transition)',
                      letterSpacing: '0.01em',
                      position: 'relative',
                    }}
                  >
                    {page.label}
                  </div>
                );
              })}
            </div>
            <div style={{ width: 8 }} />
            <ThemeToggle />
          </div>
        ) : (
          /* Mobile Controls */
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{
                background: menuOpen ? 'var(--accent-bg)' : 'transparent',
                border: '1px solid',
                borderColor: menuOpen ? 'var(--accent-border)' : 'transparent',
                borderRadius: 10,
                padding: 10,
                width: 40,
                height: 40,
                cursor: 'pointer',
                transition: 'all var(--transition)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
              }}
            >
              <span style={{
                width: 18,
                height: 2,
                background: 'var(--text)',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }} />
              <span style={{
                width: 18,
                height: 2,
                background: 'var(--text)',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                opacity: menuOpen ? 0 : 1,
              }} />
              <span style={{
                width: 18,
                height: 2,
                background: 'var(--text)',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }} />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Dropdown */}
      {isMobile && (
        <div style={{
          maxHeight: menuOpen ? 280 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          background: 'var(--surface-glass)',
          backdropFilter: 'blur(24px)',
          borderTop: menuOpen ? '1px solid var(--border-light)' : 'none',
        }}>
          {pages.map((page, i) => {
            const isActive = currentPage === page.key;
            return (
              <div
                key={page.key}
                onClick={() => handlePageChange(page.key)}
                style={{
                  padding: '16px 24px',
                  fontSize: 15,
                  fontWeight: 600,
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  borderLeft: `3px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                  background: isActive ? 'var(--accent-bg)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  animation: menuOpen ? `fadeInUp 0.3s ease ${i * 0.05}s both` : 'none',
                  minHeight: 48,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {page.label}
              </div>
            );
          })}
        </div>
      )}
    </nav>
  );
}
