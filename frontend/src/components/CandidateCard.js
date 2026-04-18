import React, { useState } from 'react';
import useIsMobile from '../hooks/useIsMobile';

const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#7c3aed', '#8b5cf6', '#c4b5fd'];

function scoreColor(score) {
  if (score >= 70) return { color: 'var(--success)', bg: 'var(--success-bg)', border: 'var(--success-border)' };
  if (score >= 40) return { color: 'var(--warning)', bg: 'var(--warning-bg)', border: 'var(--warning-border)' };
  return { color: 'var(--error)', bg: 'var(--error-bg)', border: 'var(--error-border)' };
}

const rankLabel = (rank) => {
  if (rank === 1) return { label: 'Top Match', bg: 'var(--accent-bg)', color: 'var(--accent)', border: 'var(--accent-border)' };
  if (rank === 2) return { label: '#2 Ranked', bg: 'var(--success-bg)', color: 'var(--success)', border: 'var(--success-border)' };
  if (rank === 3) return { label: '#3 Ranked', bg: 'rgba(37, 99, 235, 0.08)', color: '#3b82f6', border: 'rgba(37, 99, 235, 0.15)' };
  return { label: `#${rank}`, bg: 'var(--surface-hover)', color: 'var(--text-muted)', border: 'var(--border)' };
};

