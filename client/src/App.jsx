import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Router } from '@reach/router'
import Footer from './Components/navigation/Footer'
import Header from './Components/navigation/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header></Header>
      
      <Footer></Footer>
    </div>
  )
}

export default App
