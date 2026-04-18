import React, { useState, useEffect } from 'react';
import UploadZone from '../components/UploadZone';
import SkillSelector from '../components/SkillSelector';
import CandidateCard from '../components/CandidateCard';
import StatsBar from '../components/StatsBar';
import { uploadResumes, matchCandidates, parseJD, healthCheck, getSampleCandidates } from '../utils/api';
import useIsMobile from '../hooks/useIsMobile';

// ─── Shared Styles ────────────────────────────────────────────
const s = {
  page: { minHeight: '100vh', background: 'var(--bg)' },
  layout: { display: 'grid', gridTemplateColumns: '400px 1fr', gap: 24, maxWidth: 'var(--content-max)', margin: '0 auto', padding: '28px 28px 60px' },
  panel: {
    background: 'var(--surface-glass)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    position: 'sticky',
    top: 'calc(var(--nav-height) + 16px)',
    boxShadow: 'var(--shadow-md)',
    animation: 'fadeInUp 0.5s ease-out',
  },
  panelHead: {
    padding: '18px 24px',
    borderBottom: '1px solid var(--border-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'var(--accent-bg)',
  },
  panelTitle: {
    fontWeight: 700,
    fontSize: 16,
    color: 'var(--text)',
    letterSpacing: '-0.01em',
  },
  panelBody: { padding: 24 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: 'var(--accent)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: 10,
    marginTop: 20,
    display: 'block',
  },
  textarea: {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid var(--border)',
    borderRadius: 10,
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    resize: 'vertical',
    minHeight: 100,
    color: 'var(--text)',
    background: 'var(--surface)',
    lineHeight: 1.6,
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  input: {
    width: '100%',
    padding: '11px 14px',
    border: '1px solid var(--border)',
    borderRadius: 10,
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    color: 'var(--text)',
    background: 'var(--surface)',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    minHeight: 40,
  },
  analyzeBtn: (loading) => ({
    width: '100%',
    marginTop: 24,
    padding: '14px 20px',
    background: loading ? 'var(--text-dim)' : 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: 'var(--radius)',
    fontSize: 14,
    fontWeight: 600,
    cursor: loading ? 'wait' : 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    letterSpacing: '0.01em',
    boxShadow: loading ? 'none' : 'var(--shadow-accent)',
    minHeight: 48,
    fontFamily: 'Inter, sans-serif',
  }),
  jdBtn: {
    padding: '8px 14px',
    background: 'var(--accent-bg)',
    color: 'var(--accent)',
    border: '1px solid var(--accent-border)',
    borderRadius: 'var(--radius-sm)',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'Inter, sans-serif',
    minHeight: 32,
  },
  rightPanel: {},
  stepBar: {
    display: 'flex',
    marginBottom: 24,
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-xs)',
  },
  step: (active, done) => ({
    flex: 1,
    padding: '14px 12px',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 600,
    borderBottom: `3px solid ${done ? 'var(--success)' : active ? 'var(--accent)' : 'transparent'}`,
    color: done ? 'var(--success)' : active ? 'var(--accent)' : 'var(--text-dim)',
    background: done ? 'var(--success-bg)' : active ? 'var(--accent-bg)' : 'transparent',
    letterSpacing: '-0.01em',
    transition: 'all 0.3s ease',
  }),
  filterBar: {
    display: 'flex',
    gap: 8,
    marginBottom: 20,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  filterChip: (active) => ({
    padding: '7px 16px',
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
    background: active ? 'var(--accent)' : 'var(--surface)',
    color: active ? '#fff' : 'var(--text-secondary)',
    transition: 'all 0.25s ease',
    boxShadow: active ? 'var(--shadow-accent)' : 'none',
    minHeight: 36,
    fontFamily: 'Inter, sans-serif',
  }),
  searchInput: {
    flex: 1,
    maxWidth: 240,
    padding: '10px 16px',
    border: '1px solid var(--border)',
    borderRadius: 10,
    fontSize: 13,
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    color: 'var(--text)',
    background: 'var(--surface)',
    transition: 'border-color 0.3s ease',
    minHeight: 38,
  },
  emptyState: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '80px 40px',
    textAlign: 'center',
    boxShadow: 'var(--shadow-sm)',
    animation: 'fadeIn 0.6s ease-out',
  },
  emptyIcon: {
    width: 64,
    height: 64,
    marginBottom: 20,
    opacity: 0.3,
    stroke: 'var(--text-muted)',
    strokeWidth: 1.5,
  },
  emptyTitle: {
    fontWeight: 700,
    fontSize: 20,
    color: 'var(--text-secondary)',
    marginBottom: 10,
    letterSpacing: '-0.01em',
  },
  emptyDesc: {
    fontSize: 14,
    color: 'var(--text-muted)',
    lineHeight: 1.7,
    maxWidth: 400,
    margin: '0 auto',
  },
  errorBox: {
    background: 'var(--error-bg)',
    border: '1px solid var(--error-border)',
    borderRadius: 10,
    padding: '14px 18px',
    marginBottom: 20,
    fontSize: 13,
    color: 'var(--error)',
    fontWeight: 500,
    animation: 'fadeInUp 0.3s ease-out',
  },
  successBox: {
    background: 'var(--success-bg)',
    border: '1px solid var(--success-border)',
    borderRadius: 10,
    padding: '14px 18px',
    marginBottom: 20,
    fontSize: 13,
    color: 'var(--success)',
    fontWeight: 500,
    animation: 'fadeInUp 0.3s ease-out',
  },
  toast: (show) => ({
    position: 'fixed',
    bottom: 28,
    right: 28,
    zIndex: 200,
    background: 'var(--accent)',
    color: '#fff',
    padding: '14px 22px',
    borderRadius: 'var(--radius)',
    fontSize: 13,
    fontWeight: 500,
    boxShadow: 'var(--shadow-accent)',
    transform: show ? 'translateY(0)' : 'translateY(80px)',
    opacity: show ? 1 : 0,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  }),
  divider: { borderBottom: '1px solid var(--border-light)', margin: '20px 0' },
};

