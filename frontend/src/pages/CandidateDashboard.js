import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadResumes, healthCheck } from '../utils/api';
import useIsMobile from '../hooks/useIsMobile';

const s = {
  page: {
    minHeight: 'calc(100vh - var(--nav-height))',
    background: 'var(--bg)',
    padding: '40px 28px',
  },
  container: {
    maxWidth: 'var(--content-max)',
    margin: '0 auto',
  },
  title: {
    fontSize: 32,
    fontWeight: 800,
    color: 'var(--text)',
    marginBottom: 28,
    letterSpacing: '-0.03em',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: 28,
  },
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: 28,
    boxShadow: 'var(--shadow-sm)',
    animation: 'fadeInUp 0.5s ease-out',
  },
  scoreSection: {
    textAlign: 'center',
  },
  scoreNumber: {
    fontSize: 72,
    fontWeight: 800,
    color: 'var(--accent)',
    marginBottom: 12,
    letterSpacing: '-0.03em',
  },
  scoreLabel: {
    fontSize: 14,
    color: 'var(--text-muted)',
    marginBottom: 28,
    fontWeight: 500,
  },
  skillsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    background: 'var(--accent-bg)',
    border: '1px solid var(--accent-border)',
    color: 'var(--accent)',
    padding: '6px 12px',
    borderRadius: 'var(--radius-sm)',
    fontSize: 13,
    fontWeight: 500,
  },
  uploadZone: (active, hasError) => ({
    border: `2px dashed ${active ? 'var(--accent)' : hasError ? 'var(--error)' : 'var(--border)'}`,
    borderRadius: 'var(--radius-lg)',
    padding: '40px 24px',
    textAlign: 'center',
    cursor: 'pointer',
    background: active ? 'var(--accent-bg)' : 'var(--surface-secondary)',
    transition: 'all 0.3s ease',
  }),
  uploadIcon: {
    width: 48,
    height: 48,
    margin: '0 auto 16px',
    stroke: 'var(--text-muted)',
    strokeWidth: 1.5,
    fill: 'none',
  },
  uploadTitle: {
    fontWeight: 600,
    fontSize: 15,
    color: 'var(--text)',
    marginBottom: 6,
  },
  uploadSub: {
    fontSize: 13,
    color: 'var(--text-muted)',
    lineHeight: 1.5,
  },
  uploadFormats: {
    fontSize: 12,
    color: 'var(--text-dim)',
    marginTop: 8,
    fontWeight: 500,
  },
  fileList: {
    marginTop: 20,
    textAlign: 'left',
  },
  fileItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 14px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 10,
    marginBottom: 8,
    fontSize: 13,
    animation: 'fadeInUp 0.3s ease-out',
  },
  fileIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 700,
    color: '#fff',
  },
  fileName: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: 'var(--text)',
    fontWeight: 500,
  },
  fileSize: {
    color: 'var(--text-muted)',
    fontSize: 12,
    minWidth: 50,
    textAlign: 'right',
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: 700,
    color: 'var(--accent)',
    marginBottom: 16,
    textAlign: 'left',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  button: (loading) => ({
    width: '100%',
    marginTop: 20,
    padding: '14px 20px',
    background: loading ? 'var(--text-dim)' : 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: 'var(--radius)',
    fontSize: 14,
    fontWeight: 600,
    cursor: loading ? 'wait' : 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: loading ? 'none' : 'var(--shadow-accent)',
    minHeight: 48,
    fontFamily: 'Inter, sans-serif',
  }),
  successBox: {
    background: 'var(--success-bg)',
    border: '1px solid var(--success-border)',
    borderRadius: 'var(--radius-sm)',
    padding: '14px 18px',
    marginBottom: 20,
    fontSize: 13,
    color: 'var(--success)',
    fontWeight: 500,
  },
  errorBox: {
    background: 'var(--error-bg)',
    border: '1px solid var(--error-border)',
    borderRadius: 'var(--radius-sm)',
    padding: '14px 18px',
    marginBottom: 20,
    fontSize: 13,
    color: 'var(--error)',
    fontWeight: 500,
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
    transition: 'all 0.3s ease',
  }),
  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
    color: 'var(--text-muted)',
    background: 'var(--surface)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border)',
    animation: 'fadeIn 0.5s ease-out',
  },
  previewSection: {
    marginTop: 20,
    padding: 20,
    background: 'var(--surface-secondary)',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--border)',
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: 12,
  },
  previewRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  previewLabel: {
    fontSize: 12,
    color: 'var(--text-secondary)',
    minWidth: 80,
  },
  previewValue: {
    fontSize: 13,
    color: 'var(--text)',
    fontWeight: 500,
  },
  candidateList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  candidateCard: (rank) => ({
    background: rank === 1 ? 'var(--accent-bg)' : 'var(--surface)',
    border: `1px solid ${rank === 1 ? 'var(--accent-border)' : 'var(--border)'}`,
    borderRadius: 'var(--radius)',
    padding: 18,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    animation: 'fadeInUp 0.4s ease-out',
  }),
  candidateName: {
    fontSize: 15,
    fontWeight: 700,
    color: 'var(--text)',
    marginBottom: 8,
    letterSpacing: '-0.01em',
  },
  candidateScore: (score) => ({
    fontSize: 22,
    fontWeight: 800,
    color: score >= 70 ? 'var(--success)' : score >= 40 ? 'var(--warning)' : 'var(--error)',
    letterSpacing: '-0.03em',
  }),
};

