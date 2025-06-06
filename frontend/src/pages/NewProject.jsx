import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const NewProject = () => {
  const [title, setTitle] = useState("");
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
      <TextField
        label="titlul proiectului"
        variant="outlined"
        value={title}
        onChange={e => {
          if (e.target.value.length <= 100) setTitle(e.target.value);
        }}
        inputProps={{ maxLength: 100 }}
        fullWidth
        sx={{ maxWidth: 400, background: '#fff' }}
      />
      <div style={{ color: '#888', marginTop: 8, fontSize: 14 }}>{title.length}/100</div>
    </Box>
  );
};

export default NewProject;
