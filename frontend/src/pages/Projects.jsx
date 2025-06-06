import React from "react";
import { useAuth } from '../api/auth.jsx';

const Projects = () => {
  const { user } = useAuth();
  if (!user) return <div style={{textAlign:'center',marginTop:40}}>Trebuie să fii autentificat pentru a vedea proiectele tale.</div>;
  const allProjects = JSON.parse(localStorage.getItem('projects') || '{}');
  const userProjects = allProjects[user.token] || [];

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}>
      <h2 style={{marginBottom:32}}>Proiectele tale</h2>
      {userProjects.length === 0 && <div style={{color:'#888'}}>Nu ai niciun proiect salvat.</div>}
      {userProjects.map((proj, idx) => (
        <div key={idx} style={{ marginBottom: 32, borderBottom: '1px solid #eee', paddingBottom: 24 }}>
          <h3 style={{marginBottom:8}}>{proj.title}</h3>
          <pre style={{ background: '#fafafa', padding: 16, borderRadius: 8, fontFamily: 'monospace', color: '#222', overflowX: 'auto' }}>{proj.code}</pre>
          <div style={{ color: '#888', fontSize: 13, marginTop: 8 }}>Salvat: {new Date(proj.date).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
