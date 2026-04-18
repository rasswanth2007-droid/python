import React, { useState, useEffect } from 'react';
import useIsMobile from '../hooks/useIsMobile';

function AnimatedValue({ value, suffix = '' }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.max(1, Math.floor(value / 40));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [value]);
  return <>{display}{suffix}</>;
}

export default function StatsBar({ candidates }) {
  const isMobile = useIsMobile();
  if (!candidates.length) return null;

  const total = candidates.length;
  const high = candidates.filter(c => c.final_score >= 70).length;
  const med = candidates.filter(c => c.final_score >= 40 && c.final_score < 70).length;
  const low = candidates.filter(c => c.final_score < 40).length;
  const avg = Math.round(candidates.reduce((sum, c) => sum + c.final_score, 0) / total);

  const stats = [
    { label: 'Total', value: total, isPercent: false, color: 'var(--accent)', bg: 'var(--accent-bg)', border: 'var(--accent-border)' },
    { label: 'High Match', value: high, isPercent: false, color: 'var(--success)', bg: 'var(--success-bg)', border: 'var(--success-border)' },
    { label: 'Medium', value: med, isPercent: false, color: 'var(--warning)', bg: 'var(--warning-bg)', border: 'var(--warning-border)' },
    { label: 'Low Match', value: low, isPercent: false, color: 'var(--error)', bg: 'var(--error-bg)', border: 'var(--error-border)' },
    { label: 'Avg Score', value: avg, isPercent: true, color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.15)' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
      gap: 10,
      marginBottom: 20,
      animation: 'fadeInUp 0.4s ease-out',
    }}>
      {stats.map((s, i) => (
        <div key={s.label} style={{
          background: s.bg,
          border: `1px solid ${s.border}`,
          borderRadius: 'var(--radius)',
          padding: isMobile ? '14px 12px' : '16px 16px',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          animation: `fadeInUp 0.4s ease-out ${i * 0.06}s both`,
          cursor: 'default',
          ...(isMobile && i === stats.length - 1 ? { gridColumn: 'span 2' } : {}),
        }}>
          <div style={{
            fontSize: isMobile ? 22 : 26,
            fontWeight: 800,
            color: s.color,
            letterSpacing: '-0.03em',
            animation: 'count-up 0.5s ease-out both',
          }}>
            <AnimatedValue value={s.value} suffix={s.isPercent ? '%' : ''} />
          </div>
          <div style={{
            fontSize: 11,
            color: 'var(--text-muted)',
            fontWeight: 600,
            marginTop: 2,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}
