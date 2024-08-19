import React, { useState, useEffect } from 'react';
import ShowCard from './ShowCard';
import styled from 'styled-components';

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;s
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const sortedShows = data.sort((a, b) => a.name.localeCompare(b.name));
        setShows(sortedShows);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const filteredShows = shows.filter((show) =>
    show.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    show.genres.some((genre) => genre.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return <p>Loading shows...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="show-list">
      <SearchBar
        type="text"
        placeholder="Search by show name or genre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredShows.map((show) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </div>
  );
};

export default ShowList;
