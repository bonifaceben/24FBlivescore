import React from 'react';
import useFavourites from '../hooks/useFavourites';
import { useNavigate } from 'react-router-dom';
import empty from '../assets/empty.png'

const FavouritesPage = () => {
  const { favourites, toggleFavourite } = useFavourites();
  const navigate = useNavigate();

  return (
    <div className='favourites-container'>
    <div className="container">
      

      {favourites.length === 0 ? (
        
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '60vh' }}>
  <img src={empty} alt="Logo" height="90" className="mb-2" />
  <p className="text-center text-white">Empty Favourites</p>
</div>

          
      ) : (
        favourites.map(match => (
          <div
            key={match.id}
            className="p-2 mb-3  favourite-match"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/match/${match.id}`)}
          >
            {/* ⭐ Star on its own row */}
            <div className="d-flex justify-content-end mb-2">
              <button
                title="Remove from favourites"
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.8rem',
                  color: 'gold',
                  cursor: 'pointer',
                  padding: 0,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavourite(match);
                }}
              >
                ★
              </button>
            </div>

            {/* Match details */}
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <img src={match.teams.home.logo} alt="home" width={20} /> {match.teams.home.name}
              </span>
              <strong>
                {match.score?.current?.home ?? '-'} - {match.score?.current?.away ?? '-'}
              </strong>
              <span>
                {match.teams.away.name} <img src={match.teams.away.logo} alt="away" width={20} />
              </span>
            </div>
            <div className="text-muted small mt-1">
              {match.league?.name} - {match.league?.country} | {match.status}
            </div>
          </div>
        ))
      )}
    </div>
    </div>  
  );
};

export default FavouritesPage;
