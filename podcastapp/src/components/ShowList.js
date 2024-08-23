import React, { useState, useEffect } from 'react';
import ShowCard from './ShowCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAlphaDown, faSortAlphaUp, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Fuse from 'fuse.js';

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  width: 100%;
  margin-top: 5px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  margin-left: 100px;
  margin-top: 5px;
  border-radius: 8px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); 
  }
`;

const ShowListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const SortButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const SortButton = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: 8px;
  border: none;
  background-color: #1e1e1e;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #007bff;
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); 
  }
`;

const GenreFilterContainer = styled.div`
  margin-bottom: 20px;
`;

const GenreCheckbox = styled.input`
  margin-right: 10px;
`;

const GenreLabel = styled.label`
  margin-right: 15px;
  font-size: 1rem;
`;

const ShowList = ({ onCardClick }) => {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredShows, setFilteredShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app')
      .then((response) => response.json())
      .then((data) => {
        console.log('Data received from API:', data);
        setShows(data || []); // Ensure that `data` is an array
        const sortedData = [...(data || [])].sort((a, b) => a.title.localeCompare(b.title)); // Default sort by A-Z
        setFilteredShows(sortedData); // Initialize filtered shows
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching the API:', error);
        setError('Failed to fetch shows');
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    // Initialize fuse.js
    const fuse = new Fuse(shows, {
      keys: ['title'],
      threshold: 0.3, // Adjust threshold for fuzzy matching
    });

    // Perform fuzzy search
    const results = searchTerm
      ? fuse.search(searchTerm).map(({ item }) => item)
      : shows;

    // Filter based on genres and sort results
    const filtered = results.filter((show) => {
      const matchesGenre = selectedGenres.length === 0 || show.genres.some((genre) => selectedGenres.includes(genre));
      return matchesGenre;
    });

    const sortedFilteredShows = [...filtered].sort((a, b) => {
      const titleA = a.title || '';
      const titleB = b.title || '';
      const dateA = new Date(a.updated);
      const dateB = new Date(b.updated);

      if (sortOrder === 'A-Z') {
        return titleA.localeCompare(titleB);
      } else if (sortOrder === 'Z-A') {
        return titleB.localeCompare(titleA);
      } else if (sortOrder === 'Newest') {
        return dateB - dateA;
      } else if (sortOrder === 'Oldest') {
        return dateA - dateB;
      }

      return 0;
    });

    setFilteredShows(sortedFilteredShows);
  }, [searchTerm, selectedGenres, sortOrder, shows]);

  const handleSearch = () => {
    // Triggered on search button click (optional if auto-search on input change is preferred)
    // setSearchTerm(searchTerm); // Not necessary if using onChange event for live search
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    // handleSearch(); // Trigger search automatically as the user types
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleGenreChange = (genreId) => {
    const updatedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId];

    setSelectedGenres(updatedGenres);
  };

  if (isLoading) {
    return <p>Loading shows...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Define genres manually or fetch them if available from the API
  const genres = [
    { id: 1, name: 'True Crime' },
    { id: 2, name: 'Comedy' },
    { id: 3, name: 'Science' },
    // Add more genres here
  ];

  return (
    <div>
      <SearchContainer>
        <SearchBar
          type="text"
          placeholder="Search by show name..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchContainer>
      <GenreFilterContainer>
        {genres.map((genre) => (
          <div key={genre.id}>
            <GenreCheckbox
              type="checkbox"
              id={`genre-${genre.id}`}
              checked={selectedGenres.includes(genre.id)}
              onChange={() => handleGenreChange(genre.id)}
            />
            <GenreLabel htmlFor={`genre-${genre.id}`}>{genre.name}</GenreLabel>
          </div>
        ))}
      </GenreFilterContainer>
      <SortButtonsContainer>
        <SortButton onClick={() => handleSortChange('A-Z')}>
          <FontAwesomeIcon icon={faSortAlphaDown} /> Sort A-Z
        </SortButton>
        <SortButton onClick={() => handleSortChange('Z-A')}>
          <FontAwesomeIcon icon={faSortAlphaUp} /> Sort Z-A
        </SortButton>
        <SortButton onClick={() => handleSortChange('Newest')}>
          <FontAwesomeIcon icon={faSortDown} /> Most Recently Updated
        </SortButton>
        <SortButton onClick={() => handleSortChange('Oldest')}>
          <FontAwesomeIcon icon={faSortUp} /> Least Recently Updated
        </SortButton>
      </SortButtonsContainer>
      <ShowListContainer>
        {filteredShows.length > 0 ? (
          filteredShows.map((show) => (
            <ShowCard key={show.id} show={show} onClick={() => onCardClick(show)} />
          ))
        ) : (
          <p>No shows found. Try adjusting your search.</p>
        )}
      </ShowListContainer>
    </div>
  );
};

export default ShowList;
