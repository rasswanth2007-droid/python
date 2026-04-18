import React, { useState } from 'react';
import useIsMobile from '../hooks/useIsMobile';

const s = {
  page: {
    minHeight: 'calc(100vh - var(--nav-height))',
    background: 'var(--bg)',
    padding: '48px 28px',
  },
  container: {
    maxWidth: 1100,
    margin: '0 auto',
  },
  title: {
    fontSize: 36,
    fontWeight: 800,
    color: 'var(--text)',
    marginBottom: 32,
    letterSpacing: '-0.03em',
  },
  grid: (mobile) => ({
    display: 'grid',
    gridTemplateColumns: mobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: mobile ? 14 : 20,
    marginTop: mobile ? 16 : 24,
  }),
  companyCard: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: 26,
    boxShadow: 'var(--shadow-sm)',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    animation: 'fadeInUp 0.4s ease-out both',
  },
  companyIcon: {
    width: 50,
    height: 50,
    borderRadius: 'var(--radius-md)',
    background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    boxShadow: 'var(--shadow-accent)',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--text)',
    marginBottom: 8,
    letterSpacing: '-0.01em',
  },
  companyDesc: {
    fontSize: 14,
    color: 'var(--text-muted)',
    marginBottom: 18,
    lineHeight: 1.6,
  },
  badge: {
    display: 'inline-block',
    background: 'var(--accent-bg)',
    color: 'var(--accent)',
    padding: '5px 12px',
    borderRadius: 'var(--radius-sm)',
    fontSize: 12,
    fontWeight: 600,
    marginRight: 8,
    marginBottom: 8,
    border: '1px solid var(--accent-border)',
  },
  section: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: 32,
    marginBottom: 24,
    boxShadow: 'var(--shadow-sm)',
    animation: 'fadeInUp 0.5s ease-out',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--text)',
    marginBottom: 20,
    letterSpacing: '-0.01em',
  },
  button: {
    width: '100%',
    padding: '14px',
    marginTop: 20,
    background: 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: 'var(--radius)',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: 'var(--shadow-accent)',
    minHeight: 48,
    fontFamily: 'Inter, sans-serif',
  },
  secondaryButton: {
    padding: '10px 18px',
    background: 'var(--surface)',
    color: 'var(--accent)',
    border: '1px solid var(--accent-border)',
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    minHeight: 40,
    fontFamily: 'Inter, sans-serif',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid var(--border)',
    borderRadius: 10,
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    marginBottom: 16,
    color: 'var(--text)',
    background: 'var(--surface)',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    minHeight: 42,
  },
  textarea: {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid var(--border)',
    borderRadius: 10,
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    minHeight: 100,
    marginBottom: 16,
    resize: 'vertical',
    color: 'var(--text)',
    background: 'var(--surface)',
    outline: 'none',
  },
  label: {
    fontSize: 12,
    fontWeight: 700,
    color: 'var(--accent)',
    marginBottom: 6,
    display: 'block',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
};

const inputFocusHandlers = {
  onFocus: (e) => {
    e.target.style.borderColor = 'var(--accent)';
    e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)';
  },
  onBlur: (e) => {
    e.target.style.borderColor = 'var(--border)';
    e.target.style.boxShadow = 'none';
  },
};

export default function Companies({ companies, setCompanies }) {
  const isMobile = useIsMobile();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contactEmail: '',
    location: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.name && formData.description) {
      const newCompany = {
        id: companies.length + 1,
        name: formData.name,
        description: formData.description,
        recruiters: 1,
        openings: 0,
        registered: true,
      };
      setCompanies([...companies, newCompany]);
      setFormData({ name: '', description: '', contactEmail: '', location: '' });
      setShowForm(false);
    }
  };

  return (
    <div style={{ ...s.page, padding: isMobile ? '24px 12px' : '48px 28px' }}>
      <div style={s.container}>
        <h1 style={{ ...s.title, fontSize: isMobile ? 26 : 36 }}>Companies</h1>

        <div style={s.section}>
          <div style={s.sectionTitle}>Registered Companies ({companies.length})</div>
          <div style={s.grid(isMobile)}>
            {companies.map((company, i) => (
              <div
                key={company.id}
                style={{ ...s.companyCard, animationDelay: `${i * 0.08}s` }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'var(--accent-border)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                <div style={s.companyIcon}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <div style={s.companyName}>{company.name}</div>
                <p style={s.companyDesc}>{company.description}</p>
                <div>
                  <span style={s.badge}>{company.recruiters} Recruiters</span>
                  <span style={s.badge}>{company.openings} Openings</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={s.section}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
            <div style={s.sectionTitle}>Register New Company</div>
            <button
              onClick={() => setShowForm(!showForm)}
              style={{
                ...s.secondaryButton,
                background: showForm ? 'var(--error-bg)' : 'var(--surface)',
                borderColor: showForm ? 'var(--error-border)' : 'var(--accent-border)',
                color: showForm ? 'var(--error)' : 'var(--accent)',
              }}
            >
              {showForm ? 'Cancel' : 'Add Company'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleRegister} style={{ animation: 'fadeInUp 0.3s ease-out' }}>
              <label style={s.label}>Company Name *</label>
              <input
                style={s.input}
                type="text"
                name="name"
                placeholder="e.g. Acme Tech"
                value={formData.name}
                onChange={handleInputChange}
                required
                {...inputFocusHandlers}
              />

              <label style={s.label}>Description *</label>
              <textarea
                style={s.textarea}
                name="description"
                placeholder="What does your company do?"
                value={formData.description}
                onChange={handleInputChange}
                required
                {...inputFocusHandlers}
              />

              <label style={s.label}>Contact Email</label>
              <input
                style={s.input}
                type="email"
                name="contactEmail"
                placeholder="contact@company.com"
                value={formData.contactEmail}
                onChange={handleInputChange}
                {...inputFocusHandlers}
              />

              <label style={s.label}>Location</label>
              <input
                style={s.input}
                type="text"
                name="location"
                placeholder="e.g. San Francisco, CA"
                value={formData.location}
                onChange={handleInputChange}
                {...inputFocusHandlers}
              />

              <button
                type="submit"
                style={s.button}
                onMouseOver={(e) => e.target.style.background = 'var(--accent-hover)'}
                onMouseOut={(e) => e.target.style.background = 'var(--accent)'}
              >
                Register Company
              </button>
            </form>
          )}
        </div>

        <div style={s.section}>
          <div style={s.sectionTitle}>Company Management</div>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
            <strong style={{ color: 'var(--text)' }}>For Company Admins:</strong> Register your company to start recruiting. Once registered,
            you can invite recruiters to your account, manage job openings, and access detailed candidate
            insights. Each company can have multiple recruiters and manage unlimited job positions.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <strong style={{ color: 'var(--text)' }}>Features:</strong> Multi-recruiter support, candidate pool management, role-based access control,
            analytics dashboard, and integration with existing HR systems.
          </p>
        </div>
      </div>
    </div>
  );
}
