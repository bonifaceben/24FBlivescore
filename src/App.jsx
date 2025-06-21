import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FootBall from './pages/footBall';
import BasketBall from './pages/BasketBall';
import Header from './components/Header'
import Subnav from './components/Subnav';
import MatchDetails from './pages/MatchDetails';


function App() {
  return (
    <Router>
      <Header />
      <Subnav/>
      <Routes>
        <Route path="/" element={<FootBall />} />
        <Route path="/basket-ball" element={<BasketBall />} />
        <Route path="/match/:fixtureId" element={<MatchDetails />} />
       
      </Routes>
    </Router>
  )
}

export default App
