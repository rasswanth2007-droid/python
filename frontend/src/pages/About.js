import React, { useState, useEffect } from 'react';
import logoImg from '../assets/hiresense-logo.png';
import logoSqImg from '../assets/hiresense-sq-logo.png';
import useIsMobile from '../hooks/useIsMobile';

function AnimatedCounter({ value, suffix = '', label }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.max(1, Math.floor(value / 60));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return (
    <div style={{ textAlign: 'center', flex: 1, minWidth: 100 }}>
      <div style={{
        fontSize: 36, fontWeight: 800, color: 'var(--accent)',
        letterSpacing: '-0.03em',
      }}>{count}{suffix}</div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, marginTop: 2 }}>{label}</div>
    </div>
  );
}

const FEATURES = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    title: 'Smart Resume Parsing',
    desc: 'Extract key information from PDF and DOCX files automatically using advanced NLP.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
    title: 'Skill Matching',
    desc: 'Match candidate skills against job requirements with 100+ recognized technologies.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
    title: 'AI Ranking',
    desc: 'Intelligent ranking with customizable weights for skills, semantics, and experience.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
    title: 'Privacy First',
    desc: 'Candidates see scores and skills only. Personal contact info stays private.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
    title: 'Multi-Company',
    desc: 'Multiple companies and recruiters on one powerful platform.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>,
    title: 'Custom Weights',
    desc: 'Recruiters adjust scoring weights — skill match, semantic relevance, experience.',
  },
];

