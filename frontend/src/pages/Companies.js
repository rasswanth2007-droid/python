import React, { useState } from 'react';

const s = {
  page: {
    minHeight: 'calc(100vh - 64px)',
    background: '#f1f5f9',
    padding: '48px 28px',
  },
  container: {
    maxWidth: 1100,
    margin: '0 auto',
  },
  title: {
    fontSize: 36,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 32,
    letterSpacing: '-0.02em',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 20,
    marginTop: 24,
  },
  companyCard: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 12,
    padding: 28,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  companyIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    background: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: 8,
    letterSpacing: '-0.01em',
  },
  companyDesc: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 18,
    lineHeight: 1.6,
  },
  badge: {
    display: 'inline-block',
    background: '#f1f5f9',
    color: '#475569',
    padding: '6px 12px',
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 600,
    marginRight: 8,
    marginBottom: 8,
  },
  section: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 12,
    padding: 32,
    marginBottom: 24,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.06)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 20,
    letterSpacing: '-0.01em',
  },
  button: {
    width: '100%',
    padding: '14px',
    marginTop: 20,
    background: '#0f172a',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    letterSpacing: '0.01em',
  },
  secondaryButton: {
    padding: '10px 18px',
    background: '#fff',
    color: '#475569',
    border: '1px solid #cbd5e1',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #cbd5e1',
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    marginBottom: 16,
    color: '#1e293b',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  textarea: {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #cbd5e1',
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    minHeight: 100,
    marginBottom: 16,
    resize: 'vertical',
    color: '#1e293b',
    outline: 'none',
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: '#334155',
    marginBottom: 6,
    display: 'block',
  },
};

export default function Companies({ companies, setCompanies }) {

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
    <div style={s.page}>
      <div style={s.container}>
        <h1 style={s.title}>Companies</h1>

        <div style={s.section}>
          <div style={s.sectionTitle}>Registered Companies ({companies.length})</div>
          <div style={s.grid}>
            {companies.map(company => (
              <div
                key={company.id}
                style={s.companyCard}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={s.sectionTitle}>Register New Company</div>
            <button
              onClick={() => setShowForm(!showForm)}
              style={{
                ...s.secondaryButton,
                background: showForm ? '#fef2f2' : '#fff',
                borderColor: showForm ? '#fecaca' : '#cbd5e1',
                color: showForm ? '#dc2626' : '#475569',
              }}
            >
              {showForm ? 'Cancel' : 'Add Company'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleRegister}>
              <label style={s.label}>
                Company Name *
              </label>
              <input
                style={s.input}
                type="text"
                name="name"
                placeholder="e.g. Acme Tech"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <label style={s.label}>
                Description *
              </label>
              <textarea
                style={s.textarea}
                name="description"
                placeholder="What does your company do?"
                value={formData.description}
                onChange={handleInputChange}
                required
              />

              <label style={s.label}>
                Contact Email
              </label>
              <input
                style={s.input}
                type="email"
                name="contactEmail"
                placeholder="contact@company.com"
                value={formData.contactEmail}
                onChange={handleInputChange}
              />

              <label style={s.label}>
                Location
              </label>
              <input
                style={s.input}
                type="text"
                name="location"
                placeholder="e.g. San Francisco, CA"
                value={formData.location}
                onChange={handleInputChange}
              />

              <button
                type="submit"
                style={s.button}
                onMouseOver={(e) => e.target.style.background = '#1e293b'}
                onMouseOut={(e) => e.target.style.background = '#0f172a'}
              >
                Register Company
              </button>
            </form>
          )}
        </div>

        <div style={s.section}>
          <div style={s.sectionTitle}>Company Management</div>
          <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.8, marginBottom: 16 }}>
            <strong style={{ color: '#1e293b' }}>For Company Admins:</strong> Register your company to start recruiting. Once registered,
            you can invite recruiters to your account, manage job openings, and access detailed candidate
            insights. Each company can have multiple recruiters and manage unlimited job positions.
          </p>
          <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.8 }}>
            <strong style={{ color: '#1e293b' }}>Features:</strong> Multi-recruiter support, candidate pool management, role-based access control,
            analytics dashboard, and integration with existing HR systems.
          </p>
        </div>
      </div>
    </div>
  );
}

