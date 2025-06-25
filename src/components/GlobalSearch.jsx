import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const GlobalSearch = ({ onSearch, currentSport = 'football' }) => {
  const [searchType, setSearchType] = useState('all'); // all | leagues | matches
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        query: searchText.trim(),
        type: searchType,
        sport: currentSport,
      });
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-center mb-2 gap-2">
        {['all', 'leagues', 'matches'].map((type) => (
          <Button
            key={type}
            variant={searchType === type ? 'primary' : 'outline-secondary'}
            onClick={() => setSearchType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </div>

      <InputGroup className="mb-3">
        <FormControl
          placeholder={`Search ${searchType} in ${currentSport}`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button variant="outline-primary" onClick={handleSearch}>
          🔍
        </Button>
      </InputGroup>
    </div>
  );
};

export default GlobalSearch;