const s = {
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    marginBottom: 14,
    boxShadow: 'var(--shadow-sm)',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    animation: 'fadeInUp 0.4s ease-out both',
    position: 'relative',
  },
  cardTop: {
    padding: '18px 22px',
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    borderBottom: '1px solid var(--border-light)',
  },
  avatar: (color) => ({
    width: 46,
    height: 46,
    borderRadius: 'var(--radius)',
    background: `linear-gradient(135deg, ${color}, ${color}99)`,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 15,
    flexShrink: 0,
    boxShadow: `0 4px 12px ${color}30`,
  }),
  name: {
    fontWeight: 700,
    fontSize: 16,
    color: 'var(--text)',
    marginBottom: 2,
    letterSpacing: '-0.01em',
  },
  role: {
    fontSize: 13,
    color: 'var(--text-muted)',
  },
  rankBadge: (r) => ({
    marginLeft: 'auto',
    padding: '6px 14px',
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 600,
    background: r.bg,
    color: r.color,
    border: `1px solid ${r.border}`,
    letterSpacing: '0.01em',
    whiteSpace: 'nowrap',
  }),
  cardBody: { padding: '20px 22px' },
  scoreRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreLabel: {
    fontSize: 13,
    color: 'var(--text-secondary)',
    fontWeight: 600,
  },
  scoreVal: (sc) => ({
    fontWeight: 800,
    fontSize: 26,
    color: scoreColor(sc).color,
    letterSpacing: '-0.02em',
  }),
  bar: {
    height: 6,
    background: 'var(--border-light)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 18,
  },
  barFill: (sc) => ({
    height: '100%',
    width: `${sc}%`,
    borderRadius: 4,
    background: `linear-gradient(90deg, ${scoreColor(sc).color}, ${scoreColor(sc).color}cc)`,
    transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
    animation: 'bar-fill 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
  }),
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    marginBottom: 16,
  },
  skillGroup: {},
  groupLabel: {
    fontSize: 11,
    color: 'var(--accent)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: 8,
    fontWeight: 700,
  },
  pillRow: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  pill: (type) => {
    const map = {
      match: { bg: 'var(--success-bg)', color: 'var(--success)', border: 'var(--success-border)' },
      missing: { bg: 'var(--error-bg)', color: 'var(--error)', border: 'var(--error-border)' },
      bonus: { bg: 'var(--surface-hover)', color: 'var(--text-secondary)', border: 'var(--border)' },
    };
    const c = map[type] || map.bonus;
    return {
      padding: '4px 10px',
      borderRadius: 'var(--radius-sm)',
      fontSize: 12,
      fontWeight: 500,
      background: c.bg,
      color: c.color,
      border: `1px solid ${c.border}`,
      transition: 'transform var(--transition-fast)',
      ...(type === 'missing' ? { textDecoration: 'line-through', opacity: 0.6 } : {}),
    };
  },
  footer: {
    padding: '14px 22px',
    background: 'var(--surface-secondary)',
    borderTop: '1px solid var(--border-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  meta: {
    fontSize: 13,
    color: 'var(--text-muted)',
    display: 'flex',
    gap: 20,
  },
  actions: { display: 'flex', gap: 10,  flexWrap: 'wrap' },
  btn: (primary, disabled) => ({
    padding: '8px 16px',
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 600,
    border: `1px solid ${primary ? 'var(--accent)' : 'var(--border)'}`,
    background: primary ? 'var(--accent)' : 'var(--surface)',
    color: primary ? '#fff' : 'var(--text-secondary)',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all var(--transition)',
    boxShadow: primary && !disabled ? 'var(--shadow-accent)' : 'none',
    minHeight: 36,
  }),
  expandBtn: {
    width: '100%',
    padding: '12px',
    background: 'none',
    border: 'none',
    borderTop: '1px solid var(--border-light)',
    fontSize: 13,
    color: 'var(--accent)',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.2s',
    fontFamily: 'Inter, sans-serif',
    minHeight: 44,
  },
  expandBody: {
    padding: '20px 22px',
    borderTop: '1px solid var(--border-light)',
    background: 'var(--surface-secondary)',
    animation: 'fadeIn 0.3s ease-out',
  },
  detailGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  detailItem: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 10,
    padding: '14px 16px',
  },
  detailKey: {
    fontSize: 11,
    color: 'var(--accent)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: 4,
    fontWeight: 700,
  },
  detailVal: {
    fontSize: 14,
    color: 'var(--text)',
    fontWeight: 500,
  },
  previewBtn: {
    padding: '8px 16px',
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 600,
    border: '1px solid var(--accent-border)',
    background: 'var(--accent-bg)',
    color: 'var(--accent)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    minHeight: 36,
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.2s ease-out',
  },
  modalContent: {
    background: 'var(--surface)',
    borderRadius: 'var(--radius-lg)',
    maxWidth: 800,
    maxHeight: '90vh',
    width: '90%',
    overflow: 'auto',
    padding: 24,
    boxShadow: 'var(--shadow-xl)',
    animation: 'scale-in 0.3s ease-out',
    border: '1px solid var(--border)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottom: '1px solid var(--border)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--text)',
  },
  modalClose: {
    background: 'var(--accent-bg)',
    border: '1px solid var(--accent-border)',
    fontSize: 20,
    cursor: 'pointer',
    color: 'var(--accent)',
    padding: '4px 10px',
    borderRadius: 'var(--radius-sm)',
    transition: 'all var(--transition-fast)',
  },
  rawText: {
    fontSize: 13,
    lineHeight: 1.7,
    color: 'var(--text-secondary)',
    whiteSpace: 'pre-wrap',
    fontFamily: "'SF Mono', 'Fira Code', monospace",
    background: 'var(--surface-secondary)',
    padding: 16,
    borderRadius: 10,
    maxHeight: 400,
    overflow: 'auto',
    border: '1px solid var(--border)',
  },
};

