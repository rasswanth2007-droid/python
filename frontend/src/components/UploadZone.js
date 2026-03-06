import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const UploadZone = ({ onUpload }) => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    // Accumulate files instead of replacing
    const updatedFiles = [...files, ...acceptedFiles];
    setFiles(updatedFiles);
    setMessage(`${acceptedFiles.length} file(s) added. Total: ${updatedFiles.length} file(s)`);
    // Immediately pass the updated files back to the parent
    if (onUpload) {
      onUpload(updatedFiles);
    }
  }, [files, onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    multiple: true // Allow multiple file uploads
  });

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setMessage(`${updatedFiles.length} file(s) remaining`);
    if (onUpload) {
      onUpload(updatedFiles);
    }
  };

  return (
    <div style={styles.container}>
      <div {...getRootProps()} style={{
        ...styles.dropzone,
        ...(isDragActive ? styles.dragActive : {})
      }}>
        <input {...getInputProps()} />
        <div style={styles.iconContainer}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <p style={styles.title}>Upload Resumes</p>
        <p style={styles.subtitle}>
          {isDragActive ? 'Drop the resumes here...' : 'Drag & drop resume files here, or click to select'}
        </p>
        <p style={styles.formats}>Supported formats: PDF, DOC, DOCX, TXT</p>
      </div>

      {files.length > 0 && (
        <div style={styles.fileList}>
          <h4 style={styles.fileListTitle}>Selected Files ({files.length}):</h4>
          {files.map((file, index) => (
            <div key={index} style={styles.fileItem}>
              <span style={styles.fileName}>{file.name}</span>
              <button
                onClick={() => removeFile(index)}
                style={styles.removeBtn}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {message && (
        <p style={styles.message}>{message}</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  dropzone: {
    border: '3px dashed #ccc',
    borderRadius: '12px',
    padding: '40px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: '#fafafa',
    transition: 'all 0.3s ease',
  },
  dragActive: {
    borderColor: '#2196F3',
    backgroundColor: '#e3f2fd',
  },
  iconContainer: {
    marginBottom: '16px',
    color: '#666',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 8px 0',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    margin: '0 0 12px 0',
  },
  formats: {
    fontSize: '14px',
    color: '#999',
    margin: 0,
  },
  fileList: {
    marginTop: '20px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
  fileListTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 12px 0',
    color: '#1a1a1a',
  },
  fileItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    backgroundColor: '#fff',
    borderRadius: '6px',
    marginBottom: '8px',
  },
  fileName: {
    fontSize: '14px',
    color: '#333',
  },
  removeBtn: {
    padding: '4px 12px',
    backgroundColor: '#ff5252',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
  },
  uploadButton: {
    width: '100%',
    padding: '16px 24px',
    marginTop: '20px',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  uploadButtonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  message: {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: '#e8f5e9',
    borderRadius: '6px',
    color: '#2e7d32',
    fontSize: '14px',
  },
};

export default UploadZone;
