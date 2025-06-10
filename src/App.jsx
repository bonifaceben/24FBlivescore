import React from 'react'
import Header from './components/header'
import SubHeader from './components/SubHeader'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FootBall from './pages/footBall';
import BasketBall from './pages/basketBall';


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
