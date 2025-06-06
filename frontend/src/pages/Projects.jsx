import React, { useState } from "react";
import { useAuth } from '../api/auth.jsx';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState('');
  if (!user) return <div style={{textAlign:'center',marginTop:40}}>Trebuie să fii autentificat pentru a vedea proiectele tale.</div>;
  const allProjects = JSON.parse(localStorage.getItem('projects') || '{}');
  const userProjects = allProjects[user.email] || [];

  const handleDelete = (idx) => {
    if (!window.confirm('Sigur vrei să ștergi acest proiect?')) return;
    setDeleting(true);
    setDeleteMsg('');
    // Șterge fișierele asociate
    const proj = userProjects[idx];
    if (proj.files && proj.files.length > 0) {
      proj.files.forEach(f => {
        localStorage.removeItem(`file_${user.email}_${f.name}`);
      });
    }
    // Șterge proiectul
    const newProjects = [...userProjects];
    newProjects.splice(idx, 1);
    allProjects[user.email] = newProjects;
    localStorage.setItem('projects', JSON.stringify(allProjects));
    setDeleteMsg('Proiect șters cu succes!');
    setDeleting(false);
    setRefresh(r => r + 1);
  };

  // Forțează re-render la refresh
  const projectsToShow = JSON.parse(localStorage.getItem('projects') || '{}')[user.email] || [];

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}>
      <h2 style={{marginBottom:32}}>Proiectele tale</h2>
      {deleteMsg && <div style={{color:'green', marginBottom:16}}>{deleteMsg}</div>}
      {projectsToShow.length === 0 && <div style={{color:'#888'}}>Nu ai niciun proiect salvat.</div>}
      <ul style={{listStyle:'none',padding:0}}>
        {projectsToShow.map((proj, idx) => (
          <li key={idx} style={{ marginBottom: 24, display:'flex', alignItems:'center', gap:16 }}>
            <button
              style={{
                background: '#fafafa',
                border: '1px solid #e0e0e0',
                borderRadius: 8,
                padding: '16px 20px',
                fontSize: 18,
                fontWeight: 500,
                color: '#222',
                width: '100%',
                textAlign: 'left',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
              onClick={() => navigate(`/projects/${idx}`)}
            >
              {proj.title || 'Fără titlu'}
            </button>
            <button
              onClick={() => handleDelete(idx)}
              style={{ background:'#ff4444', color:'#fff', border:'none', borderRadius:8, padding:'10px 18px', fontWeight:600, cursor:deleting?'not-allowed':'pointer', opacity:deleting?0.7:1 }}
              disabled={deleting}
            >
              Șterge
            </button>
            <div style={{ color: '#888', fontSize: 13, marginTop: 8, minWidth: 120 }}>Salvat: {new Date(proj.date).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
