import React, { useState } from 'react';

function BasketBall() {
    const [activeButton, setActiveButton] = useState('all');


  return (
    <div>
       
      {/* Secondary Button Row */}
      <div className="container d-flex justify-content-start flex-nowrap gap-3  mt-2">

        {/* All Button */}
        <button
          className={`rounded-pill px-4 ${activeButton === 'all' ? 'custom-active-btn' : ' custom-inactive-btn'}`}
          onClick={() => setActiveButton('all')}
        >
          All
        </button>

        {/* Live Button with Icon on the Left */}
        <button
          className={`rounded-pill d-flex align-items-center px-3 ${activeButton === 'live' ? 'custom-active-btn-live' : 'custom-inactive-btn-live'}`}
          onClick={() => setActiveButton('live')}
        >
          <i className="bi bi-circle-fill me-2" style={{ fontSize: '0.75rem' }}></i>
          Live
        </button>

        {/* Finished Button */}
        <button
          className={`rounded-pill px-4 ${activeButton === 'finished' ? 'custom-active-btn' : 'custom-inactive-btn'}`}
          onClick={() => setActiveButton('finished')}
        >
          Finished
        </button>

        {/* Schedule Button */}
        <button
          className={`rounded-pill px-4 ${activeButton === 'schedule' ? 'custom-active-btn' : 'custom-inactive-btn'}`}
          onClick={() => setActiveButton('schedule')}
        >
          Schedule
        </button>
      </div>
    </div>
  )
}

export default BasketBall
