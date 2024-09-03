import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

// Styled component for the card container
const Card = styled.div`
  background: ${({ theme }) => theme.cardBackground || '#fff'};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer;
  max-width: 250px;
  margin: 15px;
  height: auto;
  position: relative;
  box-sizing: border-box;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  &:hover .play-button {
    opacity: 1;
  }
`;

// Styled component for the show image
const ShowImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  margin-bottom: 15px;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

// Styled component for the play button
const PlayButton = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: blue;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

// Styled component for the show content
const ShowContent = styled.div`
  padding: 10px;
  color: ${({ theme }) => theme.text || '#000'};
`;

// Styled component for the show title
const ShowTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0 0 10px;
  color: ${({ theme }) => theme.text || '#000'};
`;

// Styled component for meta information
const ShowMeta = styled.p`
  margin: 10px 0;
  color: ${({ theme }) => theme.text || '#000'};
`;

// Styled component for the favorite button
const FavoriteButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background-color: #ff6f61;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #e55b4d;
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

// Styled component for the reset button
const ResetButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background-color: #ff4d4d;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #d43a3a;
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

// ShowCard component
const ShowCard = ({ show, onCardClick }) => {
  const handleFavorite = (e) => {
    e.stopPropagation(); // Prevent click from triggering card click

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Toggle favorite status of the show
    if (favorites.some((fav) => fav.id === show.id)) {
      favorites = favorites.filter((fav) => fav.id !== show.id);
    } else {
      favorites.push({ ...show, addedDate: new Date().toISOString() });
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  const handleResetProgress = () => {
    // Reset all progress and favorites from localStorage
    localStorage.removeItem('favorites');
    alert("All your listening history has been reset.");
  };

  return (
    <Card onClick={onCardClick}>
      <ShowImage src={show.image} alt={show.title} />
      <PlayButton icon={faPlayCircle} className="play-button" />
      <ShowContent>
        <ShowTitle>{show.title}</ShowTitle>
        <ShowMeta>Seasons: {show.seasons}</ShowMeta>
        <ShowMeta>Genres: {show.genres}</ShowMeta>
        <ShowMeta>Last Updated: {new Date(show.updated).toLocaleDateString()}</ShowMeta>
        {show.addedDate && <ShowMeta>Added on: {new Date(show.addedDate).toLocaleString()}</ShowMeta>}
        <FavoriteButton onClick={handleFavorite}>
          {JSON.parse(localStorage.getItem('favorites'))?.some((fav) => fav.id === show.id)
            ? 'Remove from Favorites'
            : 'Add to Favorites'}
        </FavoriteButton>
        {/* Reset Button */}
        <ResetButton onClick={handleResetProgress}>
          Reset Listening History
        </ResetButton>
      </ShowContent>
    </Card>
  );
};

export default ShowCard;
