import React from 'react';

const ShowCard = ({ show }) => {
  return (
    <div className="show-card">
      <img src={show.previewImageUrl} alt={show.name} />
      <h3>{show.name}</h3>
      <p>Genres: {show.genres.join(', ')}</p>
      <p>Seasons: {show.seasonCount}</p>
      <p>Last Updated: {new Date(show.lastUpdated).toLocaleDateString()}</p>
    </div>
  );
};

export default ShowCard;
