import React, { useState, useEffect } from 'react';

const FileEditor = () => {
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch files la montare
  useEffect(() => {
    setLoading(true);
    fetch('/api/files')
      .then(res => res.json())
      .then(data => {
        setFiles(data);
        if (data.length > 0) {
          setSelectedFileId(data[0].id);
          setContent(data[0].content);
        }
      })
      .catch(() => setError('Eroare la încărcarea fișierelor'))
      .finally(() => setLoading(false));
  }, []);

  // Actualizează content când se schimbă fișierul selectat
  useEffect(() => {
    const file = files.find(f => f.id === selectedFileId);
    setContent(file ? file.content : '');
  }, [selectedFileId, files]);

  const handleSave = () => {
    setSaving(true);
    setError('');
    setSuccess('');
    fetch(`/api/files/${selectedFileId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
      .then(res => {
        if (!res.ok) throw new Error('Eroare la salvare');
        return res.json();
      })
      .then(updated => {
        setFiles(files => files.map(f => f.id === updated.id ? updated : f));
        setSuccess('Fișier salvat cu succes!');
      })
      .catch(() => setError('Eroare la salvare'))
      .finally(() => setSaving(false));
  };

  if (loading) return <div>Se încarcă fișierele...</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;

  return (
    <div className="file-editor-container">
      <select
        value={selectedFileId}
        onChange={e => setSelectedFileId(e.target.value)}
        style={{ marginBottom: 12 }}
      >
        {files.map(file => (
          <option key={file.id} value={file.id}>{file.name}</option>
        ))}
      </select>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={16}
        style={{ width: '100%', marginBottom: 12 }}
      />
      <button onClick={handleSave} style={{ padding: '8px 24px' }} disabled={saving}>
        {saving ? 'Se salvează...' : 'Salvează'}
      </button>
      {success && <div style={{color:'green', marginTop:8}}>{success}</div>}
    </div>
  );
};

export default FileEditor;