const STEPS = [
  { title: 'Upload Resumes', desc: 'Drag & drop PDF or DOCX resumes into the recruiter dashboard.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg> },
  { title: 'Define Requirements', desc: 'Set job title, paste a job description, and select required skills.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg> },
  { title: 'AI Analysis', desc: 'Our NLP engine parses resumes, extracts skills, and computes match scores.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg> },
  { title: 'Ranked Results', desc: 'View candidates ranked by fit, with detailed skill breakdowns.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" /></svg> },
];

export default function About() {
  const isMobile = useIsMobile();
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [hoveredStep, setHoveredStep] = useState(null);

  return (
    <div style={{ minHeight: 'calc(100vh - var(--nav-height))', background: 'var(--bg)' }}>
      {/* ─── HERO ─── */}
      <div style={{
        position: 'relative',
        padding: isMobile ? '50px 20px 40px' : '80px 40px 60px',
        background: 'var(--bg-gradient)',
        overflow: 'hidden',
      }}>
        {/* Soft decorative circles */}
        <div style={{
          position: 'absolute', top: -60, right: -60, width: 260, height: 260,
          borderRadius: '50%', background: 'var(--accent-glow)',
          animation: 'float 8s ease-in-out infinite', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -40, left: -40, width: 200, height: 200,
          borderRadius: '50%', background: 'var(--accent-glow)',
          animation: 'float 10s ease-in-out infinite 2s', pointerEvents: 'none',
          opacity: 0.5,
        }} />

        <div style={{
          maxWidth: 800, margin: '0 auto', textAlign: 'center',
          position: 'relative', zIndex: 1,
        }}>
          {/* Floating Logo */}
          <div style={{ animation: 'float 6s ease-in-out infinite', marginBottom: 28 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 14,
              background: 'var(--surface-glass)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              padding: '14px 28px 14px 16px',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--accent-border)',
              boxShadow: 'var(--shadow-accent)',
            }}>
              <img src={logoSqImg} alt="" style={{
                width: isMobile ? 42 : 52, height: isMobile ? 42 : 52,
                borderRadius: 14, objectFit: 'cover', objectPosition: 'center 30%',
              }} />
              <span style={{
                fontSize: isMobile ? 26 : 34, fontWeight: 800,
                color: 'var(--text)', letterSpacing: '-0.03em',
              }}>
                Hire<span style={{ color: 'var(--accent)' }}>Sense</span>
              </span>
            </div>
          </div>

          <h1 style={{
            fontSize: isMobile ? 30 : 52,
            fontWeight: 800, color: 'var(--text)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            marginBottom: 16, animation: 'fadeInUp 0.7s ease-out',
          }}>
            Hire Smarter.{' '}
            <span style={{ color: 'var(--accent)' }}>Faster.</span>
          </h1>

          <p style={{
            fontSize: isMobile ? 15 : 18,
            color: 'var(--text-secondary)', maxWidth: 550,
            margin: '0 auto 36px', lineHeight: 1.7,
            animation: 'fadeInUp 0.7s ease-out 0.15s both',
          }}>
            Intelligent resume screening that parses, matches, and ranks candidates
            using NLP and machine learning.
          </p>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: isMobile ? 20 : 40,
            justifyContent: 'center', flexWrap: 'wrap',
            animation: 'fadeInUp 0.7s ease-out 0.3s both',
            background: 'var(--surface-glass)',
            backdropFilter: 'blur(12px)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 28px',
            border: '1px solid var(--accent-border)',
            boxShadow: 'var(--shadow-md)',
          }}>
            <AnimatedCounter value={100} suffix="+" label="Skills Recognized" />
            <AnimatedCounter value={6} label="Feature Modules" />
            <AnimatedCounter value={3} suffix="s" label="Avg. Analysis Time" />
          </div>
        </div>
      </div>

      {/* ─── FEATURES ─── */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: isMobile ? '40px 16px' : '64px 28px' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 28 : 44 }}>
          <span style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: 20,
            background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14,
          }}>Features</span>
          <h2 style={{
            fontSize: isMobile ? 24 : 36, fontWeight: 800,
            color: 'var(--text)', letterSpacing: '-0.02em',
          }}>Everything you need to hire right</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? 12 : 16,
        }}>
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              onMouseEnter={() => setHoveredFeature(i)}
              onMouseLeave={() => setHoveredFeature(null)}
              style={{
                background: 'var(--surface)',
                border: '1px solid',
                borderColor: hoveredFeature === i ? 'var(--accent-border)' : 'var(--border)',
                borderRadius: 'var(--radius-lg)', padding: isMobile ? 22 : 26,
                cursor: 'default',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredFeature === i ? 'translateY(-4px)' : 'none',
                boxShadow: hoveredFeature === i
                  ? 'var(--shadow-card-hover)' : 'var(--shadow-xs)',
                animation: `fadeInUp 0.5s ease-out ${i * 0.08}s both`,
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 'var(--radius)',
                background: 'var(--accent-bg)',
                color: 'var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 14,
                transition: 'transform 0.3s ease',
                transform: hoveredFeature === i ? 'scale(1.15)' : 'scale(1)',
              }}>{f.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
                {f.title}
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── HOW IT WORKS ─── */}
      <div style={{
        background: 'var(--bg-gradient)',
        padding: isMobile ? '40px 16px' : '64px 28px',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{
              display: 'inline-block', padding: '5px 14px', borderRadius: 20,
              background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
              fontSize: 11, fontWeight: 700, color: 'var(--accent)',
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14,
            }}>How It Works</span>
            <h2 style={{
              fontSize: isMobile ? 24 : 36, fontWeight: 800,
              color: 'var(--text)', letterSpacing: '-0.02em',
            }}>Four simple steps</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: isMobile ? 14 : 20,
                  padding: isMobile ? '18px 16px' : '22px 28px',
                  borderRadius: 'var(--radius-md)',
                  background: hoveredStep === i ? 'var(--surface)' : 'var(--surface-glass)',
                  border: '1px solid',
                  borderColor: hoveredStep === i ? 'var(--accent-border)' : 'var(--border-light)',
                  transition: 'all 0.3s ease',
                  transform: hoveredStep === i ? 'translateX(6px)' : 'none',
                  boxShadow: hoveredStep === i ? 'var(--shadow-md)' : 'none',
                  cursor: 'default',
                  animation: `slideInLeft 0.5s ease-out ${i * 0.1}s both`,
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 'var(--radius)',
                  background: 'var(--accent-bg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent)', flexShrink: 0,
                  transition: 'transform 0.3s ease',
                  transform: hoveredStep === i ? 'scale(1.1) rotate(5deg)' : 'none',
                }}>{step.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, color: 'var(--accent)',
                      letterSpacing: '0.08em',
                    }}>0{i + 1}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{step.title}</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── SCORING ─── */}
      <div style={{ maxWidth: 700, margin: '0 auto', padding: isMobile ? '40px 16px 50px' : '64px 28px 80px' }}>
        <div style={{
          background: 'var(--surface)', borderRadius: 'var(--radius-xl)', padding: isMobile ? 24 : 36,
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-md)',
        }}>
          <h3 style={{
            fontSize: 20, fontWeight: 700, color: 'var(--text)',
            marginBottom: 24, textAlign: 'center',
          }}>
            How Scores Are Calculated
          </h3>

          <div style={{
            display: 'flex', flexDirection: isMobile ? 'column' : 'row',
            gap: 12, marginBottom: 20,
          }}>
            {[
              { label: 'Skill Match', pct: '70%', color: 'var(--accent)' },
              { label: 'Semantic', pct: '20%', color: 'var(--accent-light)' },
              { label: 'Experience', pct: '10%', color: 'var(--accent-soft)' },
            ].map(s => (
              <div key={s.label} style={{
                flex: 1, padding: '18px 16px', borderRadius: 'var(--radius)',
                background: 'var(--accent-bg)',
                border: '1px solid var(--accent-border)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: s.color, marginBottom: 2 }}>{s.pct}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <p style={{
            fontSize: 12, color: 'var(--text-muted)', textAlign: 'center',
            fontStyle: 'italic', margin: 0,
          }}>
            Recruiters can customize these weights using the Score Weights sliders.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center', padding: '20px', fontSize: 12,
        color: 'var(--text-dim)', fontWeight: 500,
      }}>
        Built with React · Flask · spaCy · Scikit-Learn
      </div>
    </div>
  );
}
