import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled.img`
  max-width: 100%;
  border-radius: 12px;
  margin-bottom: 15px;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

const Title = styled.h3`
  margin: 15px 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
`;

const Text = styled.p`
  margin: 10px 0;
  color: ${({ theme }) => theme.text};
`;

const ShowCard = ({ show }) => {
  return (
    <Card>
      <Image src={show.previewImageUrl} alt={show.name} />
      <Title>{show.name}</Title>
      <Text>Genres: {show.genres.join(', ')}</Text>
      <Text>Seasons: {show.seasonCount}</Text>
      <Text>Last Updated: {new Date(show.lastUpdated).toLocaleDateString()}</Text>
    </Card>
  );
};

export default ShowCard;
