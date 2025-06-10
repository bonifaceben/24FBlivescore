import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FootBall from './pages/footBall';
import BasketBall from './pages/BasketBall';
import Header from './components/Header'
import Subnav from './components/Subnav';


function App() {
  return (
    <Router>
      <Header />
      <Subnav/>
      <Routes>
        <Route path="/" element={<FootBall />} />
        <Route path="/basket-ball" element={<BasketBall />} />
       
      </Routes>
    </Router>
  )
}

export default App
