import React, { useState, useEffect } from 'react';
import UploadZone from '../components/UploadZone';
import SkillSelector from '../components/SkillSelector';
import CandidateCard from '../components/CandidateCard';
import StatsBar from '../components/StatsBar';
import { uploadResumes, matchCandidates, parseJD, healthCheck, getSampleCandidates } from '../utils/api';

// ─── Shared Styles ────────────────────────────────────────────
const s = {
  page: { minHeight: '100vh', background: '#f1f5f9' },
  layout: { display: 'grid', gridTemplateColumns: '400px 1fr', gap: 24, maxWidth: 1400, margin: '0 auto', padding: '28px 28px 60px' },
  // Left Panel
  panel: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'sticky',
    top: 80,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
  },
  panelHead: {
    padding: '18px 24px',
    borderBottom: '1px solid #f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#f8fafc',
  },
  panelTitle: {
    fontWeight: 700,
    fontSize: 16,
    color: '#0f172a',
    letterSpacing: '-0.01em',
  },
  panelBody: { padding: 24 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 10,
    marginTop: 20,
    display: 'block',
  },
  textarea: {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #cbd5e1',
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    resize: 'vertical',
    minHeight: 100,
    color: '#1e293b',
    background: '#fff',
    lineHeight: 1.6,
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  input: {
    width: '100%',
    padding: '11px 14px',
    border: '1px solid #cbd5e1',
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    color: '#1e293b',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  analyzeBtn: (loading) => ({
    width: '100%',
    marginTop: 24,
    padding: '14px 20px',
    background: loading ? '#94a3b8' : '#0f172a',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: loading ? 'wait' : 'pointer',
    transition: 'all 0.2s',
    letterSpacing: '0.01em',
  }),
  jdBtn: {
    padding: '8px 14px',
    background: '#f1f5f9',
    color: '#334155',
    border: '1px solid #cbd5e1',
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  // Right Panel
  rightPanel: {},
  stepBar: {
    display: 'flex',
    marginBottom: 24,
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  step: (active, done) => ({
    flex: 1,
    padding: '14px 12px',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 600,
    borderBottom: `3px solid ${done ? '#16a34a' : active ? '#0f172a' : 'transparent'}`,
    color: done ? '#16a34a' : active ? '#0f172a' : '#94a3b8',
    background: done ? '#f0fdf4' : active ? '#f8fafc' : 'transparent',
    letterSpacing: '-0.01em',
  }),
  filterBar: {
    display: 'flex',
    gap: 10,
    marginBottom: 20,
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  filterChip: (active) => ({
    padding: '8px 16px',
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    border: `1px solid ${active ? '#0f172a' : '#cbd5e1'}`,
    background: active ? '#0f172a' : '#fff',
    color: active ? '#fff' : '#475569',
    transition: 'all 0.2s',
  }),
  searchInput: {
    flex: 1,
    maxWidth: 240,
    padding: '10px 16px',
    border: '1px solid #cbd5e1',
    borderRadius: 6,
    fontSize: 13,
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    color: '#1e293b',
  },
  emptyState: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 12,
    padding: '80px 40px',
    textAlign: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  emptyIcon: {
    width: 64,
    height: 64,
    marginBottom: 20,
    opacity: 0.3,
    stroke: '#94a3b8',
    strokeWidth: 1.5,
  },
  emptyTitle: {
    fontWeight: 700,
    fontSize: 20,
    color: '#334155',
    marginBottom: 10,
    letterSpacing: '-0.01em',
  },
  emptyDesc: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 1.7,
    maxWidth: 400,
    margin: '0 auto',
  },
  errorBox: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: 8,
    padding: '14px 18px',
    marginBottom: 20,
    fontSize: 13,
    color: '#991b1b',
    fontWeight: 500,
  },
  successBox: {
    background: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: 8,
    padding: '14px 18px',
    marginBottom: 20,
    fontSize: 13,
    color: '#166534',
    fontWeight: 500,
  },
  toast: (show) => ({
    position: 'fixed',
    bottom: 28,
    right: 28,
    zIndex: 200,
    background: '#0f172a',
    color: '#fff',
    padding: '14px 22px',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    transform: show ? 'translateY(0)' : 'translateY(80px)',
    opacity: show ? 1 : 0,
    transition: 'all 0.3s ease',
  }),
  divider: { borderBottom: '1px solid #f1f5f9', margin: '20px 0' },
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

  // Health check
  useEffect(() => {
    healthCheck()
      .then(() => setApiOnline(true))
      .catch(() => setApiOnline(false));
  }, []);

  // Step tracker
  useEffect(() => {
    if (files.length > 0 && step < 2) setStep(2);
  }, [files]);

  useEffect(() => {
    if ((jobDescription || requiredSkills.length > 0) && step < 3) setStep(Math.max(step, 2));
  }, [jobDescription, requiredSkills]);

  // Filter candidates
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
      // Store samples for analysis but don't display results yet
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
        // Use pre-loaded sample candidates
        parsed = sampleCandidates;
      } else {
        // 1. Upload & parse resumes from files
        const uploadRes = await uploadResumes(files);
        parsed = uploadRes.data.candidates;

        // Validate we got the expected candidates back
        if (!parsed || parsed.length === 0) {
          throw new Error('No candidates returned from upload. Files may not have been processed.');
        }

        // Check if we got errors for all files
        erroredItems = parsed.filter(p => p.error);
        if (erroredItems.length === parsed.length) {
          throw new Error(`All files failed to process: ${erroredItems.map(e => e.error).join(', ')}`);
        }
      }

      // 2. Match against job requirements
      const matchRes = await matchCandidates(parsed, requiredSkills, jobDescription, minExp);
      const ranked = matchRes.data.ranked_candidates;

      setCandidates(ranked);
      setStep(4);
      const successMsg = `Analysis complete - ${ranked.length} candidates ranked successfully.${erroredItems.length > 0 ? ` (${erroredItems.length} files skipped due to errors)` : ''}`;
      setSuccess(successMsg);
      showToast(`${ranked.length} candidates ranked`);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.hint || err.message;
      setError('Error: ' + errorMsg);
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.layout}>
        {/* ── LEFT PANEL ── */}
        <div>
          <div style={s.panel}>
            <div style={s.panelHead}>
              <span style={s.panelTitle}>Job Configuration</span>
              <span style={{
                fontSize: 11,
                background: selectedCompany ? '#0f172a' : '#e2e8f0',
                color: selectedCompany ? '#fff' : '#475569',
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
                  background: '#fff',
                }}
              >
                <option value="">— Choose your company —</option>
                {companies.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 6, fontStyle: 'italic' }}>
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
                    background: '#fff',
                    color: '#475569',
                    border: '1px solid #cbd5e1',
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
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
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18, marginBottom: 10 }}>
                <span style={{ ...s.sectionLabel, marginTop: 0, marginBottom: 0 }}>Job Description</span>
                <button
                  style={s.jdBtn}
                  onClick={handleParseJD}
                  onMouseOver={(e) => {
                    e.target.style.background = '#e2e8f0';
                    e.target.style.borderColor = '#94a3b8';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = '#f1f5f9';
                    e.target.style.borderColor = '#cbd5e1';
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
              />
              {parsedFromJD && (
                <div style={{ fontSize: 12, color: '#16a34a', marginTop: 6, fontWeight: 500 }}>
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
              />
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>Years of experience required</div>

              {/* Analyze Button */}
              <button
                style={s.analyzeBtn(loading)}
                onClick={handleAnalyze}
                disabled={loading}
                onMouseOver={(e) => {
                  if (!loading) e.target.style.background = '#1e293b';
                }}
                onMouseOut={(e) => {
                  if (!loading) e.target.style.background = '#0f172a';
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
                <span style={{ fontSize: 13, color: '#94a3b8', marginLeft: 'auto', fontWeight: 500 }}>
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
                  <div style={{ fontSize: 14, colora3b8: '#94 candidates match the current' }}>No filter.</div>
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
                color: '#475569',
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
                  stroke="#475569"
                  strokeWidth="2"
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Processing resumes with AI...
              </div>
              <style>{`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      <div style={s.toast(toast.show)}>{toast.msg}</div>
    </div>
  );
}