// ─── Step Indicator ───────────────────────────────────────────
function StepBar({ currentStep }) {
  const steps = ['1. Upload', '2. Requirements', '3. Analyze', '4. Results'];
  return (
    <div style={s.stepBar}>
      {steps.map((label, i) => (
        <div key={label} style={s.step(i + 1 === currentStep, i + 1 < currentStep)}>{label}</div>
      ))}
    </div>
  );
}

export default function RecruiterDashboard({ onCandidatesUpdate, companies = [] }) {
  const isMobile = useIsMobile();
  const [files, setFiles] = useState([]);
  const [uploadError, setUploadError] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [minExp, setMinExp] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [sampleCandidates, setSampleCandidates] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filterMode, setFilterMode] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [apiOnline, setApiOnline] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '' });
  const [parsedFromJD, setParsedFromJD] = useState(false);
  const [weights, setWeights] = useState({ skill: 70, semantic: 20, experience: 10 });
  const [panelCollapsed, setPanelCollapsed] = useState(false);

  const updateWeight = (key, value) => {
    value = Math.max(0, Math.min(100, Number(value)));
    const others = Object.keys(weights).filter(k => k !== key);
    const remaining = 100 - value;
    const otherSum = others.reduce((sum, k) => sum + weights[k], 0);
    const newWeights = { ...weights, [key]: value };
    if (otherSum === 0) {
      newWeights[others[0]] = remaining;
      newWeights[others[1]] = 0;
    } else {
      others.forEach(k => {
        newWeights[k] = Math.round((weights[k] / otherSum) * remaining);
      });
      const total = Object.values(newWeights).reduce((a, b) => a + b, 0);
      if (total !== 100) newWeights[others[0]] += 100 - total;
    }
    setWeights(newWeights);
  };

  useEffect(() => {
    healthCheck()
      .then(() => setApiOnline(true))
      .catch(() => setApiOnline(false));
  }, []);

  useEffect(() => {
    if (files.length > 0 && step < 2) setStep(2);
  }, [files]);

  useEffect(() => {
    if ((jobDescription || requiredSkills.length > 0) && step < 3) setStep(Math.max(step, 2));
  }, [jobDescription, requiredSkills]);

  useEffect(() => {
    let result = [...candidates];
    if (filterMode === 'high') result = result.filter(c => c.final_score >= 70);
    else if (filterMode === 'med') result = result.filter(c => c.final_score >= 40 && c.final_score < 70);
    else if (filterMode === 'low') result = result.filter(c => c.final_score < 40);
    if (searchQuery) result = result.filter(c => c.name?.toLowerCase().includes(searchQuery.toLowerCase()));
    setFiltered(result);
  }, [candidates, filterMode, searchQuery]);

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3000);
  };

  const handleParseJD = async () => {
    if (!jobDescription.trim()) return;
    try {
      const res = await parseJD(jobDescription);
      const skills = res.data.extracted_skills || [];
      setRequiredSkills(prev => [...new Set([...prev, ...skills])]);
      setParsedFromJD(true);
      showToast(`Extracted ${skills.length} skills from job description`);
    } catch {
      showToast('Could not parse JD. Check API connection.');
    }
  };

  const handleFilesUpdate = (uploadedFiles) => {
    setFiles(uploadedFiles);
  };

  const handleLoadSamples = async () => {
    try {
      setLoading(true);
      const res = await getSampleCandidates();
      const samples = res.data.candidates || [];
      setSampleCandidates(samples);
      setStep(2);
      showToast(`${samples.length} sample resumes loaded — configure requirements and click Analyze`);
    } catch (err) {
      setError('Error loading samples: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (files.length === 0 && sampleCandidates.length === 0) {
      setUploadError('Please upload at least one resume file (PDF or DOCX).');
      setError('Please upload at least one resume.');
      return;
    }
    setUploadError('');
    if (requiredSkills.length === 0) {
      setError('Please select at least one required skill.');
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);
    setStep(3);

    try {
      let parsed;
      let erroredItems = [];

      if (sampleCandidates.length > 0) {
        parsed = sampleCandidates;
      } else {
        const uploadRes = await uploadResumes(files);
        parsed = uploadRes.data.candidates;

        if (!parsed || parsed.length === 0) {
          throw new Error('No candidates returned from upload. Files may not have been processed.');
        }

        erroredItems = parsed.filter(p => p.error);
        if (erroredItems.length === parsed.length) {
          throw new Error(`All files failed to process: ${erroredItems.map(e => e.error).join(', ')}`);
        }
      }

      const matchRes = await matchCandidates(parsed, requiredSkills, jobDescription, minExp, weights);
      const ranked = matchRes.data.ranked_candidates;

      setCandidates(ranked);
      setStep(4);
      const successMsg = `Analysis complete - ${ranked.length} candidates ranked successfully.${erroredItems.length > 0 ? ` (${erroredItems.length} files skipped due to errors)` : ''}`;
      setSuccess(successMsg);
      showToast(`${ranked.length} candidates ranked`);

      // On mobile, auto-collapse the panel after results
      if (isMobile) setPanelCollapsed(true);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.hint || err.message;
      setError('Error: ' + errorMsg);
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const inputFocusStyle = {
    onFocus: (e) => {
      e.target.style.borderColor = 'var(--accent)';
      e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)';
    },
    onBlur: (e) => {
      e.target.style.borderColor = 'var(--border)';
      e.target.style.boxShadow = 'none';
    },
  };

  return (
    <div style={s.page}>
      <div style={{
        ...s.layout,
        gridTemplateColumns: isMobile ? '1fr' : '400px 1fr',
        padding: isMobile ? '16px 12px 40px' : '28px 28px 60px',
        gap: isMobile ? 16 : 24,
      }}>
        {/* ── LEFT PANEL ── */}
        <div>
          {/* Mobile toggle for panel */}
          {isMobile && candidates.length > 0 && (
            <button
              onClick={() => setPanelCollapsed(!panelCollapsed)}
              style={{
                width: '100%',
                padding: '12px 18px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--accent)',
                cursor: 'pointer',
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'Inter, sans-serif',
                minHeight: 44,
              }}
            >
              <span>Job Configuration</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ transform: panelCollapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s ease' }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          )}

          <div style={{
            ...s.panel,
            position: isMobile ? 'static' : 'sticky',
            ...(isMobile && panelCollapsed ? {
              maxHeight: 0,
              overflow: 'hidden',
              border: 'none',
              padding: 0,
              margin: 0,
              boxShadow: 'none',
              opacity: 0,
            } : {}),
            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            <div style={s.panelHead}>
              <span style={s.panelTitle}>Job Configuration</span>
              <span style={{
                fontSize: 11,
                background: selectedCompany ? 'var(--accent)' : 'var(--surface-hover)',
                color: selectedCompany ? '#fff' : 'var(--text-secondary)',
                padding: '4px 10px',
                borderRadius: 4,
                fontWeight: 600,
                letterSpacing: '0.02em',
                transition: 'all 0.2s',
              }}>
                {selectedCompany || 'RECRUITER'}
              </span>
            </div>
            <div style={s.panelBody}>

              {/* Company Selection */}
              <span style={{ ...s.sectionLabel, marginTop: 0 }}>Select Company</span>
              <select
                value={selectedCompany}
                onChange={e => setSelectedCompany(e.target.value)}
                style={{
                  ...s.input,
                  cursor: 'pointer',
                  appearance: 'auto',
                }}
              >
                <option value="">— Choose your company —</option>
                {companies.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6, fontStyle: 'italic' }}>
                Company names are managed on the Companies page.
              </div>

              <div style={s.divider} />

              {/* Upload */}
              <span style={s.sectionLabel}>Resume Upload</span>
              <UploadZone onUpload={handleFilesUpdate} />

              <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                <button
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    background: 'var(--surface)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                    fontFamily: 'Inter, sans-serif',
                    minHeight: 40,
                  }}
                  onClick={handleLoadSamples}
                  disabled={loading}
                  title="Load sample resumes to test the app"
                >
                  Load Demo Data
                </button>
              </div>

              <div style={s.divider} />

              {/* Job Info */}
              <span style={s.sectionLabel}>Job Title</span>
              <input
                style={s.input}
                placeholder="e.g. Senior Data Scientist"
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
                {...inputFocusStyle}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18, marginBottom: 10 }}>
                <span style={{ ...s.sectionLabel, marginTop: 0, marginBottom: 0 }}>Job Description</span>
                <button
                  style={s.jdBtn}
                  onClick={handleParseJD}
                  onMouseOver={(e) => {
                    e.target.style.background = 'var(--surface-hover)';
                    e.target.style.borderColor = 'var(--text-muted)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'var(--accent-bg)';
                    e.target.style.borderColor = 'var(--accent-border)';
                  }}
                >
                  Auto-extract Skills
                </button>
              </div>
              <textarea
                style={s.textarea}
                placeholder="Paste the full job description here. Click 'Auto-extract Skills' to detect required skills automatically..."
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
                rows={4}
                {...inputFocusStyle}
              />
              {parsedFromJD && (
                <div style={{ fontSize: 12, color: 'var(--success)', marginTop: 6, fontWeight: 500 }}>
                  Skills auto-extracted from job description
                </div>
              )}

              <div style={s.divider} />

              {/* Skills */}
              <span style={s.sectionLabel}>Required Skills</span>
              <SkillSelector selected={requiredSkills} setSelected={setRequiredSkills} />

              <div style={s.divider} />

              {/* Experience */}
              <span style={s.sectionLabel}>Minimum Experience</span>
              <input
                style={s.input}
                placeholder="e.g. 3"
                type="number"
                min="0"
                value={minExp}
                onChange={e => setMinExp(e.target.value)}
                {...inputFocusStyle}
              />
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>Years of experience required</div>

              <div style={s.divider} />

              {/* Score Weights */}
              <span style={s.sectionLabel}>Score Weights</span>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>
                Adjust how each factor contributes to the final score (must total 100%)
              </div>
              {[
                { key: 'skill', label: 'Skill Match', color: 'var(--accent)' },
                { key: 'semantic', label: 'Semantic Relevance', color: '#3b82f6' },
                { key: 'experience', label: 'Experience & Projects', color: '#8b5cf6' },
              ].map(w => (
                <div key={w.key} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{w.label}</span>
                    <span style={{
                      fontSize: 13, fontWeight: 700, color: w.color,
                      background: 'var(--surface-hover)', padding: '2px 8px', borderRadius: 4,
                    }}>{weights[w.key]}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={weights[w.key]}
                    onChange={e => updateWeight(w.key, e.target.value)}
                    style={{
                      width: '100%', height: 6, accentColor: w.color,
                      cursor: 'pointer',
                    }}
                  />
                </div>
              ))}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 12px', background: 'var(--surface-secondary)', borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border)', fontSize: 12, color: 'var(--text-secondary)',
              }}>
                <span>Total</span>
                <span style={{
                  fontWeight: 700, fontSize: 14,
                  color: (weights.skill + weights.semantic + weights.experience) === 100 ? 'var(--success)' : 'var(--error)',
                }}>{weights.skill + weights.semantic + weights.experience}%</span>
              </div>

              {/* Analyze Button */}
              <button
                style={s.analyzeBtn(loading)}
                onClick={handleAnalyze}
                disabled={loading}
                onMouseOver={(e) => {
                  if (!loading) e.target.style.background = 'var(--accent-hover)';
                }}
                onMouseOut={(e) => {
                  if (!loading) e.target.style.background = 'var(--accent)';
                }}
              >
                {loading ? 'Processing Resumes...' : 'Analyze & Rank Candidates'}
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={s.rightPanel}>
          <StepBar currentStep={step} />

          {error && <div style={s.errorBox}>{error}</div>}
          {success && <div style={s.successBox}>{success}</div>}

          {candidates.length > 0 && (
            <>
              <StatsBar candidates={candidates} />

              {/* Filter Bar */}
              <div style={s.filterBar}>
                <input
                  style={s.searchInput}
                  placeholder="Search by candidate name..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  {...inputFocusStyle}
                />
                {[
                  { key: 'all', label: 'All' },
                  { key: 'high', label: 'High (70%+)' },
                  { key: 'med', label: 'Medium (40-69%)' },
                  { key: 'low', label: 'Low (<40%)' },
                ].map(f => (
                  <button
                    key={f.key}
                    style={s.filterChip(filterMode === f.key)}
                    onClick={() => setFilterMode(f.key)}
                  >
                    {f.label}
                  </button>
                ))}
                <span style={{ fontSize: 13, color: 'var(--text-muted)', marginLeft: 'auto', fontWeight: 500 }}>
                  {filtered.length} of {candidates.length} shown
                </span>
              </div>

              {/* Cards */}
              {filtered.map((c, i) => (
                <CandidateCard
                  key={c.filename + i}
                  candidate={c}
                  index={i}
                  onShortlist={() => showToast(`${c.name} added to shortlist`)}
                />
              ))}

              {filtered.length === 0 && (
                <div style={{ ...s.emptyState, padding: 40 }}>
                  <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>No candidates match the current filter.</div>
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {candidates.length === 0 && !loading && (
            <div style={s.emptyState}>
              <svg style={s.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <div style={s.emptyTitle}>No Results Yet</div>
              <div style={s.emptyDesc}>
                Upload candidate resumes on the left panel, configure job requirements, and click
                <strong> Analyze & Rank Candidates</strong> to begin.
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div style={{ ...s.emptyState, padding: 60 }}>
              <div style={{
                fontSize: 14,
                color: 'var(--text-secondary)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
              }}>
                <svg
                  style={{ width: 20, height: 20, animation: 'spin 1s linear infinite' }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Processing resumes with AI...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      <div style={s.toast(toast.show)}>{toast.msg}</div>
    </div>
  );
}
