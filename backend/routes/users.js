const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Înregistrare utilizator
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'Toate câmpurile obligatorii trebuie completate.' });
    }
    // Verifică dacă emailul există deja
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Emailul este deja folosit.' });
    }
    // Hash-uiește parola
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone
    });
    await user.save();
    // Generează token JWT (opțional, pentru login automat)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.status(201).json({ message: 'Utilizator creat cu succes!', token });
  } catch (err) {
    res.status(500).json({ error: 'Eroare la înregistrare.' });
  }
});

module.exports = router;
