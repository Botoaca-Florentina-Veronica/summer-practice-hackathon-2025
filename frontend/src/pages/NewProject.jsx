import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../api/auth.jsx';

const NewProject = () => {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Salvăm proiectul în localStorage per user (după email)
    if (user) {
      const allProjects = JSON.parse(localStorage.getItem('projects') || '{}');
      const userProjects = allProjects[user.email] || [];
      userProjects.push({ title, code, date: new Date().toISOString() });
      allProjects[user.email] = userProjects;
      localStorage.setItem('projects', JSON.stringify(allProjects));
      navigate('/projects');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 400 }}>
        <TextField
          label="Project name: "
          variant="outlined"
          value={title}
          onChange={e => {
            if (e.target.value.length <= 100) setTitle(e.target.value);
          }}
          inputProps={{ maxLength: 100 }}
          fullWidth
          sx={{ background: '#fff' }}
        />
        <div style={{ color: '#888', marginTop: 8, fontSize: 14 }}>{title.length}/100</div>
        <TextField
          label="Your code here:"
          variant="outlined"
          value={code}
          onChange={e => setCode(e.target.value)}
          fullWidth
          multiline
          minRows={8}
          sx={{ background: '#fafafa', marginTop: 3 }}
          InputProps={{ style: { fontFamily: 'monospace', color: '#222' } }}
        />
        <button type="submit" style={{
          width: '100%',
          marginTop: 24,
          padding: '12px',
          background: '#43b04a',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          fontSize: 18,
          fontWeight: 500,
          cursor: 'pointer'
        }}>Salvează proiectul</button>
      </form>
    </Box>
  );
};

export default NewProject;
