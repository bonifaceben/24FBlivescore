import React from 'react'
import SubHeader from './components/Subheader'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FootBall from './pages/footBall';
import BasketBall from './pages/basketBall';
import Header from './components/header'


function App() {
  return (
    <Router>
      <Header />
      <SubHeader />
      <Routes>
        <Route path="/" element={<FootBall />} />
        <Route path="/basket-ball" element={<BasketBall />} />
       
      </Routes>
    </Router>
  )
}

export default App
