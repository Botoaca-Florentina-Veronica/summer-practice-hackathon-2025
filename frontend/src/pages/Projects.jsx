import React from "react";
import { useAuth } from '../api/auth.jsx';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) return <div style={{textAlign:'center',marginTop:40}}>Trebuie să fii autentificat pentru a vedea proiectele tale.</div>;
  const allProjects = JSON.parse(localStorage.getItem('projects') || '{}');
  const userProjects = allProjects[user.email] || [];

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}>
      <h2 style={{marginBottom:32}}>Proiectele tale</h2>
      {userProjects.length === 0 && <div style={{color:'#888'}}>Nu ai niciun proiect salvat.</div>}
      <ul style={{listStyle:'none',padding:0}}>
        {userProjects.map((proj, idx) => (
          <li key={idx} style={{ marginBottom: 24 }}>
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
            <div style={{ color: '#888', fontSize: 13, marginTop: 8 }}>Salvat: {new Date(proj.date).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