export default function CandidateDashboard({ candidates, currentUserEmail }) {
  const isMobile = useIsMobile();
  const [files, setFiles] = useState([]);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '' });
  const [apiOnline, setApiOnline] = useState(false);
  const [uploadedProfile, setUploadedProfile] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    healthCheck()
      .then(() => setApiOnline(true))
      .catch(() => setApiOnline(false));
  }, []);

  const userCandidate = candidates?.find(c => c.email === currentUserEmail || c.email === 'user@example.com');
  const otherCandidates = candidates?.filter(c => c !== userCandidate).sort((a, b) => b.final_score - a.final_score) || [];

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3000);
  };

  const onDrop = useCallback((accepted, rejected) => {
    if (rejected && rejected.length > 0) {
      const rejectedNames = rejected.map(r => r.file.name).join(', ');
      setUploadError(`Rejected files: ${rejectedNames}. Please use PDF or DOCX files under 10MB.`);
      return;
    }
    if (accepted && accepted.length > 0) {
      setFiles(prev => [...prev, ...accepted]);
      setUploadError('');
      setUploadSuccess(`${accepted.length} file(s) added. Click "Upload Resume" to submit.`);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: true,
  });

  const removeFile = (name) => {
    setFiles(prev => prev.filter(f => f.name !== name));
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleUploadResume = async () => {
    if (files.length === 0) {
      setUploadError('Please select at least one resume file to upload.');
      return;
    }
    setUploadError('');
    setLoading(true);
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('resumes', file);
      });
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok && data.candidates) {
        const uploaded = data.candidates[0];
        setUploadedProfile(uploaded);
        setUploadSuccess(`Resume uploaded successfully! Parsed: ${uploaded.name || 'Unknown'}`);
        showToast(`Resume processed - ${uploaded.skills?.length || 0} skills detected`);
        setFiles([]);
      } else {
        throw new Error(data.error || 'Failed to upload resume');
      }
    } catch (err) {
      setUploadError(err.message || 'Failed to upload resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!userCandidate && !uploadedProfile) {
    return (
      <div style={{ ...s.page, padding: isMobile ? '20px 12px' : '40px 28px' }}>
        <div style={s.container}>
          <h1 style={{ ...s.title, fontSize: isMobile ? 24 : 32 }}>Candidate Portal</h1>

          <div style={{ ...s.grid, gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? 16 : 28 }}>
            {/* Upload Section */}
            <div style={s.card}>
              <div style={s.scoreSection}>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Upload Your Resume
                </div>

                <div {...getRootProps()} style={s.uploadZone(isDragActive, !!uploadError)}>
                  <input {...getInputProps()} />
                  <svg style={{
                    ...s.uploadIcon,
                    animation: isDragActive ? 'float 2s ease-in-out infinite' : 'none',
                  }} viewBox="0 0 24 24">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <div style={s.uploadTitle}>
                    {isDragActive ? 'Drop files here' : 'Drag & drop your resume here'}
                  </div>
                  <div style={s.uploadSub}>or click to browse from your computer</div>
                  <div style={s.uploadFormats}>Supported: PDF, DOCX (Max 10MB each)</div>
                </div>

                {files.length > 0 && (
                  <div style={s.fileList}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10 }}>
                      Selected Files ({files.length})
                    </div>
                    {files.map(f => (
                      <div key={f.name} style={s.fileItem}>
                        <div style={{
                          ...s.fileIcon,
                          background: f.name.toLowerCase().endsWith('.pdf') ? '#dc2626' : '#2563eb',
                        }}>
                          {f.name.toLowerCase().endsWith('.pdf') ? 'PDF' : 'DOC'}
                        </div>
                        <span style={s.fileName}>{f.name}</span>
                        <span style={s.fileSize}>{formatFileSize(f.size)}</span>
                        <button
                          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 18, minWidth: 32, minHeight: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          onClick={(e) => { e.stopPropagation(); removeFile(f.name); }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {uploadError && <div style={{ ...s.errorBox, marginTop: 16 }}>{uploadError}</div>}
                {uploadSuccess && <div style={{ ...s.successBox, marginTop: 16 }}>{uploadSuccess}</div>}

                <button
                  style={s.button(loading)}
                  onClick={handleUploadResume}
                  disabled={loading || files.length === 0}
                >
                  {loading ? 'Processing Resume...' : 'Upload Resume'}
                </button>

                {!apiOnline && (
                  <div style={{ marginTop: 16, fontSize: 12, color: 'var(--error)' }}>
                    API is offline. Please ensure the backend server is running.
                  </div>
                )}
              </div>
            </div>

            {/* Info Section */}
            <div>
              <div style={{ ...s.card, marginBottom: 20 }}>
                <div style={s.sectionHeader}>How It Works</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
                  {[
                    { num: '1', title: 'Upload Your Resume', desc: 'Upload PDF or DOCX resume (max 10MB)' },
                    { num: '2', title: 'AI Parsing', desc: 'Our AI extracts skills, experience & education' },
                    { num: '3', title: 'Get Matched', desc: 'Recruiters can view your profile and score' },
                  ].map(step => (
                    <div key={step.num} style={s.previewRow}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: 'var(--accent)', color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: 14, flexShrink: 0,
                      }}>{step.num}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{step.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {uploadedProfile && (
                <div style={s.card}>
                  <div style={s.sectionHeader}>Your Profile Preview</div>
                  <div style={s.previewSection}>
                    {[
                      { label: 'Name:', value: uploadedProfile.name || 'Not detected' },
                      { label: 'Email:', value: uploadedProfile.email || 'Not detected' },
                      { label: 'Phone:', value: uploadedProfile.phone || 'Not detected' },
                      { label: 'Experience:', value: uploadedProfile.experience || 'Not detected' },
                    ].map(row => (
                      <div key={row.label} style={s.previewRow}>
                        <span style={s.previewLabel}>{row.label}</span>
                        <span style={s.previewValue}>{row.value}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: 16 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Detected Skills ({uploadedProfile.skills?.length || 0})</div>
                      <div style={s.skillsList}>
                        {uploadedProfile.skills?.slice(0, 15).map(skill => (
                          <div key={skill} style={s.skillTag}>{skill}</div>
                        ))}
                        {uploadedProfile.skills?.length > 15 && (
                          <div style={{ ...s.skillTag, background: 'var(--surface-hover)' }}>+{uploadedProfile.skills.length - 15} more</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div style={s.toast(toast.show)}>{toast.msg}</div>
      </div>
    );
  }

  const selected = selectedCandidate || otherCandidates[0];

  return (
    <div style={{ ...s.page, padding: isMobile ? '20px 12px' : '40px 28px' }}>
      <div style={s.container}>
        <h1 style={{ ...s.title, fontSize: isMobile ? 24 : 32 }}>Candidate Dashboard</h1>

        <div style={{ ...s.grid, gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? 16 : 28 }}>
          {/* Your Profile */}
          <div style={s.card}>
            <div style={s.scoreSection}>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Your Profile
              </div>
              <div style={s.scoreNumber}>{userCandidate?.final_score || 0}%</div>
              <div style={s.scoreLabel}>Overall Match Score</div>

              <div style={{ marginTop: 28 }}>
                <div style={s.sectionHeader}>
                  Matched Skills ({userCandidate?.matched_skills?.length || 0})
                </div>
                <div style={s.skillsList}>
                  {userCandidate?.matched_skills?.map(skill => (
                    <div key={skill} style={{
                      ...s.skillTag,
                      background: 'var(--success-bg)',
                      border: '1px solid var(--success-border)',
                      color: 'var(--success)',
                    }}>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {userCandidate?.bonus_skills?.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <div style={s.sectionHeader}>
                    Bonus Skills ({userCandidate?.bonus_skills?.length || 0})
                  </div>
                  <div style={s.skillsList}>
                    {userCandidate?.bonus_skills?.map(skill => (
                      <div key={skill} style={s.skillTag}>{skill}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Other Candidates */}
          <div>
            <div style={{ ...s.card, marginBottom: 20 }}>
              <div style={s.sectionHeader}>
                Other Candidates ({otherCandidates.length})
              </div>
              <div style={s.candidateList}>
                {otherCandidates.map((c, i) => (
                  <div
                    key={i}
                    style={s.candidateCard(c.rank)}
                    onClick={() => setSelectedCandidate(c)}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={s.candidateName}>
                      #{c.rank} - {c.name || 'Unknown'}
                    </div>
                    <div style={s.candidateScore(c.final_score)}>{c.final_score}%</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 10 }}>
                      {c.matched_skills?.length || 0} matched skills
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selected && selected !== userCandidate && (
              <div style={s.card}>
                <div style={s.sectionHeader}>
                  Candidate #{selected.rank} Details
                </div>
                <div style={s.candidateName}>{selected.name}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--error)', marginBottom: 20, letterSpacing: '-0.02em' }}>
                  {selected.final_score}%
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    Matched Skills
                  </div>
                  <div style={s.skillsList}>
                    {selected.matched_skills?.map(skill => (
                      <div key={skill} style={{
                        ...s.skillTag,
                        background: 'var(--success-bg)',
                        border: '1px solid var(--success-border)',
                        color: 'var(--success)',
                      }}>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                {selected.bonus_skills?.length > 0 && (
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                      Bonus Skills
                    </div>
                    <div style={s.skillsList}>
                      {selected.bonus_skills?.map(skill => (
                        <div key={skill} style={s.skillTag}>{skill}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={s.toast(toast.show)}>{toast.msg}</div>
    </div>
  );
}
