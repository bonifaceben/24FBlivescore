import React, { useState, useEffect } from 'react';

function footBall() {
  const [activeButton, setActiveButton] = useState('all');
  const [liveMatches, setLiveMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLiveMatches = async () => {
      if (activeButton === 'live') {
        setLoading(true);
        try {
          const baseUrl = import.meta.env.VITE_API_BASE_URL;
          const response = await fetch(`${baseUrl}/matches/live`);
          const data = await response.json(); 
          setLiveMatches(data);
        } catch (error) {
          console.error('Error fetching live matches:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLiveMatches();
  }, [activeButton]);

  return (
    <div>
      {/* Buttons */}
      <div className="container d-flex justify-content-start flex-nowrap gap-3 mt-2">
        <button
          className={`rounded-pill px-4 ${activeButton === 'all' ? 'custom-active-btn' : 'custom-inactive-btn'}`}
          onClick={() => setActiveButton('all')}
        >
          All
        </button>
        <button
          className={`rounded-pill d-flex align-items-center px-3 ${activeButton === 'live' ? 'custom-active-btn-live' : 'custom-inactive-btn-live'}`}
          onClick={() => setActiveButton('live')}
        >
          <i className="bi bi-circle-fill me-2" style={{ fontSize: '0.75rem' }}></i>
          Live
        </button>
        <button
          className={`rounded-pill px-4 ${activeButton === 'finished' ? 'custom-active-btn' : 'custom-inactive-btn'}`}
          onClick={() => setActiveButton('finished')}
        >
          Finished
        </button>
        <button
          className={`rounded-pill px-4 ${activeButton === 'schedule' ? 'custom-active-btn' : 'custom-inactive-btn'}`}
          onClick={() => setActiveButton('schedule')}
        >
          Schedule
        </button>
      </div>

      {/* Display Live Matches */}
      {activeButton === 'live' && (
        <div className="mt-4 container">
          {loading ? (
            <p>Loading live matches...</p>
          ) : (
            <>
              {liveMatches.length === 0 ? (
                <p>No live matches available.</p>
              ) : (
                liveMatches.map((item, index) => (
                  <div key={index} className="mb-3 p-3 border rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <img src={item.league.logo} alt={item.league.name} width={30} />
                      <strong>{item.league.name} - {item.league.country}</strong>
                    </div>
                    {item.matches.map(match => (
                      <div key={match.id} className="mt-2">
                        <div className="d-flex justify-content-between">
                          <div>
                            <img src={match.teams.home.logo} alt={match.teams.home.name} width={25} /> {match.teams.home.name}
                          </div>
                          <strong>{match.score.current.home} - {match.score.current.away}</strong>
                          <div>
                            {match.teams.away.name} <img src={match.teams.away.logo} alt={match.teams.away.name} width={25} />
                          </div>
                        </div>
                        <div className="text-muted small">⏱️ {match.elapsed}' | Status: {match.status}</div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default footBall;
