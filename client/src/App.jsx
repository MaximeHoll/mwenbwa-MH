import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Footer from './Components/navigation/Footer'
import Header from './Components/navigation/Header'
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Contact from './components/Leaderboard';

function App() {

  return (
    <div className="App">
      <Header></Header>
      <Router>
        <div>
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><a href={'/contact'} className={'nav__link'}>Contact</a></li>
            <li><Link to={'/about'} className="nav-link">About</Link></li>
          </ul>
          <hr />
          <Routes>
              <Route exact path='/contact' component={Contact} />
          </Routes>
        </div>
      </Router>
      <Footer></Footer>
    </div>
  )
}

export default App
