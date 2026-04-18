import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import useIsMobile from '../hooks/useIsMobile';

const styles = {
  zone: (isDrag) => ({
    border: `2px dashed ${isDrag ? 'var(--accent)' : 'var(--border)'}`,
    borderRadius: 'var(--radius-lg)',
    padding: '36px 24px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    background: isDrag ? 'var(--accent-bg)' : 'var(--surface-secondary)',
    ...(isDrag ? {
      transform: 'scale(1.01)',
      boxShadow: 'var(--shadow-accent)',
      borderColor: 'var(--accent)',
    } : {}),
  }),
  icon: {
    width: 48,
    height: 48,
    margin: '0 auto 16px',
    opacity: 0.4,
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  },
  title: {
    fontWeight: 700,
    fontSize: 16,
    color: 'var(--text)',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: 'var(--text-muted)',
    marginBottom: 4,
  },
  format: {
    fontSize: 12,
    color: 'var(--text-dim)',
    marginTop: 8,
  },
  fileList: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  fileItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 14px',
    background: 'var(--surface)',
    borderRadius: 10,
    border: '1px solid var(--border)',
    fontSize: 13,
    color: 'var(--text)',
    animation: 'fadeInUp 0.3s ease-out',
    transition: 'all var(--transition-fast)',
  },
  fileName: {
    fontWeight: 500,
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  fileSize: {
    fontSize: 12,
    color: 'var(--text-muted)',
    marginLeft: 12,
    flexShrink: 0,
  },
  removeBtn: {
    marginLeft: 10,
    background: 'none',
    border: 'none',
    fontSize: 16,
    color: 'var(--text-dim)',
    cursor: 'pointer',
    padding: '2px 6px',
    borderRadius: 6,
    transition: 'all 0.2s',
    minWidth: 28,
    minHeight: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtn: {
    marginTop: 12,
    padding: '8px 16px',
    background: 'var(--error-bg)',
    color: 'var(--error)',
    border: '1px solid var(--error-border)',
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    minHeight: 36,
    fontFamily: 'Inter, sans-serif',
  },
};

export default function UploadZone({ onUpload }) {
  const isMobile = useIsMobile();
  const [files, setFilesLocal] = useState([]);

  const updateFiles = (newFiles) => {
    setFilesLocal(newFiles);
    onUpload && onUpload(newFiles);
  };

  const onDrop = (acceptedFiles) => {
    const updated = [...files, ...acceptedFiles];
    updateFiles(updated);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    multiple: true,
  });

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const removeFile = (idx) => {
    const updated = files.filter((_, i) => i !== idx);
    updateFiles(updated);
  };

  return (
    <div>
      <div {...getRootProps()} style={styles.zone(isDragActive)}>
        <input {...getInputProps()} />
        <div style={{
          ...styles.icon,
          animation: isDragActive ? 'float 2s ease-in-out infinite' : 'none',
          opacity: isDragActive ? 0.8 : 0.4,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <div style={styles.title}>Upload Resumes</div>
        <div style={styles.subtitle}>
          {isDragActive ? 'Drop files here...' : 'Drag & drop resume files here, or click to select'}
        </div>
        <div style={styles.format}>Supported formats: PDF, DOC, DOCX, TXT, PNG, JPG, JPEG</div>
      </div>

      {files.length > 0 && (
        <div style={styles.fileList}>
          {files.map((file, i) => (
            <div key={i} style={styles.fileItem}>
              <span style={{ marginRight: 8, color: 'var(--accent)', display: 'flex', alignItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              </span>
              <span style={styles.fileName}>{file.name}</span>
              <span style={styles.fileSize}>{formatSize(file.size)}</span>
              <button
                style={styles.removeBtn}
                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                onMouseOver={e => e.currentTarget.style.color = 'var(--error)'}
                onMouseOut={e => e.currentTarget.style.color = 'var(--text-dim)'}
              >×</button>
            </div>
          ))}
          <button
            style={styles.clearBtn}
            onClick={() => updateFiles([])}
          >Clear all files</button>
        </div>
      )}
    </div>
  );
}
