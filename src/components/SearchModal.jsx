import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import empty from '../assets/empty.png'

const SearchModal = ({ show, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  // Close on click outside
  useEffect(() => {
    function handleOutsideClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }

    if (show) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [show, onClose]);

  // Fetch/fake search
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) {
        // Replace with your API call
        fetch(`/api/search?q=${query}`)
          .then(res => res.json())
          .then(data => setResults(data))
          .catch(() => setResults([]));
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const handleResultClick = (result) => {
    navigate(`/${result.type}/${result.id}`);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="search-modal-backdrop">
      <div className="search-modal-box" ref={modalRef}>
        {/* Modal Header */}
        <div className="d-flex justify-content-between align-items-center p-2 headersearch">
          <h6 className="mb-0">Search</h6>
          <span
            role="button"
            className="fs-4 closebtn"
            onClick={onClose}
            style={{ cursor: 'pointer' }}
          >
            &times;
          </span>
        </div>

        {/* Search Input */}
        <div className="p-3">
          <input
            type="text"
            className="form-control no-focus-outline"
            placeholder="Type to search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            
          />
        </div>

        {/* Search Results */}
        <div className="flex-grow-1 overflow-auto p-3" style={{ maxHeight: '50vh' }}>
          {results.length === 0 ? (
            
           <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '30vh' }}>
             <img src={empty} alt="Logo" height="70" className="mb-2" />
             <p className="text-center text-white">No data</p>
           </div> 


          ) : (
            results.map((item) => (
              <div
                key={item.id}
                className="p-2 border-bottom search-item"
                role="button"
                onClick={() => handleResultClick(item)}
              >
                {item.name}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
