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
import Map from './components/Map'
import SingleTree from './components/SingleTree'

function App() {


  return (
    <Router>
    <AuthProvider>
    <div className="App">
      
      
        
        <Header></Header>
          <Routes>
              <Route exact path='/' element={<Map />} />
              <Route exact path='/leaderboard' element={<Leaderboard />} />
              <Route exact path='/activities' element={<Activities />} />
              <Route exact path='/user/login' element={<Login />} />
              <Route exact path='/user/profile' element={<Profile />} />
              <Route exact path='/singleTree/:id' element={<SingleTree />} />
          </Routes>
        
      
      <Footer></Footer>
    </div>
    </AuthProvider>
    </Router>
  )
}

export default App
