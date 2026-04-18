import React, { useState } from 'react';
import useIsMobile from '../hooks/useIsMobile';

const COMMON_SKILLS = [
  'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Java', 'C++',
  'SQL', 'AWS', 'Docker', 'Git', 'Machine Learning', 'Data Analysis',
  'HTML', 'CSS', 'MongoDB', 'PostgreSQL', 'Linux', 'Kubernetes', 'REST API',
];

export default function SkillSelector({ selected = [], setSelected }) {
  const isMobile = useIsMobile();
  const [custom, setCustom] = useState('');

  const toggle = (skill) => {
    if (selected.includes(skill)) setSelected(selected.filter(s => s !== skill));
    else setSelected([...selected, skill]);
  };

  const addCustom = () => {
    const trimmed = custom.trim();
    if (trimmed && !selected.includes(trimmed)) {
      setSelected([...selected, trimmed]);
      setCustom('');
    }
  };

  return (
    <div>
      {/* Selected pills */}
      {selected.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {selected.map(skill => (
            <span
              key={skill}
              onClick={() => toggle(skill)}
              style={{
                padding: '5px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 12,
                fontWeight: 600,
                background: 'var(--accent-bg)',
                color: 'var(--accent)',
                border: '1px solid var(--accent-border)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                animation: 'scale-in 0.2s ease-out',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                minHeight: 30,
              }}
            >
              {skill}
              <span style={{ fontSize: 14, opacity: 0.5 }}>×</span>
            </span>
          ))}
        </div>
      )}

      {/* Quick add */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
        {COMMON_SKILLS.filter(s => !selected.includes(s)).slice(0, isMobile ? 8 : 12).map(skill => (
          <span
            key={skill}
            onClick={() => toggle(skill)}
            style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 12,
              fontWeight: 500,
              background: 'var(--surface-secondary)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minHeight: 28,
            }}
            onMouseOver={e => {
              e.target.style.borderColor = 'var(--accent-border)';
              e.target.style.color = 'var(--accent)';
              e.target.style.background = 'var(--accent-bg)';
            }}
            onMouseOut={e => {
              e.target.style.borderColor = 'var(--border)';
              e.target.style.color = 'var(--text-muted)';
              e.target.style.background = 'var(--surface-secondary)';
            }}
          >
            + {skill}
          </span>
        ))}
      </div>

      {/* Custom input */}
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          placeholder="Add custom skill..."
          value={custom}
          onChange={e => setCustom(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addCustom()}
          style={{
            flex: 1,
            padding: '10px 14px',
            border: '1px solid var(--border)',
            borderRadius: 10,
            fontSize: 13,
            outline: 'none',
            fontFamily: 'Inter, sans-serif',
            color: 'var(--text)',
            background: 'var(--surface)',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            minHeight: 40,
          }}
          onFocus={e => {
            e.target.style.borderColor = 'var(--accent)';
            e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)';
          }}
          onBlur={e => {
            e.target.style.borderColor = 'var(--border)';
            e.target.style.boxShadow = 'none';
          }}
        />
        <button
          onClick={addCustom}
          style={{
            padding: '10px 18px',
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: 'var(--shadow-accent)',
            minHeight: 40,
            fontFamily: 'Inter, sans-serif',
          }}
          onMouseOver={e => e.target.style.background = 'var(--accent-hover)'}
          onMouseOut={e => e.target.style.background = 'var(--accent)'}
        >Add</button>
      </div>
    </div>
  );
}
