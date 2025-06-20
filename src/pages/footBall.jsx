import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';

function FootBall() {
  const [activeButton, setActiveButton] = useState('all');
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  // Automatically set today's date on load
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;

        const endpointMap = {
          all: '/matches/all-matches',
          live: '/matches/live',
          finished: '/matches/finished',
          schedule: '/matches/scheduled-matches',
        };

        let endpoint = endpointMap[activeButton];

        // Only add date param for all, schedule, and finished
        const useDateParam = ['all', 'schedule', 'finished'].includes(activeButton);
        if (useDateParam && selectedDate) {
          endpoint += `?date=${selectedDate}`;
        }

        const response = await fetch(`${baseUrl}${endpoint}`);
        const data = await response.json();
        const fetchedMatches = Array.isArray(data) ? data : data.data || [];

        setMatches(fetchedMatches);
      } catch (error) {
        console.error(`Error fetching ${activeButton} matches:`, error);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [activeButton, selectedDate]);

  return (
    <div className='cont-2'>
      {/* Filter Buttons */}
      <div className="container d-flex justify-content-start flex-nowrap gap-1 pt-3">
        {['all', 'live', 'finished', 'schedule'].map((type) => (
          <button
            key={type}
            className={`rounded-pill px-4 ${activeButton === type ? 'custom-active-btn' : 'custom-inactive-btn'}`}
            onClick={() => setActiveButton(type)}
          >
            {type === 'live' ? (
              <span className="d-flex align-items-center">
                <i className="bi bi-circle-fill me-2" style={{ fontSize: '0.75rem' }}></i>Live
              </span>
            ) : (
              type.charAt(0).toUpperCase() + type.slice(1)
            )}
          </button>

          
        ))}

        <button
      type="button"
      className="btndatebtn"
      onClick={() => window._datePickerRef?.showPicker()}
    >
      <i className="bi bi-calendar-event" style={{ fontSize: '1rem' }}></i>
    </button>
     </div>


      {['schedule', 'finished', 'all'].includes(activeButton) && (
  <div className="container mt-3 position-relative">
    {/* Hidden native date input */}
    <input
      type="date"
      ref={(ref) => (window._datePickerRef = ref)} // Store ref globally or use useRef
      className="d-none"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
    />

    {/* Calendar icon as button */}
    
  </div>
)}


      <div className='matchcontainer'>

      {/* Matches */}
      <div className="mt-4 container">
        {loading ? (
          <Spinner/>
        ) : matches.length === 0 ? (
          <p>No {activeButton} matches available.</p>
        ) : (
          matches.map((item, index) => (
            <div key={index} className="mb-3 p-3  allleague">
              <div className=" justify-content-between align-items-center allmatchcontainer">
                <img src={item.league.logo} alt={item.league.name} width={25} />
                <strong className='leaguename'>{item.league.name} - {item.league.country}</strong>
              </div>
              {item.matches.map(match => (
                <div key={match.id} className="mt-2">
                  <hr className='horisontalline'/>
                  <div className="d-flex justify-content-between">
                    <div className='homeandaway'>
                      <img src={match.teams.home.logo} alt={match.teams.home.name} width={20} /> {match.teams.home.name}
                    </div>
                    <strong className='homeandaway'>{match.score.current.home} - {match.score.current.away}</strong>
                    <div className='homeandaway'>
                      {match.teams.away.name} <img src={match.teams.away.logo} alt={match.teams.away.name} width={20} />
                    </div>
                  </div>
                  <div className="matchtime"> {match.elapsed}' ||  {match.status}</div>
                  
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      </div>
    </div>
  );
}

export default FootBall;
