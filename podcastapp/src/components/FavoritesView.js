import React, { useEffect, useState } from 'react';
import ShowCard from './ShowCard';
import styled from 'styled-components';

const FavoritesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px;
`;

const SortButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const SortButton = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: ${({ theme }) => theme.buttonBackground || '#007bff'};
  color: ${({ theme }) => theme.buttonText || '#ffffff'};
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHoverBackground || '#0056b3'};
  }
`;

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleToggleFavorite = (show) => {
    const updatedFavorites = favorites.some((fav) => fav.id === show.id)
      ? favorites.filter((fav) => fav.id !== show.id)
      : [...favorites, { ...show, isFavorite: true }];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const sortFavorites = (option) => {
    let sortedFavorites = [...favorites];
    if (option === 'titleAsc') {
      sortedFavorites.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === 'titleDesc') {
      sortedFavorites.sort((a, b) => b.title.localeCompare(a.title));
    } else if (option === 'dateAsc') {
      sortedFavorites.sort((a, b) => new Date(a.addedDate) - new Date(b.addedDate));
    } else if (option === 'dateDesc') {
      sortedFavorites.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
    }
    setFavorites(sortedFavorites);
  };

  const handlePlayAudio = (show) => {
    // Example: assuming show.audioUrl contains the URL to the audio file
    const audio = new Audio(show.audioUrl);
    audio.play();
  };

  return (
    <>
      <SortButtons>
        <SortButton onClick={() => sortFavorites('titleAsc')}>
          Sort by Title (A-Z)
        </SortButton>
        <SortButton onClick={() => sortFavorites('titleDesc')}>
          Sort by Title (Z-A)
        </SortButton>
        <SortButton onClick={() => sortFavorites('dateAsc')}>
          Sort by Oldest Added
        </SortButton>
        <SortButton onClick={() => sortFavorites('dateDesc')}>
          Sort by Newest Added
        </SortButton>
      </SortButtons>
      <FavoritesContainer>
        {favorites.length > 0 ? (
          favorites.map((show) => (
            <ShowCard 
              key={show.id} 
              show={show} 
              onCardClick={() => handlePlayAudio(show)} 
              onToggleFavorite={handleToggleFavorite} 
            />
          ))
        ) : (
          <p>No favorites added yet.</p>
        )}
      </FavoritesContainer>
    </>
  );
};

export default Favorites;
