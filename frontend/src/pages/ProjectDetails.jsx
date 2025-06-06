import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../api/auth.jsx';

const ProjectDetails = () => {
  const { user } = useAuth();
  const { idx } = useParams();
  const navigate = useNavigate();
  if (!user) return <div style={{textAlign:'center',marginTop:40}}>Trebuie să fii autentificat pentru a vedea proiectul.</div>;
  const allProjects = JSON.parse(localStorage.getItem('projects') || '{}');
  const userProjects = allProjects[user.email] || [];
  const proj = userProjects[parseInt(idx)];
  if (!proj) return <div style={{textAlign:'center',marginTop:40}}>Proiect inexistent.</div>;

  const handleDownload = (fileName) => {
    const dataUrl = localStorage.getItem(`file_${user.email}_${fileName}`);
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}>
      <button onClick={() => navigate('/projects')} style={{marginBottom:24, background:'#eee', border:'none', borderRadius:6, padding:'8px 18px', cursor:'pointer'}}>← Înapoi la proiecte</button>
      <h2 style={{marginBottom:16}}>{proj.title || 'Fără titlu'}</h2>
      <pre style={{ background: '#fafafa', padding: 16, borderRadius: 8, fontFamily: 'monospace', color: '#222', overflowX: 'auto', fontSize:16 }}>{proj.code}</pre>
      {proj.files && proj.files.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <b>Fișiere încărcate:</b>
          <ul style={{ paddingLeft: 18 }}>
            {proj.files.map((f, i) => (
              <li key={i}>
                <button style={{
                  background: 'none',
                  border: 'none',
                  color: '#1976d2',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: 15
                }} onClick={() => handleDownload(f.name)}>
                  {f.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div style={{ color: '#888', fontSize: 13, marginTop: 18 }}>Salvat: {new Date(proj.date).toLocaleString()}</div>
    </div>
  );
};

export default ProjectDetails;
