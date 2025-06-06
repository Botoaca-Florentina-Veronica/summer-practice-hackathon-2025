require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conectare la MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectat la MongoDB Atlas!'))
  .catch(err => console.error('Eroare conectare MongoDB:', err));

// Exemplu ruta test
app.get('/', (req, res) => {
  res.send('Backend funcționează!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serverul rulează pe portul ${PORT}`));