export default function CandidateCard({ candidate, index, onShortlist }) {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);
  const [shortlisted, setShortlisted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const c = candidate;

  const color = COLORS[index % COLORS.length];
  const initials = c.name ? c.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??';
  const rank = rankLabel(c.rank);
  const sc = scoreColor(c.final_score);

  const handleShortlist = () => {
    setShortlisted(true);
    onShortlist && onShortlist(c);
  };

  return (
    <div
      style={{
        ...s.card,
        animationDelay: `${index * 0.06}s`,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = 'var(--accent-border)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border)';
      }}
    >
      {/* Top */}
      <div style={s.cardTop}>
        <div style={s.avatar(color)}>{initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={s.name}>{c.name || 'Unknown Candidate'}</div>
          <div style={s.role}>{c.email || 'No email found'}</div>
        </div>
        <div style={s.rankBadge(rank)}>{rank.label}</div>
      </div>

      {/* Body */}
      <div style={s.cardBody}>
        {/* Score */}
        <div style={s.scoreRow}>
          <span style={s.scoreLabel}>Overall Match Score</span>
          <span style={s.scoreVal(c.final_score)}>{c.final_score}%</span>
        </div>
        <div style={s.bar}><div style={s.barFill(c.final_score)} /></div>

        {/* Sub-scores */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          {[
            { label: 'Skill Match', val: c.skill_score + '%' },
            { label: 'Semantic', val: c.semantic_score + '%' },
            { label: 'Projects', val: (c.project_weight || 0) + '%' },
            { label: 'Experience', val: c.experience_bonus ? '+15%' : '-' },
          ].map(item => (
            <div key={item.label} style={{
              flex: isMobile ? '1 1 45%' : 1,
              background: 'var(--surface-secondary)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 12px',
              minWidth: isMobile ? 'auto' : 80,
            }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{item.val}</div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div style={{ ...s.grid2, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
          <div style={s.skillGroup}>
            <div style={s.groupLabel}>
              {(c.matched_skills && c.matched_skills.length > 0)
                ? `Matched Skills (${c.matched_skills.length})`
                : `Found Skills (${c.bonus_skills?.length || c.skills?.length || 0})`}
            </div>
            <div style={s.pillRow}>
              {(c.matched_skills && c.matched_skills.length > 0)
                ? c.matched_skills.map(sk => (
                  <span key={sk} style={s.pill('match')}>{sk}</span>
                ))
                : (c.bonus_skills?.length > 0 ? c.bonus_skills : c.skills || []).map(sk => (
                  <span key={sk} style={s.pill('bonus')}>{sk}</span>
                ))}
              {!c.matched_skills?.length && !c.skills?.length &&
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>No skills detected</span>}
            </div>
          </div>
          <div style={s.skillGroup}>
            <div style={s.groupLabel}>Missing Skills ({c.missing_skills?.length || 0})</div>
            <div style={s.pillRow}>
              {c.missing_skills?.length > 0
                ? c.missing_skills.map(sk => <span key={sk} style={s.pill('missing')}>{sk}</span>)
                : <span style={{ fontSize: 13, color: 'var(--success)', fontWeight: 500 }}>All matched!</span>}
            </div>
          </div>
        </div>

        {c.bonus_skills?.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <div style={s.groupLabel}>Bonus Skills</div>
            <div style={s.pillRow}>
              {c.bonus_skills.map(sk => <span key={sk} style={s.pill('bonus')}>{sk}</span>)}
            </div>
          </div>
        )}
      </div>

      {/* Expand toggle */}
      <button
        style={s.expandBtn}
        onClick={() => setExpanded(!expanded)}
        onMouseOver={(e) => e.target.style.background = 'var(--surface-hover)'}
        onMouseOut={(e) => e.target.style.background = 'none'}
      >
        {expanded ? 'Hide Details' : 'Show Full Profile'}
      </button>

      {/* Expanded */}
      {expanded && (
        <div style={s.expandBody}>
          <div style={{ ...s.detailGrid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
            <div style={s.detailItem}>
              <div style={s.detailKey}>Education</div>
              <div style={s.detailVal}>{Array.isArray(c.education) ? c.education[0] : c.education || '—'}</div>
            </div>
            <div style={s.detailItem}>
              <div style={s.detailKey}>Experience</div>
              <div style={s.detailVal}>{c.experience || '—'}</div>
            </div>
            <div style={s.detailItem}>
              <div style={s.detailKey}>Phone</div>
              <div style={s.detailVal}>{c.phone || '—'}</div>
            </div>
            <div style={s.detailItem}>
              <div style={s.detailKey}>File</div>
              <div style={s.detailVal}>{c.filename || '—'}</div>
            </div>
          </div>
          {c.education?.length > 1 && (
            <div style={{ marginTop: 14 }}>
              <div style={{ ...s.groupLabel, marginBottom: 6 }}>All Education</div>
              {c.education.map((e, i) => (
                <div key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>{e}</div>
              ))}
            </div>
          )}

          {/* Per-Requirement Analysis Report */}
          {c.analysis_report && c.analysis_report.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={{
                fontSize: 14, fontWeight: 700, color: 'var(--text)',
                marginBottom: 12, paddingBottom: 8,
                borderBottom: '2px solid var(--border)',
                letterSpacing: '-0.01em',
              }}>
                Requirement Analysis Report
              </div>
              {c.analysis_report.map((item, i) => (
                <div key={i} style={{
                  background: 'var(--surface)',
                  border: `1px solid ${item.present_and_adequate ? 'var(--success-border)' : 'var(--error-border)'}`,
                  borderRadius: 10,
                  padding: '14px 16px',
                  marginBottom: 10,
                  borderLeft: `4px solid ${item.present_and_adequate ? 'var(--success)' : 'var(--error)'}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>
                      {item.requirement}
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 4,
                      background: item.present_and_adequate ? 'var(--success-bg)' : 'var(--error-bg)',
                      color: item.present_and_adequate ? 'var(--success)' : 'var(--error)',
                    }}>
                      {item.present_and_adequate ? 'ADEQUATE' : 'NEEDS ATTENTION'}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4, lineHeight: 1.5 }}>
                    {item.recommendation}
                  </div>
                  {item.modified_for_usefulness && (
                    <div style={{
                      fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic',
                      background: 'var(--surface-secondary)', padding: '6px 10px', borderRadius: 6, marginTop: 6,
                    }}>
                      {item.modified_for_usefulness}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div style={{ ...s.footer, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 10 : 0 }}>
        <div style={{ ...s.meta, fontSize: isMobile ? 12 : 13, flexWrap: 'wrap' }}>
          <span>{Array.isArray(c.education) ? c.education[0]?.slice(0, 35) + '...' : c.education || 'No education'}</span>
          <span>{c.filename || 'No file'}</span>
        </div>
        <div style={s.actions}>
          <button
            style={s.btn(false, false)}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Collapse' : 'Details'}
          </button>
          <button
            style={s.previewBtn}
            onClick={() => setShowPreview(true)}
          >
            Preview Resume
          </button>
          <button
            style={{
              ...s.btn(true, shortlisted),
              background: shortlisted ? 'var(--success)' : 'var(--accent)',
              borderColor: shortlisted ? 'var(--success)' : 'var(--accent)',
            }}
            onClick={handleShortlist}
          >
            {shortlisted ? 'Shortlisted' : 'Shortlist'}
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div style={s.modalOverlay} onClick={() => setShowPreview(false)}>
          <div style={s.modalContent} onClick={e => e.stopPropagation()}>
            <div style={s.modalHeader}>
              <span style={s.modalTitle}>Resume Preview - {c.name || 'Unknown'}</span>
              <button style={s.modalClose} onClick={() => setShowPreview(false)}>×</button>
            </div>
            <div style={{ marginBottom: 16, color: 'var(--text-secondary)', fontSize: 14 }}>
              <strong style={{ color: 'var(--text)' }}>Email:</strong> {c.email || 'N/A'} | <strong style={{ color: 'var(--text)' }}>Phone:</strong> {c.phone || 'N/A'} | <strong style={{ color: 'var(--text)' }}>Experience:</strong> {c.experience || 'N/A'}
            </div>
            <div style={{ marginBottom: 16, color: 'var(--text-secondary)', fontSize: 14 }}>
              <strong style={{ color: 'var(--text)' }}>Skills:</strong> {c.skills?.join(', ') || 'None detected'}
            </div>
            <div style={{ marginBottom: 16, color: 'var(--text-secondary)', fontSize: 14 }}>
              <strong style={{ color: 'var(--text)' }}>Education:</strong><br />
              {Array.isArray(c.education) ? c.education.join(', ') : c.education || 'Not found'}
            </div>
            <div>
              <strong style={{ color: 'var(--text)', fontSize: 14 }}>Resume Content:</strong>
              <div style={s.rawText}>
                {c.raw_text || 'No raw text available. This could be because the file was image-based or extraction failed.'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
