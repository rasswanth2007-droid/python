import React from 'react';

export default function StatsBar({ candidates }) {
  if (!candidates.length) return null;
  const high = candidates.filter(c => c.final_score >= 70).length;
  const med = candidates.filter(c => c.final_score >= 40 && c.final_score < 70).length;
  const low = candidates.filter(c => c.final_score < 40).length;
  const avg = Math.round(candidates.reduce((a, c) => a + c.final_score, 0) / candidates.length);

  const stats = [
    { label: 'Total Candidates', value: candidates.length, color: '#0f172a' },
    { label: 'High Match (70%+)', value: high, color: '#16a34a' },
    { label: 'Medium Match', value: med, color: '#ca8a04' },
    { label: 'Low Match (<40%)', value: low, color: '#dc2626' },
    { label: 'Avg Match Score', value: avg + '%', color: '#7c3aed' },
  ];

  return (
    <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
      {stats.map(s => (
        <div key={s.label} style={{
          flex: 1, minWidth: 140,
          background: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: 10,
          padding: '18px 20px',
          borderTop: `3px solid ${s.color}`,
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
        }}>
          <div style={{ fontSize: 26, fontWeight: 700, color: s.color, marginBottom: 4, letterSpacing: '-0.02em' }}>{s.value}</div>
          <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

