import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const MatchDetails = () => {
  const { fixtureId } = useParams();
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const { fixture, lineups, statistics, events } = matchData;

  return (
    <div className="container py-4">
      <h3 className="text-center mb-4">
        {fixture.teams.home.name} vs {fixture.teams.away.name}
      </h3>

      <div className="text-center mb-3">
        <img src={fixture.teams.home.logo} alt="home" width={40} className="mx-2" />
        <strong>{fixture.goals.home}</strong> - <strong>{fixture.goals.away}</strong>
        <img src={fixture.teams.away.logo} alt="away" width={40} className="mx-2" />
        <p>Status: {fixture.status.long}</p>
        <p>Date: {new Date(fixture.date).toLocaleString()}</p>
        <p>Venue: {fixture.venue.name}, {fixture.venue.city}</p>
      </div>

      {/* EVENTS */}
      <div className="mb-4">
        <h4>Match Events</h4>
        {events?.length > 0 ? (
          events.map((event, idx) => (
            <div key={idx} className="border-bottom py-2">
              <small><strong>{event.time.elapsed}'</strong></small> - {event.team.name}:
              <span className="ms-1">{event.type} - {event.detail}</span>
              {event.player?.name && <> by <strong>{event.player.name}</strong></>}
              {event.assist?.name && <> (Assist: {event.assist.name})</>}
            </div>
          ))
        ) : (
          <p>No event data available.</p>
        )}
      </div>

      {/* LINEUPS */}
      <div className="mb-4">
        <h4>Lineups</h4>
        {lineups?.length > 0 ? (
          lineups.map((team, index) => (
            <div key={index} className="mb-3">
              <h5>{team.team.name}</h5>
              <p>Coach: {team.coach?.name || 'N/A'}</p>
              <ul>
                {team.startXI.map((p, i) => (
                  <li key={i}>{p.player.name}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No lineup data available.</p>
        )}
      </div>

      {/* STATISTICS */}
      <div className="mb-4">
        <h4>Match Statistics</h4>
        {statistics?.length > 0 ? (
          statistics.map((teamStat, idx) => (
            <div key={idx} className="mb-3">
              <h5>{teamStat.team.name}</h5>
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

    </div>
  );
};

export default MatchDetails;
