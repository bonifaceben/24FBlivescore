import { useState, useEffect } from 'react';

const useFavourites = () => {
  const [favourites, setFavourites] = useState(() => {
    try {
      const stored = localStorage.getItem('favourites');
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error('Error parsing favourites from localStorage', err);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('favourites', JSON.stringify(favourites));
    } catch (err) {
      console.error('Error saving favourites to localStorage', err);
    }
  }, [favourites]);

  const toggleFavourite = (match) => {
    const exists = favourites.find(item => item.id === match.id);
    if (exists) {
      setFavourites(favourites.filter(item => item.id !== match.id));
    } else {
      const simplified = {
        id: match.id,
        teams: {
          home: {
            name: match.teams?.home?.name,
            logo: match.teams?.home?.logo,
          },
          away: {
            name: match.teams?.away?.name,
            logo: match.teams?.away?.logo,
          }
        },
        score: {
          current: {
            home: match.score?.current?.home ?? 0,
            away: match.score?.current?.away ?? 0,
          }
        },
        league: {
          name: match.league?.name,
          logo: match.league?.logo,
          country: match.league?.country,
        },
        status: match.status || '',
        elapsed: match.elapsed || 0,
        date: match.date || '',
      };

      setFavourites(prev => [...prev, simplified]);
    }
  };

  const isFavourite = (matchId) => {
    return favourites.some(item => item.id === matchId);
  };

  return { favourites, toggleFavourite, isFavourite };
};

export default useFavourites;
