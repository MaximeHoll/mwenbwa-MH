import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Footer from './components/navigation/Footer'
import Header from './components/navigation/Header'
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import Leaderboard from './components/Leaderboard.jsx';
import Activities from './components/Activities.jsx';

function App() {

  const { user, login, logout } = useAuth();

  return (
    <AuthContext.Provider value={{ user }}>
    <div className="App">
      <Header></Header>
      <Router>
        <div>
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link">Home</Link></li>
            <li><Link to={'/leaderboard'} className={'nav__link'}>Leaderboard</Link></li>
            <li><Link to={'/activities'} className="nav-link">Activities</Link></li>
            <li><Link to={'/myprofile'} className={'nav__link'}>My profile</Link></li>
          </ul>
          <hr />
          <Routes>
              <Route exact path='/leaderboard' element={<Leaderboard />} />
              <Route exact path='/activities' element={<Activities />} />
          </Routes>
        </div>
      </Router>
      <Footer></Footer>
    </div>
    </AuthContext.Provider>
  )
}

export default App
