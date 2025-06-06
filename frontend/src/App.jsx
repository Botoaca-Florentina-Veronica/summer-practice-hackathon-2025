import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import Header from './components/Header';
import Login from './pages/Login';
import MainStage from './components/MainStage';
import Footer from './components/Footer';
import NewProject from './pages/NewProject';
import SignUp from './pages/SignUp';
import './App.css'
import { AuthProvider } from './api/auth.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainStage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  )
}

export default App
