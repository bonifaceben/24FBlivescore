import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const MatchDetails = () => {
  const { fixtureId } = useParams();
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('events');

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${baseUrl}/matches/match-details?fixtureId=${fixtureId}`);
        const data = await res.json();

        if (data.success) {
          setMatchData(data.data);
        } else {
          setMatchData(null);
        }
      } catch (err) {
        console.error('Error fetching match details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [fixtureId]);

  if (loading) return <Spinner />;
  if (!matchData) return <p className="text-center">Match not found.</p>;

  const fixture = matchData?.fixture;
  const lineups = matchData?.lineups;
  const statistics = matchData?.statistics ?? [];
  const events = Array.isArray(fixture?.events) ? fixture.events : [];
  const h2h = matchData?.h2h ?? [];

  return (
    <div className='matchdetailscon'>
    <div className="container py-4 sub-cont">
      
     <div className="text-center mb-3">
  <div className="d-flex justify-content-center align-items-center matchdetailsleague">
    {/* Home Team */}
    <div className="text-center mx-3">
      <img src={fixture?.teams?.home?.logo} alt="home" width={40} />
      <div className='matchdetailsleague-title'>{fixture?.teams?.home?.name}</div>
    </div>

    {/* Score */}
    <div className="mx-3 matchdetailsleague-score">
      <strong style={{ fontSize: '1.5rem' }}>{fixture?.goals?.home}</strong> 
      <span style={{ margin: '0 5px' }}>-</span> 
      <strong style={{ fontSize: '1.5rem' }}>{fixture?.goals?.away}</strong>
    </div>

    {/* Away Team */}
    <div className="text-center mx-3 matchdetailsleague-title">
      <img src={fixture?.teams?.away?.logo} alt="away" width={40} />
      <div>{fixture?.teams?.away?.name}</div>
    </div>
  </div>

  {/* Match Status */}
  
</div>


      {/* Tab Buttons */}
      <div className="text-center my-4">
        {['events', 'lineups', 'statistics', 'h2h'].map(tab => (
          <button
            key={tab}
            className={`btn btn-sm mx-1 ${activeTab === tab ? 'matchdetails-primarybtn' : 'matchdetails-sec-btn'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* EVENTS */}
      {activeTab === 'events' && (
        <div className="mb-4">
          {events.length > 0 ? (
            events.map((event, idx) => (
              <div key={idx} className=" py-2 d-flex align-items-start boder-buttom-matchdetail">
                {event.team?.logo && (
                  <img
                    src={event.team.logo}
                    alt={event.team?.name}
                    width={28}
                    height={28}
                    className="me-2"
                    style={{ borderRadius: '50%' }}
                  />
                )}
                <div className="event-details">
                  <div className="fw-bold event-title">
                    {event.time?.elapsed}{event.time?.extra ? `+${event.time.extra}` : ''}' - {event.team?.name}
                  </div>
                  <div> 
                    <span className="text-capitalize event-sub">{event.type} - {event.detail}</span>
                    {event.player?.name && <> by <strong>{event.player.name}</strong></>}
                    {event.assist?.name && <> (Assist: {event.assist.name})</>}
                    {event.comments && <> – <em>{event.comments}</em></>}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No event data available.</p>
          )}
        </div>
      )}

      {/* LINEUPS */}
      {activeTab === 'lineups' && (
        <div className="mb-4">
          
          {lineups?.home || lineups?.away ? (
            <>
              {[lineups.home, lineups.away].map((team, index) => (
                <div key={index} className="mb-4">
                  <h5>{team?.team?.name || 'Unknown Team'}</h5>
                  <p>Coach: {team?.coach?.name || 'N/A'}</p>
                  <p>Formation: {team?.formation || 'N/A'}</p>
                  {Array.isArray(team?.startXI) && team.startXI.length > 0 ? (
                    <ul>
                      {team.startXI.map((player, i) => (
                        <li key={i}>
                          {player?.photo && (
                            <img
                              src={player.photo}
                              alt={player.name}
                              width={24}
                              height={24}
                              className="me-2 rounded-circle"
                            />
                          )}
                          <strong>{player?.number}</strong> - {player?.name} ({player?.position})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No starting lineup data available.</p>
                  )}
                </div>
              ))}
            </>
          ) : (
            <p>No lineup data available.</p>
          )}
        </div>
      )}

      {/* STATISTICS */}
      {activeTab === 'statistics' && (
        <div className="mb-4">
          <h4>Match Statistics</h4>
          {statistics.length > 0 ? (
            statistics.map((teamStat, idx) => (
              <div key={idx} className="mb-3">
                <h5>{teamStat.team?.name}</h5>
                <ul>
                  {teamStat.statistics.map((stat, i) => (
                    <li key={i}>{stat.type}: {stat.value ?? 'N/A'}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No statistics available.</p>
          )}
        </div>
      )}

      {/* H2H */}
      {activeTab === 'h2h' && (
        <div className="mb-4">
          <h4>Head-to-Head Matches</h4>
          {h2h.length > 0 ? (
            h2h.map((match, idx) => (
              <div key={idx} className="border rounded p-3 mb-3">
                <div className="d-flex align-items-center mb-2">
                  {match.league?.logo && (
                    <img src={match.league.logo} alt={match.league.name} width={24} className="me-2" />
                  )}
                  <strong>{match.league?.name}</strong> - {new Date(match.fixture?.date).getFullYear()}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span>
                    <img src={match.teams?.home?.logo} alt="home" width={20} className="me-1" />
                    {match.teams?.home?.name}
                  </span>
                  <strong>{match.goals?.home} - {match.goals?.away}</strong>
                  <span>
                    <img src={match.teams?.away?.logo} alt="away" width={20} className="me-1" />
                    {match.teams?.away?.name}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No H2H data available.</p>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default MatchDetails;
