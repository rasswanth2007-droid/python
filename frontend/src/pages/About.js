import React from 'react';
import logoImg from '../assets/hiresense-logo.png';

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
  section: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 12,
    padding: 36,
    marginBottom: 24,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.06)',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 18,
    letterSpacing: '-0.01em',
  },
  text: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 1.8,
    marginBottom: 16,
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 20,
    marginTop: 24,
  },
  featureCard: {
    border: '1px solid #e2e8f0',
    borderRadius: 10,
    padding: 24,
    background: '#f8fafc',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    background: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: 10,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: '#0f172a',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 700,
    marginRight: 14,
    flexShrink: 0,
  },
  stepItem: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 1.6,
  },
};

export default function About() {
  return (
    <div style={s.page}>
      <div style={s.container}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img
            src={logoImg}
            alt="HireSense Logo"
            style={{
              maxWidth: 360,
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
        <h1 style={s.title}>About HireSense</h1>

        <div style={s.section}>
          <h2 style={s.sectionTitle}>Our Mission</h2>
          <p style={s.text}>
            HireSense is an intelligent resume screening platform that uses advanced NLP and machine learning
            to automatically parse resumes, extract skills, and rank candidates by job fit. We help recruiters
            make smarter hiring decisions faster with AI-powered analysis.
          </p>
        </div>

        <div style={s.section}>
          <h2 style={s.sectionTitle}>Key Features</h2>
          <div style={s.features}>
            <div style={s.featureCard}>
              <div style={s.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <div style={s.featureTitle}>Smart Resume Parsing</div>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
                Extract key information from PDF and DOCX files automatically using advanced AI.
              </p>
            </div>
            <div style={s.featureCard}>
              <div style={s.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <div style={s.featureTitle}>Skill Matching</div>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
                Match candidate skills against job requirements with 100+ recognized technologies.
              </p>
            </div>
            <div style={s.featureCard}>
              <div style={s.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
              <div style={s.featureTitle}>AI Ranking</div>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
                Intelligent ranking algorithm weighing skills, experience, and project involvement.
              </p>
            </div>
            <div style={s.featureCard}>
              <div style={s.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div style={s.featureTitle}>Privacy First</div>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
                Candidates see scores and skills only, no personal contact information exposed.
              </p>
            </div>
            <div style={s.featureCard}>
              <div style={s.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <div style={s.featureTitle}>Multi-Company</div>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
                Support for multiple registered companies and recruiters on one platform.
              </p>
            </div>
            <div style={s.featureCard}>
              <div style={s.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <div style={s.featureTitle}>Custom Criteria</div>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
                Set custom job requirements, skills, and experience thresholds for each role.
              </p>
            </div>
          </div>
        </div>

        <div style={s.section}>
          <h2 style={s.sectionTitle}>How It Works</h2>
          <div style={{ marginBottom: 24 }}>
            <div style={s.stepItem}>
              <div style={s.stepNumber}>1</div>
              <div style={s.stepContent}>
                <div style={s.stepTitle}>Recruiter uploads resumes</div>
                <div style={s.stepDesc}>Upload candidate resumes in PDF or DOCX format for a specific job opening.</div>
              </div>
            </div>
            <div style={s.stepItem}>
              <div style={s.stepNumber}>2</div>
              <div style={s.stepContent}>
                <div style={s.stepTitle}>AI processes the resumes</div>
                <div style={s.stepDesc}>Our NLP engine extracts names, skills, education, and experience automatically.</div>
              </div>
            </div>
            <div style={s.stepItem}>
              <div style={s.stepNumber}>3</div>
              <div style={s.stepContent}>
                <div style={s.stepTitle}>Intelligent ranking</div>
                <div style={s.stepDesc}>Candidates are matched against job requirements with weighted scoring:</div>
                <ul style={{ marginLeft: 20, marginTop: 8, color: '#64748b', fontSize: 14 }}>
                  <li>70% - Required skill match</li>
                  <li>20% - Semantic relevance to job description</li>
                  <li>10% - Project experience and background weighting</li>
                </ul>
              </div>
            </div>
            <div style={s.stepItem}>
              <div style={s.stepNumber}>4</div>
              <div style={s.stepContent}>
                <div style={s.stepTitle}>Results displayed</div>
                <div style={s.stepDesc}>View detailed scoring breakdown, matched/missing skills, and candidate profiles.</div>
              </div>
            </div>
          </div>
        </div>

        <div style={s.section}>
          <h2 style={s.sectionTitle}>Candidate Privacy</h2>
          <p style={s.text}>
            Candidates can view their own score and see rankings of other candidates along with matched skills.
            However, sensitive information like email, phone number, and personal details are kept private and
            only visible to the recruiter.
          </p>
        </div>

        <div style={s.section}>
          <h2 style={s.sectionTitle}>For Recruiters</h2>
          <p style={s.text}>
            Sign up as a recruiter to access the full screening suite. Upload resumes, define job requirements,
            set required skills, and get AI-ranked results in seconds. Manage multiple job openings and candidates
            from one dashboard.
          </p>
        </div>

        <div style={s.section}>
          <h2 style={s.sectionTitle}>Getting Started</h2>
          <p style={s.text}>
            <strong>Recruiter Flow:</strong> Go to the "Recruiter" tab, upload resumes, set job requirements, and click Analyze.
          </p>
          <p style={s.text}>
            <strong>Candidate Flow:</strong> Go to the "Candidate" tab to view your scoring and compare with other applicants (anonymously).
          </p>
          <p style={s.text}>
            <strong>Companies:</strong> Manage company information, register new recruiting organizations, and assign recruiters.
          </p>
        </div>

        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: 8,
          padding: 20,
          marginTop: 20
        }}>
          <h3 style={{ fontWeight: 600, marginBottom: 12 }}>How Scores Are Calculated</h3>
          <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
            <li><strong>Skill Match (70%):</strong> Percentage of required skills found in resume</li>
            <li><strong>Experience (20%):</strong> Years of experience relative to job requirements</li>
            <li><strong>Education (10%):</strong> Education background relevance</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

