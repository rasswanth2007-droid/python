import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadResumes, healthCheck } from '../utils/api';

const s = {
  page: {
    minHeight: 'calc(100vh - 64px)',
    background: '#f1f5f9',
    padding: '40px 28px',
  },
  container: {
    maxWidth: 1400,
    margin: '0 auto',
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 28,
    letterSpacing: '-0.02em',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: 28,
  },
  card: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 12,
    padding: 28,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },
  scoreSection: {
    textAlign: 'center',
  },
  scoreNumber: {
    fontSize: 72,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 12,
    letterSpacing: '-0.03em',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 28,
    fontWeight: 500,
  },
  skillsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    background: '#f1f5f9',
    border: '1px solid #e2e8f0',
    color: '#334155',
    padding: '8px 14px',
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 500,
  },
  // Upload zone styles
  uploadZone: (active, hasError) => ({
    border: `2px dashed ${active ? '#1e40af' : hasError ? '#dc2626' : '#9ca3af'}`,
    borderRadius: 8,
    padding: '40px 24px',
    textAlign: 'center',
    cursor: 'pointer',
    background: active ? '#eff6ff' : '#f9fafb',
    transition: 'all 0.2s ease',
  }),
  uploadIcon: {
    width: 48,
    height: 48,
    margin: '0 auto 16px',
    stroke: '#6b7280',
    strokeWidth: 1.5,
    fill: 'none',
  },
  uploadTitle: {
    fontWeight: 600,
    fontSize: 15,
    color: '#111827',
    marginBottom: 6,
  },
  uploadSub: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 1.5,
  },
  uploadFormats: {
    fontSize: 12,
    color: '#9ca3af',
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
    padding: '12px 16px',
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: 6,
    marginBottom: 8,
    fontSize: 13,
  },
  fileIcon: {
    width: 32,
    height: 32,
    borderRadius: 4,
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
    color: '#1f2937',
    fontWeight: 500,
  },
  fileSize: {
    color: '#9ca3af',
    fontSize: 12,
    minWidth: 50,
    textAlign: 'right',
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: 600,
    color: '#475569',
    marginBottom: 16,
    textAlign: 'left',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  button: (loading) => ({
    width: '100%',
    marginTop: 20,
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
  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
    color: '#94a3b8',
    background: '#fff',
    borderRadius: 12,
    border: '1px solid #e2e8f0',
  },
  previewSection: {
    marginTop: 20,
    padding: 20,
    background: '#f8fafc',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#475569',
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
    color: '#64748b',
    minWidth: 80,
  },
  previewValue: {
    fontSize: 13,
    color: '#1e293b',
    fontWeight: 500,
  },
  candidateList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  candidateCard: (rank) => ({
    background: rank === 1 ? '#fef9c3' : '#fff',
    border: `1px solid ${rank === 1 ? '#fde047' : '#e2e8f0'}`,
    borderRadius: 8,
    padding: 18,
    cursor: 'pointer',
    transition: 'all 0.2s',
  }),
  candidateName: {
    fontSize: 15,
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: 8,
    letterSpacing: '-0.01em',
  },
  candidateScore: (score) => ({
    fontSize: 22,
    fontWeight: 700,
    color: score >= 70 ? '#16a34a' : score >= 40 ? '#ca8a04' : '#dc2626',
    letterSpacing: '-0.02em',
  }),
};

export default function CandidateDashboard({ candidates, currentUserEmail }) {
  const [files, setFiles] = useState([]);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '' });
  const [apiOnline, setApiOnline] = useState(false);
  const [uploadedProfile, setUploadedProfile] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Check API health
  useEffect(() => {
    healthCheck()
      .then(() => setApiOnline(true))
      .catch(() => setApiOnline(false));
  }, []);

  // Find current user's candidate info from passed candidates prop
  const userCandidate = candidates?.find(c => c.email === currentUserEmail || c.email === 'user@example.com');
  
  // Get other candidates
  const otherCandidates = candidates?.filter(c => c !== userCandidate).sort((a, b) => b.final_score - a.final_score) || [];

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3000);
  };

  // Handle file drop for candidate resume upload
  const onDrop = useCallback((accepted, rejected) => {
    if (rejected && rejected.length > 0) {
      const rejectedNames = rejected.map(r => r.file.name).join(', ');
      setUploadError(`Rejected files: ${rejectedNames}. Please use PDF or DOCX files under 10MB.`);
      return;
    }
    
    if (accepted && accepted.length > 0) {
      // Allow multiple files - add to existing
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
      'application/msword': ['.doc']
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

  // If no candidates passed and no uploaded profile, show upload UI
  if (!userCandidate && !uploadedProfile) {
    return (
      <div style={s.page}>
        <div style={s.container}>
          <h1 style={s.title}>Candidate Portal</h1>
          
          <div style={s.grid}>
            {/* Upload Section */}
            <div style={s.card}>
              <div style={s.scoreSection}>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 20, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Upload Your Resume
                </div>
                
                <div {...getRootProps()} style={s.uploadZone(isDragActive, !!uploadError)}>
                  <input {...getInputProps()} />
                  <svg style={s.uploadIcon} viewBox="0 0 24 24">
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

                {/* File List */}
                {files.length > 0 && (
                  <div style={s.fileList}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 10 }}>
                      Selected Files ({files.length})
                    </div>
                    {files.map(f => (
                      <div key={f.name} style={s.fileItem}>
                        <div style={{ 
                          ...s.fileIcon, 
                          background: f.name.toLowerCase().endsWith('.pdf') ? '#dc2626' : '#2563eb' 
                        }}>
                          {f.name.toLowerCase().endsWith('.pdf') ? 'PDF' : 'DOC'}
                        </div>
                        <span style={s.fileName}>{f.name}</span>
                        <span style={s.fileSize}>{formatFileSize(f.size)}</span>
                        <button 
                          style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: 18 }}
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
                  <div style={{ marginTop: 16, fontSize: 12, color: '#dc2626' }}>
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
                  <div style={s.previewRow}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#0f172a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>1</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>Upload Your Resume</div>
                      <div style={{ fontSize: 12, color: '#64748b' }}>Upload PDF or DOCX resume (max 10MB)</div>
                    </div>
                  </div>
                  <div style={s.previewRow}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#0f172a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>2</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>AI Parsing</div>
                      <div style={{ fontSize: 12, color: '#64748b' }}>Our AI extracts skills, experience & education</div>
                    </div>
                  </div>
                  <div style={s.previewRow}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#0f172a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>3</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>Get Matched</div>
                      <div style={{ fontSize: 12, color: '#64748b' }}>Recruiters can view your profile and score</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Uploaded Profile Preview */}
              {uploadedProfile && (
                <div style={s.card}>
                  <div style={s.sectionHeader}>Your Profile Preview</div>
                  <div style={s.previewSection}>
                    <div style={s.previewRow}>
                      <span style={s.previewLabel}>Name:</span>
                      <span style={s.previewValue}>{uploadedProfile.name || 'Not detected'}</span>
                    </div>
                    <div style={s.previewRow}>
                      <span style={s.previewLabel}>Email:</span>
                      <span style={s.previewValue}>{uploadedProfile.email || 'Not detected'}</span>
                    </div>
                    <div style={s.previewRow}>
                      <span style={s.previewLabel}>Phone:</span>
                      <span style={s.previewValue}>{uploadedProfile.phone || 'Not detected'}</span>
                    </div>
                    <div style={s.previewRow}>
                      <span style={s.previewLabel}>Experience:</span>
                      <span style={s.previewValue}>{uploadedProfile.experience || 'Not detected'}</span>
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 8 }}>Detected Skills ({uploadedProfile.skills?.length || 0})</div>
                      <div style={s.skillsList}>
                        {uploadedProfile.skills?.slice(0, 15).map(skill => (
                          <div key={skill} style={s.skillTag}>{skill}</div>
                        ))}
                        {uploadedProfile.skills?.length > 15 && (
                          <div style={{ ...s.skillTag, background: '#e2e8f0' }}>+{uploadedProfile.skills.length - 15} more</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Toast */}
        <div style={s.toast(toast.show)}>{toast.msg}</div>
      </div>
    );
  }

  // If user has a profile, show the dashboard
  const selected = selectedCandidate || otherCandidates[0];

  return (
    <div style={s.page}>
      <div style={s.container}>
        <h1 style={s.title}>Candidate Dashboard</h1>

        <div style={s.grid}>
          {/* Your Profile */}
          <div style={s.card}>
            <div style={s.scoreSection}>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 20, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
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
                    <div key={skill} style={{ ...s.skillTag, background: '#dcfce7', border: '1px solid #86efac', color: '#166534' }}>
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
                      <div key={skill} style={s.skillTag}>
                        {skill}
                      </div>
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
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
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
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 10 }}>
                      {c.matched_skills?.length || 0} matched skills
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Candidate Details */}
            {selected && selected !== userCandidate && (
              <div style={s.card}>
                <div style={s.sectionHeader}>
                  Candidate #{selected.rank} Details
                </div>
                <div style={s.candidateName}>{selected.name}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#dc2626', marginBottom: 20, letterSpacing: '-0.02em' }}>
                  {selected.final_score}%
                </div>
                
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    Matched Skills
                  </div>
                  <div style={s.skillsList}>
                    {selected.matched_skills?.map(skill => (
                      <div key={skill} style={{ ...s.skillTag, background: '#dcfce7', border: '1px solid #86efac', color: '#166534' }}>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                {selected.bonus_skills?.length > 0 && (
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                      Bonus Skills
                    </div>
                    <div style={s.skillsList}>
                      {selected.bonus_skills?.map(skill => (
                        <div key={skill} style={s.skillTag}>
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast */}
      <div style={s.toast(toast.show)}>{toast.msg}</div>
    </div>
  );
}

