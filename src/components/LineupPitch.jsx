import React from 'react';
import pitchBg from '../assets/pitch.png';

const positions = [
  { top: '5%', left: '50%', pos: 'GK' },
  { top: '15%', left: '25%', pos: 'CB' },
  { top: '15%', left: '50%', pos: 'CB' },
  { top: '15%', left: '75%', pos: 'CB' },
  { top: '30%', left: '10%', pos: 'MF' },
  { top: '30%', left: '30%', pos: 'MF' },
  { top: '30%', left: '50%', pos: 'MF' },
  { top: '30%', left: '70%', pos: 'MF' },
  { top: '30%', left: '90%', pos: 'MF' },
  { top: '45%', left: '35%', pos: 'FW' },
  { top: '45%', left: '65%', pos: 'FW' }
];

const mirrorY = (percent) => {
  const value = parseFloat(percent);
  const mirrored = 100 - value;
  return `${mirrored}%`;
};

const addSpacing = (topPercent) => {
  const top = parseFloat(topPercent);
  return `${top + 2}%`; // Adds spacing between teams
};

const LineupPitch = ({ homeTeam, awayTeam }) => {
  const homePlayers = homeTeam?.startXI || [];
  const awayPlayers = awayTeam?.startXI || [];

  return (
    <div
      className="pitch-container"
      style={{
        background: `url(${pitchBg}) no-repeat center center`,
        backgroundSize: 'cover',
        position: 'relative'
      }}
    >
      {/* Formation Labels */}
      <div className="formation-label home-formation">
        <strong>{homeTeam?.team?.name}</strong> - {homeTeam?.formation || 'N/A'}
      </div>
      <div className="formation-label away-formation">
        <strong>{awayTeam?.team?.name}</strong> - {awayTeam?.formation || 'N/A'}
      </div>

      {/* Home Team (Top) */}
      {homePlayers.map((p, i) => {
        const player = p.player || p;
        const pos = positions[i] || {};

        return (
          <div key={`home-${i}`} className="player" style={{ top: pos.top, left: pos.left }}>
            <div className="player-position">{player.number}</div>
            {player.photo && (
              <img src={player.photo} alt={player.name} className="player-photo" />
            )}
            <div className="player-name">{player.name}</div>
          </div>
        );
      })}

      {/* Away Team (Bottom - Mirrored) */}
      {awayPlayers.map((p, i) => {
        const player = p.player || p;
        const pos = positions[i] || {};

        return (
          <div
            key={`away-${i}`}
            className="player"
            style={{ top: addSpacing(mirrorY(pos.top)), left: pos.left }}
          >
            <div className="player-position">{player.number}</div>
            {player.photo && (
              <img src={player.photo} alt={player.name} className="player-photo" />
            )}
            <div className="player-name">{player.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default LineupPitch;
