import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Footer from './components/navigation/Footer'
import Header from './components/navigation/Header'
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Leaderboard from './components/Leaderboard.jsx';
import Activities from './components/Activities.jsx';
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/login'
import Profile from './components/Profile'

function App() {


  return (
    <AuthProvider>
    <div className="App">
      
      
        <Router>
        <Header></Header>
          <Routes>
              <Route exact path='/leaderboard' element={<Leaderboard />} />
              <Route exact path='/activities' element={<Activities />} />
              <Route exact path='/user/login' element={<Login />} />
              <Route exact path='/user/profile' element={<Profile />} />
          </Routes>
        </Router>
      
      <Footer></Footer>
    </div>
    </AuthProvider>
  )
}

export default App
