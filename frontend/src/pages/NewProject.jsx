import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../api/auth.jsx';

const NewProject = () => {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploadedFiles(prev => [...prev, ...files.map(f => ({ name: f.name, file: f }))]);
    setFileName(files[0].name); // pentru compatibilitate cu restul codului
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Salvăm proiectul în localStorage per user (după email)
    if (user) {
      const allProjects = JSON.parse(localStorage.getItem('projects') || '{}');
      const userProjects = allProjects[user.email] || [];
      // Salvăm doar referința la nume, nu conținutul
      userProjects.push({ title, code, files: uploadedFiles.map(f => ({ name: f.name })), date: new Date().toISOString() });
      allProjects[user.email] = userProjects;
      localStorage.setItem('projects', JSON.stringify(allProjects));
      // Salvăm fișierele efectiv în localStorage separat (base64)
      uploadedFiles.forEach(async ({ name, file }) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          localStorage.setItem(`file_${user.email}_${name}`, event.target.result);
        };
        reader.readAsDataURL(file);
      });
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
        <button
          type="button"
          style={{
            width: '100%',
            marginTop: 18,
            marginBottom: 12,
            padding: '12px',
            background: '#e0e0e0',
            color: '#222',
            border: 'none',
            borderRadius: 6,
            fontSize: 16,
            fontWeight: 500,
            cursor: 'pointer',
          }}
          onClick={() => document.getElementById('file-upload').click()}
        >
          Add file
        </button>
        <input
          id="file-upload"
          type="file"
          multiple
          accept=".js,.jsx,.ts,.tsx,.py,.java,.c,.cpp,.txt,.json,.html,.css,.md"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {uploadedFiles.length > 0 && uploadedFiles.map((f, idx) => (
          <div key={idx} style={{ color: '#888', fontSize: 13, marginBottom: 8 }}>
            Loaded file: {f.name}
          </div>
        ))}
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
        }}>Save</button>
      </form>
    </Box>
  );
};

export default NewProject;
