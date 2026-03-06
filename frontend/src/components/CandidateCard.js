import React, { useState } from 'react';

const COLORS = ['#0f172a', '#334155', '#475569', '#64748b', '#94a3b8', '#cbd5e1'];

function scoreColor(score) {
  if (score >= 70) return { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' };
  if (score >= 40) return { color: '#ca8a04', bg: '#fefce8', border: '#fef08a' };
  return { color: '#dc2626', bg: '#fef2f2', border: '#fecaca' };
}

const rankLabel = (rank) => {
  if (rank === 1) return { label: 'Top Match', bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' };
  if (rank === 2) return { label: '#2 Ranked', bg: '#f0fdf4', color: '#166534', border: '#bbf7d0' };
  if (rank === 3) return { label: '#3 Ranked', bg: '#eff6ff', color: '#1e40af', border: '#bfdbfe' };
  return { label: `#${rank}`, bg: '#f8fafc', color: '#64748b', border: '#e2e8f0' };
};

const s = {
  card: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
  },
  cardTop: {
    padding: '18px 22px',
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    borderBottom: '1px solid #f1f5f9',
  },
  avatar: (color) => ({
    width: 48, height: 48,
    borderRadius: 10,
    background: color,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 16,
    flexShrink: 0,
    letterSpacing: '-0.01em',
  }),
  name: { fontWeight: 600, fontSize: 16, color: '#0f172a', marginBottom: 2, letterSpacing: '-0.01em' },
  role: { fontSize: 13, color: '#64748b' },
  rankBadge: (r) => ({
    marginLeft: 'auto',
    padding: '6px 14px',
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 600,
    background: r.bg,
    color: r.color,
    border: `1px solid ${r.border}`,
    letterSpacing: '0.01em',
  }),
  cardBody: { padding: '20px 22px' },
  scoreRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  scoreLabel: { fontSize: 13, color: '#475569', fontWeight: 600 },
  scoreVal: (sc) => ({
    fontWeight: 700,
    fontSize: 24,
    color: scoreColor(sc).color,
    letterSpacing: '-0.02em',
  }),
  bar: { height: 8, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden', marginBottom: 18 },
  barFill: (sc) => ({
    height: '100%',
    width: `${sc}%`,
    borderRadius: 4,
    background: scoreColor(sc).color,
    transition: 'width 0.8s ease',
  }),
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 },
  skillGroup: {},
  groupLabel: { fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8, fontWeight: 600 },
  pillRow: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  pill: (type) => {
    const map = {
      match: { bg: '#f0fdf4', color: '#166534', border: '#bbf7d0' },
      missing: { bg: '#fef2f2', color: '#991b1b', border: '#fecaca' },
      bonus: { bg: '#f8fafc', color: '#475569', border: '#e2e8f0' },
    };
    const c = map[type] || map.bonus;
    return {
      padding: '5px 10px',
      borderRadius: 5,
      fontSize: 12,
      fontWeight: 500,
      background: c.bg,
      color: c.color,
      border: `1px solid ${c.border}`,
      ...(type === 'missing' ? { textDecoration: 'line-through', opacity: 0.7 } : {}),
    };
  },
  footer: {
    padding: '14px 22px',
    background: '#f8fafc',
    borderTop: '1px solid #f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  meta: { fontSize: 13, color: '#64748b', display: 'flex', gap: 20 },
  actions: { display: 'flex', gap: 10 },
  btn: (primary, disabled) => ({
    padding: '8px 16px',
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 600,
    border: `1px solid ${primary ? '#0f172a' : '#cbd5e1'}`,
    background: primary ? '#0f172a' : '#fff',
    color: primary ? '#fff' : '#475569',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.15s',
  }),
  expandBtn: {
    width: '100%',
    padding: '10px',
    background: 'none',
    border: 'none',
    borderTop: '1px solid #f1f5f9',
    fontSize: 13,
    color: '#475569',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.2s',
  },
  expandBody: {
    padding: '20px 22px',
    borderTop: '1px solid #f1f5f9',
    background: '#f8fafc',
  },
  detailGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  detailItem: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '14px 16px' },
  detailKey: { fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 },
  detailVal: { fontSize: 14, color: '#1e293b', fontWeight: 500 },
  previewBtn: {
    padding: '8px 16px',
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 600,
    border: '1px solid #2563eb',
    background: '#fff',
    color: '#2563eb',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    background: '#fff',
    borderRadius: 12,
    maxWidth: 800,
    maxHeight: '90vh',
    width: '90%',
    overflow: 'auto',
    padding: 24,
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottom: '1px solid #e2e8f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#0f172a',
  },
  modalClose: {
    background: 'none',
    border: 'none',
    fontSize: 24,
    cursor: 'pointer',
    color: '#64748b',
    padding: 4,
  },
  rawText: {
    fontSize: 13,
    lineHeight: 1.7,
    color: '#334155',
    whiteSpace: 'pre-wrap',
    fontFamily: 'monospace',
    background: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    maxHeight: 400,
    overflow: 'auto',
  },
};

export default function CandidateCard({ candidate, index, onShortlist }) {
  const [expanded, setExpanded] = useState(false);
  const [shortlisted, setShortlisted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const c = candidate;

  // DEBUG: Log what skills data we're receiving
  console.log(`[CandidateCard] ${c.name}:`, {
    skills_found: c.skills?.length,
    matched_skills: c.matched_skills,
    bonus_skills: c.bonus_skills,
    missing_skills: c.missing_skills,
    skill_score: c.skill_score,
  });

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
      style={s.card}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.08)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.04)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Top */}
      <div style={s.cardTop}>
        <div style={s.avatar(color)}>{initials}</div>
        <div>
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
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          {[
            { label: 'Skill Match', val: c.skill_score + '%' },
            { label: 'Semantic', val: c.semantic_score + '%' },
            { label: 'Projects', val: (c.project_weight || 0) + '%' },
            { label: 'Experience', val: c.experience_bonus ? '+15%' : '-' },
          ].map(item => (
            <div key={item.label} style={{ flex: 1, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 12px', minWidth: 80 }}>
              <div style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>{item.val}</div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div style={s.grid2}>
          <div style={s.skillGroup}>
            <div style={s.groupLabel}>
              {/* If matched_skills has items, show "Matched Skills", otherwise show "Found Skills" */}
              {(c.matched_skills && c.matched_skills.length > 0)
                ? `Matched Skills (${c.matched_skills.length})`
                : `Found Skills (${c.bonus_skills?.length || c.skills?.length || 0})`}
            </div>
            <div style={s.pillRow}>
              {/* Show matched skills if they exist, otherwise show bonus/found skills */}
              {(c.matched_skills && c.matched_skills.length > 0)
                ? c.matched_skills.map(sk => (
                  <span key={sk} style={s.pill('match')}>
                    {sk}
                  </span>
                ))
                : (c.bonus_skills?.length > 0 ? c.bonus_skills : c.skills || []).map(sk => (
                  <span key={sk} style={s.pill('bonus')}>
                    {sk}
                  </span>
                ))}
              {!c.matched_skills?.length && !c.skills?.length &&
                <span style={{ fontSize: 13, color: '#94a3b8' }}>No skills detected</span>}
            </div>
          </div>
          <div style={s.skillGroup}>
            <div style={s.groupLabel}>Missing Skills ({c.missing_skills?.length || 0})</div>
            <div style={s.pillRow}>
              {c.missing_skills?.length > 0
                ? c.missing_skills.map(sk => <span key={sk} style={s.pill('missing')}>{sk}</span>)
                : <span style={{ fontSize: 13, color: '#16a34a', fontWeight: 500 }}>All matched!</span>}
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
        onMouseOver={(e) => e.target.style.background = '#f1f5f9'}
        onMouseOut={(e) => e.target.style.background = 'none'}
      >
        {expanded ? 'Hide Details' : 'Show Full Profile'}
      </button>

      {/* Expanded */}
      {expanded && (
        <div style={s.expandBody}>
          <div style={s.detailGrid}>
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
                <div key={i} style={{ fontSize: 13, color: '#475569', marginBottom: 4 }}>{e}</div>
              ))}
            </div>
          )}

          {/* Per-Requirement Analysis Report */}
          {c.analysis_report && c.analysis_report.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={{
                fontSize: 14, fontWeight: 700, color: '#0f172a',
                marginBottom: 12, paddingBottom: 8,
                borderBottom: '2px solid #e2e8f0',
                letterSpacing: '-0.01em',
              }}>
                📋 Requirement Analysis Report
              </div>
              {c.analysis_report.map((item, i) => (
                <div key={i} style={{
                  background: '#fff',
                  border: `1px solid ${item.present_and_adequate ? '#bbf7d0' : '#fecaca'}`,
                  borderRadius: 10,
                  padding: '14px 16px',
                  marginBottom: 10,
                  borderLeft: `4px solid ${item.present_and_adequate ? '#16a34a' : '#dc2626'}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#1e293b' }}>
                      {item.present_and_adequate ? '✅' : '❌'} {item.requirement}
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 4,
                      background: item.present_and_adequate ? '#f0fdf4' : '#fef2f2',
                      color: item.present_and_adequate ? '#166534' : '#991b1b',
                    }}>
                      {item.present_and_adequate ? 'ADEQUATE' : 'NEEDS ATTENTION'}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: '#475569', marginBottom: 4, lineHeight: 1.5 }}>
                    {item.recommendation}
                  </div>
                  {item.modified_for_usefulness && (
                    <div style={{
                      fontSize: 12, color: '#64748b', fontStyle: 'italic',
                      background: '#f8fafc', padding: '6px 10px', borderRadius: 6, marginTop: 6,
                    }}>
                      💡 {item.modified_for_usefulness}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div style={s.footer}>
        <div style={s.meta}>
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
            style={{ ...s.btn(true, shortlisted), background: shortlisted ? '#16a34a' : '#0f172a', borderColor: shortlisted ? '#16a34a' : '#0f172a' }}
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
            <div style={{ marginBottom: 16 }}>
              <strong>Email:</strong> {c.email || 'N/A'} | <strong>Phone:</strong> {c.phone || 'N/A'} | <strong>Experience:</strong> {c.experience || 'N/A'}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>Skills:</strong> {c.skills?.join(', ') || 'None detected'}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>Education:</strong><br />
              {Array.isArray(c.education) ? c.education.join(', ') : c.education || 'Not found'}
            </div>
            <div>
              <strong>Resume Content:</strong>
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

